import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../Models/user.model.js';
import ApiError from '../utils/ApiError.js';

const auth = async (req, res, next) => {
    try {
        
        let token = req?.cookies?.token;
        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized: No token provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json(new ApiError(401, "Unauthorized: Invalid token"));
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json(new ApiError(404, "User not found"));
        }

        req.user = user; 
        next();
    } catch (error) {
        return res.status(401).json(new ApiError(401, "Unauthorized: Invalid or expired token"));
    }
};

// Export as both default and named export for compatibility
export const isAuthenticated = auth;
export default auth;    