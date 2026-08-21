import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";
import { updateProfile } from "../controllers/userController.js";
import { changePassword } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";
import { uploadProfileImage } from "../controllers/userController.js";

const router = Router();
router.get("/profile", protect, getProfile);
router.put("/update-profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.put(
  "/profile-image", //Ye frontend ke input field ka name hai.
  protect,
  upload.single("profileImage"),
  uploadProfileImage,
);

export default router;
