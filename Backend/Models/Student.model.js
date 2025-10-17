import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "First name is required"],
        lowercase: true,
        trim: true,
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "First name must be at most 50 characters"],
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        lowercase: true,
        trim: true,
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [50, "Last name must be at most 50 characters"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        maxlength: [254, "Email must be at most 254 characters"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Please provide a valid email address"],
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        index: true,
        trim: true,
        // E.164 format: optional + and 10-15 digits
        match: [/^\+?[1-9]\d{9,14}$/,
            "Please provide a valid phone number (E.164 format, e.g., +1234567890)"],
    },
    gender:{
        type: String,
        required: [true, "Gender is required"],
        lowercase: true,
        trim: true,
        enum:["male","female","other"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [3, "Age must be at least 3"],
        max: [120, "Age must be at most 120"],
    },
    profileImage:{
        type: String,
        required: [true, "Profile image is required"],
        trim: true,
        maxlength: [2048, "Profile image URL is too long"],
    }
}, {timestamps: true});

// Explicit unique indexes (in addition to path-level unique) to ensure index creation
studentSchema.index({ email: 1 }, { unique: true });
studentSchema.index({ phone: 1 }, { unique: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;