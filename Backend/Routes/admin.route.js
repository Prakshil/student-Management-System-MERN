import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    deleteUser, 
    getDashboardStats,
    updateUserRole,
    getAllStudents,
    getStudentById,
    deleteStudent
} from '../Controllers/admin.controller.js';
import { isAuthenticated } from '../Middlewares/auth.middleware.js';
import { isAdmin } from '../Middlewares/admin.middleware.js';

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(isAuthenticated, isAdmin);

router.get('/stats', getDashboardStats);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/role', updateUserRole);

// Student management routes
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.delete('/students/:id', deleteStudent);

export default router;
