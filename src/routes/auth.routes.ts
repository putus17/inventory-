import { Router } from "express";
import { register,
    login,
    getProfile,
} from "../controllers/auth.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import {  updateUser } from "../controllers/user.controller";


const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authenticate, getProfile);

router.put('proflie/:id', authenticate, updateUser);

// Only admin can access this route
router.get("/admin-data", authenticate, authorize(['admin']), 
(_req, res) => {
    res.status(200).json({ message: "Admin-only content" });
});

// Only manger or admin can access this
router.get("/manager-data", authenticate, authorize(['manager', 'admin']), 
(_req, res) => {
    res.status(200).json({ message: "Manager and Admin content" });
});

router.get("/staff-data", authenticate, authorize(['staff']),
 (_req, res) => {
    res.status(200).json({ message: "Staff content" });
});


export default router;



