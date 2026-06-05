import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import WeightForm from "../components/WeightForm";
import WeightHistory from "../components/WeightHistory";

function Profile({ setIsLoggedIn, newUser, onProfileComplete }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [weights, setWeights] = useState([]);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [goalType, setGoalType] = useState("");
  const [activityLevel, setActivityLevel] = useState("");

  const fetchWeights = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/weight", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => setWeights(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Weights fetch error:", error);
        setWeights([]);
      });
  };

  const fetchProfile = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setName(data.name || "");
        setWeight(data.weight || "");
        setHeight(data.height || "");
        setAge(data.age || "");
        setSex(data.sex || "");
        setGoalType(data.goal_type || "");
        setActivityLevel(data.activity_level || "");
      })
      .catch((error) => {
        console.error("Profile fetch error:", error);
        setProfile(null);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchWeights();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:5000/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, weight, height, age, sex, goal_type: goalType, activity_level: activityLevel }),
    });
    fetchProfile();

    if (newUser) {
      onProfileComplete();
      navigate("/");
    } else {
      alert("Profile Updated");
    }
  };

  if (!profile) return <h2 className="text-white p-8">Loading...</h2>;

  const inputClass = "w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-500";
  const labelClass = "block text-gray-400 text-sm mb-1 mt-4";

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 p-8 text-white">

        {/* New user banner */}
        {newUser && (
          <div className="bg-purple-500/20 border border-purple-500/40 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">👋</span>
            <div>
              <p className="text-purple-300 font-semibold">Welcome to PROTRACK!</p>
              <p className="text-gray-400 text-sm">Please fill in your details so we can calculate your personalised protein goal.</p>
            </div>
          </div>
        )}

        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="grid grid-cols-2 gap-6">

          {/* Personal Information */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-500/10">
            <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
            <p className="text-gray-400 text-sm mb-4">Email: {profile.email}</p>

            <label className={labelClass}>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />

            <label className={labelClass}>Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" className={inputClass} />

            <label className={labelClass}>Sex</label>
            <select value={sex} onChange={(e) => setSex(e.target.value)} className={inputClass}>
              <option value="">Select Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label className={labelClass}>Weight (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 75" className={inputClass} />

            <label className={labelClass}>Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 175" className={inputClass} />
          </div>

          {/* Goals & Activity */}
          <div className="bg-slate-900 p-8 rounded-3xl border border-cyan-500/10">
            <h2 className="text-2xl font-bold mb-6">Goals & Activity</h2>

            <label className={labelClass}>Goal</label>
            <select value={goalType} onChange={(e) => setGoalType(e.target.value)} className={inputClass}>
              <option value="">Select Goal</option>
              <option value="fat_loss">Lose Fat</option>
              <option value="maintain">Maintain Weight</option>
              <option value="muscle_gain">Build Muscle</option>
            </select>

            <label className={labelClass}>Activity Level</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className={inputClass}>
              <option value="">Select Activity Level</option>
              <option value="sedentary">Sedentary (desk job, no exercise)</option>
              <option value="light">Lightly Active (1-3x/week)</option>
              <option value="moderate">Moderately Active (3-5x/week)</option>
              <option value="active">Very Active (6-7x/week)</option>
            </select>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mt-6">
              <p className="text-cyan-400 text-sm">Recommended Protein</p>
              <p className="text-3xl font-bold mt-1">
                {profile.protein_goal}g
                <span className="text-gray-400 text-lg font-normal">/day</span>
              </p>
              <p className="text-gray-500 text-xs mt-2">Based on your weight, age, goal & activity level</p>
            </div>

            <button
              onClick={updateProfile}
              className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition"
            >
              {newUser ? "Save & Go to Dashboard →" : "Update Profile"}
            </button>
          </div>

        </div>

        {/* Hide weight tracking for new users — not relevant yet */}
        {!newUser && (
          <div className="mt-6 bg-slate-900 p-8 rounded-3xl border border-cyan-500/10">
            <h2 className="text-2xl font-bold mb-6">Weight Tracking</h2>
            <WeightForm refreshWeights={fetchWeights} />
            <div className="mt-8">
              <WeightHistory weights={weights} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Profile;