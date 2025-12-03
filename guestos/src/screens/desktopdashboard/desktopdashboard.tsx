import { useState } from "react";
import "./desktopdashboard.css";
import MetricCard from "./components/MetricCard";
import OverviewChart from "./components/OverviewChart";
import FiresChart from "./components/FiresChart";
import TodoList from "./components/TodoList";
import MeetingsList from "./components/MeetingsList";
import ProfitPage from "../desktopprofit/component/profitpage";
import DataPage from "../desktopdata/datapage";
import PeoplePage from "../desktoppeople/peoplepage";
import VisionPage from "../desktopvision/visionpage";
import Header from "./components/headercomponent";

interface DesktopDashboardProps {
    userName?: string;
    onLogout?: () => void;
    onNavigate?: (screen: string) => void;
}

function DesktopDashboard({ }: DesktopDashboardProps) {
    const [selectedTeam, setSelectedTeam] = useState("Leadership");
    const [selectedView, setSelectedView] = useState("Rocks");
    const [selectedPeriod, setSelectedPeriod] = useState("Quarterly");
    const [currentPage, setCurrentPage] = useState<"dashboard" | "vision" | "people" | "data" | "profit">("dashboard");

    // Mock data for the dashboard
    const metrics = {
        rocks: { value: 360, change: 8.70, label: "From last quarter" },
        todos: { value: 280, change: 6.45, label: "From last quarter" },
        fires: { value: 200, change: -7.45, label: "From last quarter" }
    };

    // Add this to your DesktopDashboard.tsx - Updated meetings mock data

    const meetings = [
        {
            id: 1,
            title: "Weekly 1-on-1",
            type: "Team strategy",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/jack.jpg",
            role: "Lead"
        },
        {
            id: 2,
            title: "Weekly Team...",
            type: "Leadership meeting",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/cat.jpg",
            role: "Lead"
        },
        {
            id: 3,
            title: "Vision Session",
            type: "First Customer Call",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/andy.jpg",
            role: "Lead"
        },
        {
            id: 4,
            title: "Weekly Team...",
            type: "Leadership meeting",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/helan.jpg",
            role: "Lead"
        },
        {
            id: 5,
            title: "Foundation Day",
            type: "Leadership meeting",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/jack.jpg",
            role: "Lead"
        },
        {
            id: 6,
            title: "Weekly 1-on-1",
            type: "Leadership meeting",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/rose.jpg",
            role: "Lead"
        },
        {
            id: 7,
            title: "Weekly Team...",
            type: "Leadership meeting",
            date: "Tue 02.09",
            time: "1:23 pm",
            duration: "11:19 am",
            status: "scheduled",
            avatar: "images/sam.jpg",
            role: "Lead"
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



    return (
        <div className="desktop-dashboard">
            <Header
                currentPage={currentPage}
                onNavigate={(page) => setCurrentPage(page)}
            />

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
            ) : currentPage === "profit" ? (
                <div className="full-page-content">
                    <ProfitPage userName="Glenn" />
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