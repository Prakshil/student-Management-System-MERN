import ApiError from '../utils/ApiError.js';

export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new ApiError(401, 'Authentication required');
        }

        if (req.user.role !== 'admin') {
            throw new ApiError(403, 'Access denied. Admin privileges required.');
        }

        next();
    } catch (error) {
        next(error);
    }
};
