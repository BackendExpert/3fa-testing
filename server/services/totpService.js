import speakeasy from "speakeasy";
import QRCode from "qrcode";

export const createTOTPSecret = async (email) => {
    const secret = speakeasy.generateSecret({
        name: `YourApp (${email})`,
    });

    const qrCode = await QRCode.toDataURL(secret.otpauth_url);

    return { secret: secret.base32, qrCode };
};

export const verifyTOTP = (secret, token) => {
    return speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1,
    });
};
