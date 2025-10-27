import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {
  try {
    // Helpful connection options:
    // - serverSelectionTimeoutMS: fail fast if cluster isn't reachable
    // - family: 4 forces IPv4 (prevents some DNS/IPv6 issues on Atlas)
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 15000,
      family: 4,
    });

    // Basic connection event logging
    const conn = mongoose.connection;
    conn.on('connected', () => console.log('MongoDB connected'));
    conn.on('error', (err) => console.error('MongoDB connection error:', err.message));
    conn.on('disconnected', () => console.warn('MongoDB disconnected'));
    
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default ConnectDB;
