import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        lowercase: true,
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
        lowercase: true,
        enum:["male","female","other"]
    },
    age: {
        type: Number,
        required: true,
    },
    profileImage:{
        type: String,
        required: true,
    }
}, {timestamps: true});
const Student = mongoose.model("Student", studentSchema);
export default Student;