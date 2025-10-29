import ApiError from "../utils/ApiError.js";

// Centralized Express error handler
export default function errorHandler(err, req, res, next) {
  // If response already sent, delegate to default handler
  if (res.headersSent) return next(err);

  let status = 500;
  let message = "Internal Server Error";
  let errors = [];

  // Known custom error
  if (err instanceof ApiError) {
    status = err.statusCode || 500;
    message = err.message || message;
    errors = Array.isArray(err.errors) ? err.errors : [];
  }

  // Mongoose validation error
  else if (err?.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    errors = Object.values(err.errors || {}).map((e) => e.message);
  }

  // Duplicate key error
  else if (err?.code === 11000) {
    status = 409;
    const fields = Object.keys(err.keyValue || {});
    message = `Duplicate value for field(s): ${fields.join(", ")}`;
    errors = [message];
  }

  // JWT errors
  else if (err?.name === "JsonWebTokenError") {
    status = 401;
    message = "Unauthorized: Invalid token";
  } else if (err?.name === "TokenExpiredError") {
    status = 401;
    message = "Unauthorized: Token expired";
  }

  return res.status(status).json(new ApiError(status, message, errors));
}
