import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import OTPVerify from "./pages/OTPVerify";
import TOTPSetup from "./pages/TOTPSetup";
import TOTPVerify from "./pages/TOTPVerify";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/otp" element={<OTPVerify />} />
        <Route path="/totp-setup" element={<TOTPSetup />} />
        <Route path="/totp-verify" element={<TOTPVerify />} />
      </Routes>
    </BrowserRouter>
  );
}
