import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './Config/dbConnect.js';
import studentRoute from './Routes/student.route.js';
import userRoute from './Routes/user.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

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


app.use(express.json());
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