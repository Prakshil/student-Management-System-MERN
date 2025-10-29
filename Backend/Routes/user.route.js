import express from 'express';
const router = express.Router();
import {signUp, login, singleUser, updateUser, deleteUser} from '../Controllers/user.controller.js';
import auth from '../Middlewares/auth.js';
import { upload } from '../Middlewares/multer.middleware.js';
import { requestOtp, validateOtp, logout } from '../Controllers/auth.controller.js';


// Auth
router.post('/auth/register', upload.single('profileimage'), signUp);
router.post('/auth/login', login);
router.post('/auth/request-otp', requestOtp);
router.post('/auth/verify-otp', validateOtp);
router.post('/auth/logout', logout);


router.get('/user/:id', auth, singleUser);
router.put('/update/user/:id', auth, upload.single('profileimage'), updateUser);
router.delete('/delete/user/:id', auth, deleteUser);

export default router;