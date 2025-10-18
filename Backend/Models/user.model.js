import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3
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
        minLength: 6,
        unique: true,
        // lowercase: true,
        maxLength: 12,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password must be strong including uppercase, lowercase, number and symbol.');
            }
        }
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
        enum: ['Male', 'Female', 'Other']
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



const User = mongoose.model('User', userSchema);

export default User;