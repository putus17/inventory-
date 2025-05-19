import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import { Response, Request } from "express";
import { handleError, isValidObjectId } from '../utlis/auth.utlis';
import User from '../models/User.models';
import { IUser } from '../types/inventory';



// Create user
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, role, password } = req.body;
        const existingUser = await User.findOne({ email }).select('_id').lean();
        if (existingUser) {
            res.status(400).json({ message: 'Email already exists' });
            return;
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, role,  passwordHash });

        res.status(200).json({
            message: 'User created successfully.',
            user: newUser,
        });
    } catch (error) {
        handleError(res, error);
    }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    if (!isValidObjectId(userId, res)) return;

    try {
        const user = await User.findById(userId).select('-password').lean();
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!isValidObjectId(id, res)) return;

    if (!name && !email && !password) {
        res.status(400).json({ message: "No update fields provided" });
        return;
    }

    try {
        const updateData: Partial<IUser> & { password?: string } = {};
        if (name) updateData.name = name;
        if (email) {
            const emailExists = await User.findOne({ email, _id: { $ne: id } }).select('_id').lean();
            if (emailExists) {
                res.status(400).json({ message: "Email already in use" });
                return;
            }
            updateData.email = email;
        }
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password').lean();
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        handleError(res, error);
    }
};
