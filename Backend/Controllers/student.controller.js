import ApiError from '../utils/ApiError.js';
import ApiResponse from "../utils/ApiResponse.js";
import Student from "../Models/Student.model.js"; // adjust path if different
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const createStudent = async (req, res, next) => {
  try {
    
    // const newStudent = await Student.create(req.body);
    // const doc = new Student(req.body);
    // const newStudent = await doc.save();
    const {firstname, lastname, email,age,phone,gender} = req.body;
    const student = new Student({firstname, lastname, email,age,phone,gender});
    const newStudent = await student.save();

    res.status(201).json(new ApiResponse(201, newStudent, "Student created successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while creating student");
  }
};    
const getAllStudents = async (req, res) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            return res.status(401).json(new ApiError("Unauthorized: No token provided"));
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json(new ApiError("Unauthorized: Invalid token"));
        }
        const {id} = decoded;
        const user = await Student.findById(id);
        res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
   
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching all students");
    }
};
const singleStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            throw new ApiError(404, "Student not found");
        }
        res.status(200).json(new ApiResponse(200, student, "Student fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching student");
    }
};
const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedStudent) {
            throw new ApiError(404, "Student not found");
        }
        res.status(200).json(new ApiResponse(200, updatedStudent, "Student updated successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while updating student");
    }
};
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            throw new ApiError(404, "Student not found");
        }
        res.status(200).json(new ApiResponse(200, {}, "Student deleted successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while deleting student");
    }
};

export { createStudent, getAllStudents, singleStudent, updateStudent, deleteStudent };
