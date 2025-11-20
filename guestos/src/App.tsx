import { useState } from "react";
import "./App.css";
import LoginScreen from "./screens/login/loginscreen";
import DashboardScreen from "./screens/dashboard/dashboardscreen";
import VisionScreen from "./screens/vision/visionscreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "vision">("dashboard");

  // This would be called after successful login
  const handleLoginSuccess = (username: string) => {
    setIsAuthenticated(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: "dashboard" | "vision") => {
    setCurrentScreen(screen);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentScreen === "vision") {
    return <VisionScreen userName={userName} onNavigate={handleNavigate} />;
  }

  return <DashboardScreen userName={userName} onLogout={handleLogout} onNavigate={handleNavigate} />;
}

export default App;
