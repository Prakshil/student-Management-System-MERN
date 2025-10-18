import User from "../Models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dns from 'dns';

async function validateEmail(email) {
    

    return new Promise((resolve) => {
        const domain= email.split('@')[1];
        dns.resolveMx(domain, (err, addresses) => {
            if (err || addresses.length === 0) {
                console.log('invalid domain', domain);
                resolve(false);
            }
            else {
                console.log('valid domain', domain);
                resolve(true);
            }
        });
    });
}


const signUp = async (req, res) => {
    try {
        const {username ,email, password, phone, dob, age, gender, address, skills, profileimage} = req.body;
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!emailregex.test(email)) {
            return res.status(400).json(new ApiError(400, "Please provide a valid email address"));
        }
        const isEmailValid = await validateEmail(email);
        if (!isEmailValid) {
            return res.status(400).json(new ApiError(400, "Invalid email domain"));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        
        const user = new User({
            username,
            email,
            password,
            phone,
            dob,
            age,
            gender,
            address,
            skills,
            profileimage
        });
    const newUser = await user.save();
       
        if (!newUser) {
            return res.status(400).json(new ApiError(400, "User creation failed"));
        }
        
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    const safeUser = newUser.toObject ? newUser.toObject() : newUser;
    delete safeUser.password;
    res.status(201).json(new ApiResponse(true, "User created successfully", { user: safeUser, token }));
    } catch (error) {
        res.status(400).json(new ApiError(400, "Failed to create user", [error.message]));
    }
};




const login = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            return res.status(200).json(new ApiResponse(true, "User already logged in"));
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        
        if (password.length < 6 || password.length > 12) {
            return res.status(400).json(new ApiError(400, "Password length must be between 6 and 12 characters"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json(new ApiError(401, "Invalid credentials"));
        }

    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.cookie('token', newToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' });
    const safeUser = user.toObject ? user.toObject() : user;
    delete safeUser.password;
    res.status(200).json(new ApiResponse(true, "Login successful", safeUser));

    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to retrieve users", [error.message]));
    }
};



const singleUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        res.status(200).json(new ApiResponse(true, "User retrieved successfully", user));
    } catch (error) {
        res.status(500).json(new ApiError(500, "Failed to retrieve user", [error.message]));
    }
};




const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }   
        res.status(200).json(new ApiResponse(true, "User updated successfully", user));
    } catch (error) {
        res.status(400).json(new ApiError(400, "Failed to update user", [error.message]));
    }
};




const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }
        res.status(200).json(new ApiResponse(true, "User deleted successfully"));
    }

     catch (error) {
        res.status(500).json(new ApiError(500, "Failed to delete user", [error.message]));
    }
};
export { signUp, login, singleUser, updateUser, deleteUser };