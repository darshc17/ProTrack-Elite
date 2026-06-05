import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import HeroCard from "../components/HeroCard";
import StatsCards from "../components/StatsCards";
import FoodForm from "../components/FoodForm";
import FoodList from "../components/FoodList";

function Dashboard({ setIsLoggedIn }) {
  const [dashboard, setDashboard] = useState(null);
  const [foodLogs, setFoodLogs] = useState([]);
  const [recommendationsData, setRecommendationsData] = useState(null);

  const fetchDashboard = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then(setDashboard)
      .catch((error) => {
        console.error("Dashboard fetch error:", error);
        setDashboard(null);
      });
  };

  const fetchLogs = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    fetch("http://localhost:5000/food-logs", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setFoodLogs(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Food logs fetch error:", error);
        setFoodLogs([]);
      });
  };

  const fetchRecommendations = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    fetch("http://localhost:5000/foods/recommendations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
          throw new Error(`HTTP Error: ${res.status}`);
        }
        return res.json();
      })
      .then(setRecommendationsData)
      .catch((error) => {
        console.error("Recommendations fetch error:", error);
        setRecommendationsData(null);
      });
  };

  useEffect(() => {
    fetchDashboard();
    fetchLogs();
    fetchRecommendations();
  }, []);

  if (!dashboard) return <h2 className="text-white p-8">Loading...</h2>;

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <main className="flex-1 p-8">

        <HeroCard dashboard={dashboard} />
        <StatsCards dashboard={dashboard} />

        {/* Bottom section: food list (left, wider) + quick add (right, narrower) */}
        <div className="flex gap-6 mt-6 items-start">
          <div className="flex-1">
            <FoodList
              logs={foodLogs}
              refreshLogs={fetchLogs}
              refreshDashboard={fetchDashboard}
              refreshRecommendations={fetchRecommendations}
              recommendationsData={recommendationsData}
            />
          </div>
          <div className="w-80 flex-shrink-0 flex flex-col gap-6">
            <FoodForm
              refreshLogs={fetchLogs}
              refreshDashboard={fetchDashboard}
              refreshRecommendations={fetchRecommendations}
            />
          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;