import express from 'express';
const router = express.Router();
import {signUp, login, singleUser, updateUser, deleteUser} from '../Controllers/user.controller.js';

router.post('/auth/register', signUp);
router.post('/auth/login', login);
router.get('/student/:id', singleUser);
router.put('/update/student/:id', updateUser);
router.delete('/delete/student/:id', deleteUser);

export default router;