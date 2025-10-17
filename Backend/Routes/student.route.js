import express from 'express';
const router = express.Router();
import {createStudent, getAllStudents, singleStudent, updateStudent, deleteStudent} from '../Controllers/student.controller.js';

router.post('/create/student', createStudent);
router.get('/get/students', getAllStudents);
router.get('/student', singleStudent);
router.put('/update/student', updateStudent);
router.delete('/delete/student', deleteStudent);

export default router;
