import {Response } from "express"
import mongoose from "mongoose";
import jwt, { SignOptions } from "jsonwebtoken";
import { CustomJwtPayload, IUser } from "../types/inventory";


//Reusable function to handle errors
 export const handleError = (res: Response, error: unknown, statusCode = 500): void => {
    const errorMessage = error instanceof Error ? error.message : "Server Error";
    res.status(statusCode).json({ error: errorMessage })
}
//Validate MongoDB ObjectId
export const isValidObjectId = (id: string, res: Response): boolean => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ error: "Invalid user ID format" });
        return false;
    }
    return true;
}


const JWT_SECRET = process.env.JWT_SECRET || "dev_tsecret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRATION || "12h";

export const generateToken = (payload: CustomJwtPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);
}
export const verifyToken = (token: string): CustomJwtPayload => {
    return jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
}

export const getUserPermissions = (user: IUser): string[] => {
    // In a real application, you would fetch user permissions from a database or another source
    // external service
    const roleMap: Record<string, string[]> = {
        admin: ["admin", "manager", "staff"],
        manager: ["manager", "staff"],
        staff: ["staff"],
    };
    return roleMap[user.role] || [];
}
