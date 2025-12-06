import express from "express";
import { register, verifyOTP, setupTOTP, verifyTOTPController } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/setup-totp", setupTOTP);
router.post("/verify-totp", verifyTOTPController);

export default router;
