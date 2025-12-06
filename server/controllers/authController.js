import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import { generateOTP } from "../services/otpService.js";
import { createTOTPSecret, verifyTOTP } from "../services/totpService.js";

export const register = async (req, res) => {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = await User.create({
        email,
        password: hashed,
        otp,
        otpExpires: Date.now() + 300000 // 5 mins
    });

    await transporter.sendMail({
        to: email,
        subject: "Verify Your Account",
        text: `Your OTP is ${otp}`
    });

    res.json({ success: true, msg: "OTP sent to email" });
};

export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
        return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ success: true });
};

export const setupTOTP = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    const { secret, qrCode } = await createTOTPSecret(email);
    user.totpSecret = secret;
    await user.save();

    res.json({ qrCode });
};

export const verifyTOTPController = async (req, res) => {
    try {
        const { email, token } = req.body;

        if (!email || !token) {
            return res.status(400).json({ msg: "Email and token required" });
        }

        const user = await User.findOne({ email });
        if (!user || !user.totpSecret) {
            return res.status(400).json({ msg: "User not found or TOTP not set up" });
        }

        const isValid = verifyTOTP(user.totpSecret, token);

        if (!isValid) return res.status(400).json({ msg: "Invalid TOTP token" });

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ success: true, token: jwtToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};



