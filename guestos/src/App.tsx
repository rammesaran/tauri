import { useState } from "react";
import "./App.css";
import LoginScreen from "./screens/login/loginscreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  // This would be called after successful login
  const handleLoginSuccess = (username: string) => {
    setIsAuthenticated(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
  };

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // Your main app content after login
  return (
    <main className="container">
      <h1>Welcome, {userName}!</h1>
      <p>You are now logged into your personalized workspace.</p>

      <div className="dashboard">
        <div className="card">
          <h2>Tasks</h2>
          <p>View and manage your tasks</p>
        </div>

        <div className="card">
          <h2>Data</h2>
          <p>Access your data and analytics</p>
        </div>

        <div className="card">
          <h2>Goals</h2>
          <p>Track your goals and progress</p>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </main>
  );
}

export default App;