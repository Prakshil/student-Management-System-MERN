import ApiError from '../utils/ApiError.js';
import ApiResponse from "../utils/ApiResponse.js";
import fs from 'fs/promises';
import Student from '../Models/Student.model.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';

const createStudent = async (req, res, next) => {
  try {
    
    // const newStudent = await Student.create(req.body);
    // const doc = new Student(req.body);
    // const newStudent = await doc.save();
        const { firstname, lastname, email, age, phone, gender } = req.body;

        let profileImageUrl = req.body.profileImage; // allow URL fallback
        if (req.file?.path) {
            const uploadRes = await uploadOnCloudinary(req.file.path);
            if (!uploadRes?.secure_url) {
                // cleanup temp file if upload failed
                try { if (req.file?.path) fs.unlinkSync(req.file.path); } catch {}
                return next(new ApiError(500, "Failed to upload image to Cloudinary"));
            }
            profileImageUrl = uploadRes.secure_url;
            // cleanup temp file after successful upload
            try { if (req.file?.path) fs.unlinkSync(req.file.path); } catch {}
        }

        if (!profileImageUrl) {
            return next(new ApiError(400, "profileImage is required (upload a file or provide a URL)"));
        }

        const student = new Student({ firstname, lastname, email, age, phone, gender, profileImage: profileImageUrl });
    const newStudent = await student.save();

    res.status(201).json(new ApiResponse(201, newStudent, "Student created successfully"));
    } catch (error) {
    return next(new ApiError(500, "Something went wrong while creating student", [error.message]));
    }
};    
const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).json(new ApiResponse(200, students, "Students fetched successfully"));
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while fetching all students", [error.message]));
    }
};
const singleStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return next(new ApiError(404, "Student not found"));
        }
        res.status(200).json(new ApiResponse(200, student, "Student fetched successfully"));
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while fetching student", [error.message]));
    }
};
const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // form-data sends numbers as strings; coerce when present
    if (typeof updates.age !== 'undefined') updates.age = Number(updates.age);

    // If a new image file is uploaded, push it to Cloudinary
    if (req.file?.path) {
      const uploadRes = await uploadOnCloudinary(req.file.path, { folder: 'students' });

      // Clean up temp file regardless of upload success/failure
      try { await fs.unlink(req.file.path); } catch (_) {}

      if (!uploadRes?.secure_url) {
        return res.status(500).json({ success: false, data: null, message: 'Failed to upload image to Cloudinary' });
      }
      updates.profileImage = uploadRes.secure_url;
    }

    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, data: null, message: 'Student not found' });
    }

    return res.status(200).json({
      success: true,
      data: student,
      message: 'Student updated successfully',
    });
  } catch (err) {
    return next(err);
  }
};
const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return next(new ApiError(404, "Student not found"));
        }
        res.status(200).json(new ApiResponse(200, {}, "Student deleted successfully"));
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while deleting student", [error.message]));
    }
};

export { createStudent, getAllStudents, singleStudent, updateStudent, deleteStudent };
