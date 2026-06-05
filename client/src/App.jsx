import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);
  const [newUser, setNewUser] = useState(false);

  if (!isLoggedIn) {
    return showRegister ? (
      <Register
        onSwitch={() => setShowRegister(false)}
        onRegister={() => {
          setIsLoggedIn(true);
          setNewUser(true);
        }}
      />
    ) : (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={newUser ? <Navigate to="/profile" /> : <Dashboard setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/analytics" element={<Analytics setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/profile"
          element={
            <Profile
              setIsLoggedIn={setIsLoggedIn}
              newUser={newUser}
              onProfileComplete={() => setNewUser(false)}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;