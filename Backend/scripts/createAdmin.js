import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../Models/user.model.js';

dotenv.config();

const createAdminUser = async () => {
    try {
        // Connect to database with explicit database name
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.DB_NAME || 'mydatabase'
        });
        console.log(`Database connected to ${process.env.DB_NAME || 'mydatabase'}`);

        const adminEmail = 'prakshilmpatel@gmail.com';
        const adminPassword = '123456';

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            // Update existing user to admin
            existingAdmin.role = 'admin';
            if (adminPassword) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                existingAdmin.password = hashedPassword;
            }
            await existingAdmin.save();
            console.log(`User ${adminEmail} updated to admin role`);
        } else {
            // Create new admin user
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            
            const adminUser = new User({
                username: 'admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'admin',
                dob: new Date('1990-01-01'),
                age: 34,
                gender: 'male',
                phone: 1234567890,
                address: 'Admin Office'
            });

            await adminUser.save();
            console.log(`Admin user created: ${adminEmail}`);
        }

        await mongoose.disconnect();
        console.log('Database disconnected');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdminUser();
