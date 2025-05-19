import { getUserPermissions } from './../utlis/auth.utlis';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utlis/auth.utlis';
import User from '../models/User.models';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers['authorization']?.replace('Bearer ','')
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userid)

    if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
    }

    req.user = user;
    req.userId = user._id.toString();   
    next();
} catch (error) {
        res.status(401).json({ message: 'Invalid token', error: (error as Error).message });
        return;
    }
}

export const authorize = (
    requiredRoles: string[] = [],
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) {
                res.status(403).json({ message: 'Unauthorizerd: User not found' });
                return;
            }

            const userPermissions = getUserPermissions(req.user);
            const hasAccess = requiredRoles.some(role => userPermissions.includes(role));
            if (!hasAccess) {
                res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
                return;
            }
            next();
        } catch (error) {
            res.status(403).json({ message: 'Invalid Permission', error: (error as Error).message });
            console.error('Error in Authorization error:', (error as Error).message);
            return;
        }
    };
};
        