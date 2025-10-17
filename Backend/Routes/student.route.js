import express from 'express';
const router = express.Router();
import {createStudent, getAllStudents, singleStudent, updateStudent, deleteStudent} from '../Controllers/student.controller.js';

router.post('/create/student', createStudent);
router.get('/get/students', getAllStudents);
router.get('/student/:id', singleStudent);
router.put('/update/student/:id', updateStudent);
router.delete('/delete/student/:id', deleteStudent);

export default router;
