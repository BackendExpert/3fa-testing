import { useState } from "react";
import axios from "axios";

export default function TOTPVerify() {
    // Get email from query string
    const email = new URLSearchParams(window.location.search).get("email");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!email) return alert("Email is missing. Go back and start login flow again.");
        if (!token) return alert("Please enter your 6-digit TOTP code.");

        setLoading(true);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/verify-totp",
                { email, token },
                { withCredentials: true } // ensure cookies / CSRF work
            );

            localStorage.setItem("token", res.data.token);
            alert("Logged in successfully!");
            // Optionally redirect to dashboard
            window.location.href = "/dashboard";
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.msg || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-sm mx-auto">
            <h1 className="text-xl font-bold mb-3">Enter Authenticator Code</h1>

            <input
                className="w-full p-3 border mb-3"
                placeholder="6-digit code"
                value={token}
                onChange={e => setToken(e.target.value)}
                maxLength={6}
            />

            <button
                onClick={submit}
                className={`w-full bg-purple-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
            >
                {loading ? "Verifying..." : "Verify"}
            </button>
        </div>
    );
}
