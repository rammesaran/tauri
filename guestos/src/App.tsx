import { useState } from "react";
import "./App.css";
import LoginScreen from "./screens/login/loginscreen";
import DashboardScreen from "./screens/dashboard/dashboardscreen";

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
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return <DashboardScreen userName={userName} onLogout={handleLogout} />;
}

export default App;
