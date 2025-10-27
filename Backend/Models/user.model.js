import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email format, Please Check again.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        select: false // do not return hashed password by default
    },
    phone:{
        type: Number,
        trim: true
    },
    dob:{
        type: Date,
        required: true,
        default: Date.now
    },
    age:{
        type: Number,
        min:18
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true,
        lowercase: true,
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be 'male', 'female' or 'other'",
        },
    },
    address: {
        type: String,
        // required: true,
        trim: true
    },
    skills: {
        type: [String],
        default: []
    },
    profileimage: {
        type: String,
        // required: true,
        default: 'https://imgs.search.brave.com/FWHa9QRttw1JSSHVgTxnaCCKeCisCTYKWv3idxlo3AI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3ZncmVwby5jb20v/c2hvdy8zMzU0NTUv/cHJvZmlsZS1kZWZh/dWx0LnN2Zw'
    }
}, {
    timestamps: true
}); 

export default mongoose.model("User", userSchema);