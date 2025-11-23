import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ConnectDB from './Config/dbConnect.js';
import studentRoute from './Routes/student.route.js';
import userRoute from './Routes/user.route.js';
import adminRoute from './Routes/admin.route.js';
import errorHandler from './Middlewares/errorHandler.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// CORS configuration - MUST be before routes
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
        ];
        
        // Allow all Vercel deployment URLs (production and previews)
        const isVercelDomain = origin.includes('student-management-system-mern') && 
                               origin.includes('.vercel.app');
        
        if (allowedOrigins.indexOf(origin) !== -1 || isVercelDomain) {
            callback(null, true);
        } else {
            callback(null, true); // Temporarily allow all for debugging
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(cookieParser());

// Simple healthcheck
app.get('/healthz', (req, res) => {
    res.status(200).json({ ok: true });
});

app.use('/api/v1', studentRoute);
// https://localhost:5000/api/v1/create/student
// https://localhost:5000/api/v1/get/students
// https://localhost:5000/api/v1/student
// https://localhost:5000/api/v1/update/student
// https://localhost:5000/api/v1/delete/student

app.use('/api/v1', userRoute);
// https://localhost:5000/api/v1/create/user
// https://localhost:5000/api/v1/get/users
// https://localhost:5000/api/v1/user
// https://localhost:5000/api/v1/update/user
// https://localhost:5000/api/v1/delete/user

app.use('/api/v1/admin', adminRoute);
// https://localhost:5000/api/v1/admin/stats
// https://localhost:5000/api/v1/admin/users
// https://localhost:5000/api/v1/admin/users/:id

// Global error handler should be the last middleware
app.use(errorHandler);

// Database connection and server start
ConnectDB()
    .then(() => {
        console.log(`Database ${process.env.DB_NAME} connected successfully`);
        // Start the server or perform other actions
        app.listen(PORT, () => {
            console.log(`server is listening on http://${HOSTNAME}:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });