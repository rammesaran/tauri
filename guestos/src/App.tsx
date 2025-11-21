import { useState } from "react";
import "./App.css";
import LoginScreen from "./screens/login/loginscreen";
import DashboardScreen from "./screens/dashboard/dashboardscreen";
import VisionScreen from "./screens/vision/visionscreen";
import TodoScreen from "./screens/Todo/todoscreen";
import ProfitScreen from "./screens/dashboard/profit/profitscreen";
import AddTodoScreen from "./screens/Todo/AddTodo/addtodoscreen";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "vision" | "todo" | "addtodo" | "profit">("dashboard");

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

  const handleNavigate = (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit") => {
    setCurrentScreen(screen);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
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

  return <DashboardScreen userName={userName} onLogout={handleLogout} onNavigate={handleNavigate} />;
}

export default App;