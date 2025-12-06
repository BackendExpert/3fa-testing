import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    otp: String,
    otpExpires: Date,
    totpSecret: String,
    isVerified: { type: Boolean, default: false }
});

export default mongoose.model("User", userSchema);
