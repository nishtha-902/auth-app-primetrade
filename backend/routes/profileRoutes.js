// profileRoutes.js
import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/profileController.js";
const router = express.Router();
router.get("/", protect, getProfile);
export default router;
