import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // <-- LOAD ENV HERE TOO

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"BlackAlphaLabs" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log("Email sent:", info.messageId);
        return true;
    } catch (error) {
        console.error("Email error:", error);
        return false;
    }
};
