import { useState } from "react";
import "./App.css";
import LoginScreen from "./screens/login/loginscreen";
import VisionScreen from "./screens/vision/visionscreen";
import TodoScreen from "./screens/Todo/todoscreen";
import MeetingScreen from "./screens/dashboard/meeting/meetingscreen";
import ScorecardScreen from "./screens/dashboard/scorecard/scorecardscreen";
import ProfitScreen from "./screens/dashboard/profit/profitscreen";
import AddTodoScreen from "./screens/Todo/AddTodo/addtodoscreen";
import GeyserScreen from "./screens/geysers/geyserscreen";
import ResponsiveDashboard from "./screens/responsivedashboard/responsivedashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting" | "geyser">("dashboard");

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

  const handleNavigate = (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting" | "geyser") => {
    setCurrentScreen(screen);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentScreen === "geyser") {
    return <GeyserScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "meeting") {
    return <MeetingScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "scorecard") {
    return <ScorecardScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "profit") {
    return <ProfitScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "addtodo") {
    return <AddTodoScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "todo") {
    return <TodoScreen onNavigate={handleNavigate} />;
  }

  if (currentScreen === "vision") {
    return <VisionScreen userName={userName} onNavigate={handleNavigate} />;
  }

  // Use ResponsiveDashboard instead of DashboardScreen
  return (
    <ResponsiveDashboard
      userName={userName}
      onLogout={handleLogout}
      onNavigate={handleNavigate}
    />
  );
}

export default App;