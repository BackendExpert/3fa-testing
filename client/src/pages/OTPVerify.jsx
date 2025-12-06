import { useState } from "react";
import axios from "axios";

export default function OTPVerify() {
    const email = new URLSearchParams(window.location.search).get("email");
    const [otp, setOtp] = useState("");

    const submit = async () => {
        await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp });

        window.location.href = "/totp-setup?email=" + email;
    };

    return (
        <div className="p-10 max-w-sm mx-auto">
            <h1 className="text-xl font-bold mb-3">Enter OTP</h1>

            <input className="w-full p-3 border mb-3" placeholder="OTP"
                onChange={e => setOtp(e.target.value)} />

            <button onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">Verify OTP</button>
        </div>
    );
}
