import { useState } from "react";
import "./desktopdashboard.css";
import MetricCard from "./components/MetricCard";
import OverviewChart from "./components/OverviewChart";
import FiresChart from "./components/FiresChart";
import TodoList from "./components/TodoList";
import MeetingsList from "./components/MeetingsList";
import VisionPage from "../desktopvision/visionpage";
import PeoplePage from "../desktoppeople/peoplepage";
import DataPage from "../desktopdata/datapage";


interface DesktopDashboardProps {
    userName?: string;
    onLogout?: () => void;
    onNavigate?: (screen: string) => void;
}

function DesktopDashboard({ userName = "User" }: DesktopDashboardProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [selectedView, setSelectedView] = useState("Rocks");
    const [selectedPeriod, setSelectedPeriod] = useState("Quarterly");
    const [currentPage, setCurrentPage] = useState<"dashboard" | "vision" | "people" | "data">("dashboard");

    // Mock data for the dashboard
    const metrics = {
        rocks: { value: 360, change: 8.70, label: "From last quarter" },
        todos: { value: 280, change: 6.45, label: "From last quarter" },
        fires: { value: 200, change: -7.45, label: "From last quarter" }
    };

    const meetings = [
        {
            id: 1,
            title: "Weekly 1-on-1",
            type: "Team strategy",
            date: "Tue 09.08",
            time: "1:23 pm",
            duration: "1 hour",
            status: "scheduled",
            avatar: "https://ui-avatars.com/api/?name=John+Doe&background=4A90E2&color=fff"
        },
        {
            id: 2,
            title: "Weekly Team...",
            type: "Leadership meeting",
            date: "Tue 09.08",
            time: "1:23 pm",
            duration: "1:11 am",
            status: "scheduled",
            avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=7B68EE&color=fff"
        },
        {
            id: 3,
            title: "Vision Session",
            type: "First Customer Call",
            date: "Tue 09.08",
            time: "1:23 pm",
            duration: "1:11 am",
            status: "scheduled",
            avatar: "https://ui-avatars.com/api/?name=Mike+Johnson&background=FF6B6B&color=fff"
        },
        {
            id: 4,
            title: "Weekly Team...",
            type: "Leadership meeting",
            date: "Tue 09.09",
            time: "1:23 pm",
            duration: "1:11 am",
            status: "scheduled",
            avatar: "https://ui-avatars.com/api/?name=Sarah+Wilson&background=4ECDC4&color=fff"
        },
        {
            id: 5,
            title: "Weekly 1-on-1",
            type: "Leadership meeting",
            date: "Tue 09.09",
            time: "1:23 pm",
            duration: "1:11 am",
            status: "scheduled",
            avatar: "https://ui-avatars.com/api/?name=Tom+Brown&background=FFD93D&color=000"
        }
    ];

    const todos: Array<{
        id: number;
        date: string;
        title: string;
        status: "completed" | "pending";
    }> = [
            {
                id: 1,
                date: "Aug 16, 2025",
                title: "Set Up Conference Room B for 10 AM Meeting",
                status: "completed"
            },
            {
                id: 2,
                date: "Aug 28, 2025",
                title: "Restock Housekeeping Supplies on 3rd Floor",
                status: "pending"
            },
            {
                id: 3,
                date: "Sep 04, 2025",
                title: "Inspect and Clean the Pool Area",
                status: "pending"
            },
            {
                id: 4,
                date: "Sep 14, 2025",
                title: "Check-in Assistance During Peak Hours (4PM - 8PM)",
                status: "pending"
            }
        ];

    const handleNavigation = (page: "dashboard" | "vision" | "people" | "data") => {
        setCurrentPage(page);
    };

    return (
        <div className="desktop-dashboard">
            {/* Header */}
            <header className="desktop-header">
                <div className="header-left">
                    <div className="logo-box">
                        <div className="logo-box-content">
                            <span className="logo-text">GUEST</span>
                            <span className="logo-dash">-</span>
                            <span className="logo-os">OS</span>
                        </div>
                    </div>
                    <nav className="main-nav">
                        <button className="nav-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            Home
                        </button>
                        <button
                            className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
                            onClick={() => handleNavigation("dashboard")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                            Dashboard
                        </button>
                        <button
                            className={`nav-item ${currentPage === "vision" ? "active" : ""}`}
                            onClick={() => handleNavigation("vision")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            Vision
                        </button>
                        <button
                            className={`nav-item ${currentPage === "people" ? "active" : ""}`}
                            onClick={() => handleNavigation("people")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            People
                        </button>
                        <button
                            className={`nav-item ${currentPage === "data" ? "active" : ""}`}
                            onClick={() => handleNavigation("data")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                            Data
                        </button>
                        <button className="nav-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.2 4.2l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.2-4.2l4.2-4.2" />
                            </svg>
                            Process
                        </button>
                        <button className="nav-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            Profit
                        </button>
                        <button className="nav-item">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                            Execution
                        </button>
                    </nav>
                </div>
                <div className="header-right">
                    <button className="icon-btn create-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Create
                    </button>
                    <button className="icon-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </button>
                    <button className="icon-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    <button className="profile-btn">
                        <span className="profile-initials">GT</span>
                    </button>
                </div>
            </header>

            {/* Main Content - Conditional Rendering */}
            {currentPage === "vision" ? (
                <div className="full-page-content">
                    <VisionPage userName="Glenn" />
                </div>
            ) : currentPage === "people" ? (
                <div className="full-page-content">
                    <PeoplePage userName="Glenn" />
                </div>
            ) : currentPage === "data" ? (
                <div className="full-page-content">
                    <DataPage userName="Glenn" />
                </div>
            ) : (
                <>
                    <main className="desktop-main">
                        {/* Dashboard Title and Team Selector */}
                        <div className="dashboard-header-section">
                            <div>
                                <h2 className="dashboard-title">Dashboard</h2>
                                <p className="dashboard-subtitle">A personalized workspace to view tasks, data, goals and more.</p>
                            </div>
                            <div className="team-selector">
                                <label>Team :</label>
                                <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                                    <option>Leadership</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>Operations</option>
                                </select>
                            </div>
                        </div>

                        {/* Metrics Cards */}
                        <div className="metrics-grid">
                            <MetricCard
                                title="Rocks"
                                value={metrics.rocks.value}
                                change={metrics.rocks.change}
                                label={metrics.rocks.label}
                                type="rocks"
                            />
                            <MetricCard
                                title="To-Dos"
                                value={metrics.todos.value}
                                change={metrics.todos.change}
                                label={metrics.todos.label}
                                type="todos"
                            />
                            <MetricCard
                                title="Fires"
                                value={metrics.fires.value}
                                change={metrics.fires.change}
                                label={metrics.fires.label}
                                type="fires"
                                isNegative
                            />
                        </div>

                        {/* Overview Chart */}
                        <div className="chart-section">
                            <OverviewChart
                                selectedView={selectedView}
                                selectedPeriod={selectedPeriod}
                                onViewChange={setSelectedView}
                                onPeriodChange={setSelectedPeriod}
                            />
                        </div>

                        {/* Bottom Section */}
                        <div className="bottom-grid">
                            <div className="fires-section">
                                <FiresChart />
                            </div>
                            <div className="todos-section">
                                <TodoList todos={todos} />
                            </div>
                        </div>
                    </main>

                    {/* Meetings Sidebar */}
                    <aside className="meetings-sidebar">
                        <MeetingsList meetings={meetings} />
                    </aside>
                </>
            )}
        </div>
    );
}

export default DesktopDashboard;