import ApiError from '../utils/ApiError.js';
import ApiResponse from "../utils/ApiResponse.js";
import Student from "../Models/Student.model.js"; // adjust path if different

const createStudent = async (req, res, next) => {
  try {
    
    // const newStudent = await Student.create(req.body);
    // const doc = new Student(req.body);
    // const newStudent = await doc.save();
        const { firstname, lastname, email, age, phone, gender, profileImage } = req.body;
        const student = new Student({ firstname, lastname, email, age, phone, gender, profileImage });
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
        const id = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedStudent) {
            return next(new ApiError(404, "Student not found"));
        }
        res.status(200).json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while updating student", [error.message]));
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
