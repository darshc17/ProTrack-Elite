import { useState } from "react";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // This forces the app to use your live Render server!
  const API_URL = "https://protein-tracker-backend.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Notice how we use backticks and the API_URL variable here now
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (!response.ok) { alert(data.message || "Login failed"); return; }
    if (!data.token) { alert("Login failed: no token returned"); return; }
    localStorage.setItem("token", data.token);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-[420px] bg-slate-900 border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">

        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            PROTRACK
          </h1>
          <span className="inline-block mt-1 text-xs font-bold text-purple-400 border border-purple-500/50 rounded px-2 py-0.5 tracking-widest">
            ELITE
          </span>
        </div>

        <p className="text-gray-400 mb-8">Welcome back</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={onRegister}
            className="w-full border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 py-3 rounded-xl transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;