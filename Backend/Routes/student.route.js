import express from 'express';
import auth from '../Middlewares/auth.js';
const router = express.Router();
import {createStudent, getAllStudents, singleStudent, updateStudent, deleteStudent} from '../Controllers/student.controller.js';

router.post('/create/student', auth, createStudent);
router.get('/get/students', auth, getAllStudents);
router.get('/student/:id', auth, singleStudent);
router.put('/update/student/:id', auth, updateStudent);
router.delete('/delete/student/:id', auth, deleteStudent);

export default router;
