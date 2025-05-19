import { Request, Response } from "express";
import User from "../models/User.models";
import bcrypt from "bcrypt";
import { generateToken, handleError } from "../utlis/auth.utlis";
import { isValidObjectId } from "mongoose";
import { IUser } from "../types/inventory";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password, role } = req.body;
if (!username || !email || !password || !role) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const PasswordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name: username, email, role, passwordHash: PasswordHash });
        const token = generateToken({
            userid: newUser._id.toString(),
            email: newUser.email,
            role: newUser.role,
        })
        res.status(201).json({ user: { id: newUser._id, name:username, email, role: newUser.role }, token });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: (error as Error).message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }   

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = generateToken({
            userid: user._id.toString(),
            email: user.email,
            role: user.role,
        });
         
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res
        .status(400)
        .json({ message: "Login failed", error: (error as Error).message });
    }       
}

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(404).json({ Sucess: false, message: "Unauthorized" });
            return;
        }
        const userObj = req.user.toObject?.() ?? req.user;
        const { passwordHash, ...safeUser } = userObj;
        res.status(200).json({ 
            sucess: true,
            data: safeUser,
            message: `Welcome back, ${safeUser.name}`,
        });
    } catch (error) {
        console.error('Error in auth routh', error);
        res.status(500).json({ message: "Error fetching user", error: (error as Error).message });
    }
};

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid user ID" });
        return;
    }

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
