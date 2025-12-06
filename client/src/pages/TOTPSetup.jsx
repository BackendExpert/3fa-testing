import { useEffect, useState } from "react";
import axios from "axios";

export default function TOTPSetup() {
    const [qr, setQr] = useState("");
    const email = new URLSearchParams(window.location.search).get("email");

    useEffect(() => {
        axios.post("http://localhost:5000/api/auth/setup-totp", { email })
            .then(res => setQr(res.data.qrCode));
    }, []);

    return (
        <div className="p-10 text-center">
            <h1 className="text-xl font-bold mb-4">Scan QR in Google Authenticator</h1>
            {qr && <img src={qr} alt="TOTP QR" className="mx-auto" />}
            <a className="underline mt-4 block" href={"/totp-verify?email=" + email}>Continue</a>
        </div>
    );
}
