import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await axios.post("http://localhost:5000/api/auth/register", { email, password }, { withCredentials: true });
    window.location.href = "/otp?email=" + email;
  };

  return (
    <div className="p-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input className="w-full p-3 border mb-3" placeholder="Email"
        onChange={e => setEmail(e.target.value)} />

      <input className="w-full p-3 border mb-3" type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </div>
  );
}
