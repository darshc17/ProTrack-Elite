import { useState } from "react";

function Register({ onSwitch, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    if (!data.token) {
      alert("Registration failed: no token returned");
      return;
    }

    localStorage.setItem("token", data.token);
    onRegister();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-[420px] bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">PROTRACK</h1>
        <p className="text-gray-400 mt-2">Create Account</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />
          <button type="submit" className="w-full bg-purple-600 py-3 rounded-xl text-white font-semibold">
            Register
          </button>
          <button type="button" onClick={onSwitch} className="w-full border border-purple-500 text-purple-400 py-3 rounded-xl">
            Already have an account?
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;