import { useState } from "react";
import "./dashboardscreen.css";
import mockData from "./mockData.json";
import OverviewCard from "./overiviewcard";

interface DashboardScreenProps {
    userName?: string;
    onLogout: () => void;
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting" | "geyser") => void;
    dashboardData?: typeof mockData;
}

function DashboardScreen({ userName, onNavigate, dashboardData = mockData }: DashboardScreenProps) {
    const [activeNav, setActiveNav] = useState("home");

    const handleNavClick = (nav: string) => {
        setActiveNav(nav);
        if (nav === "view" && onNavigate) {
            onNavigate("vision");
        }
        if (nav === "todo" && onNavigate) {
            onNavigate("todo");
        }

        if (nav === "geyser" && onNavigate) {
            console.log("navvvv");
            onNavigate("geyser");
        }
    };

    const handleOverviewClick = () => {
        if (onNavigate) {
            onNavigate("profit");
        }
    };

    const handleReportClick = () => {
        if (onNavigate) {
            onNavigate("scorecard");
        }
    };

    const handleMeetingClick = () => {
        if (onNavigate) {
            onNavigate("meeting");
        }
    };

    // Use passed userName or fallback to mockData
    const displayName = userName || dashboardData.user.name;

    // Calculate pie chart segments
    const calculatePieSegment = (percentage: number, startPercentage: number) => {
        const circumference = 502.65;
        const dashArray = (percentage / 100) * circumference;
        const dashOffset = -(startPercentage / 100) * circumference;
        return { dashArray, dashOffset };
    };

    const completedSegment = calculatePieSegment(dashboardData.todoStats.completed.percentage, 0);
    const inProgressSegment = calculatePieSegment(
        dashboardData.todoStats.inProgress.percentage,
        dashboardData.todoStats.completed.percentage
    );
    const yetToStartSegment = calculatePieSegment(
        dashboardData.todoStats.yetToStart.percentage,
        dashboardData.todoStats.completed.percentage + dashboardData.todoStats.inProgress.percentage
    );

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="logo-section">
                    <h1 className="logo-dashboard">
                        <span className="logo-text-dashboard">Guest </span>
                        <span className="logo-os-dashboard">OS</span>
                    </h1>
                </div>
                <div className="header-actions">
                    <button className="notification-btn" aria-label="Notifications">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>
                    <button className="profile-btn" aria-label="Profile">
                        <img src={dashboardData.user.profileImage} alt="Profile" className="profile-img" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Greeting Section */}
                <section className="greeting-section">
                    <h1 className="greeting-title">Hello {displayName}!</h1>
                    <p className="greeting-subtitle">This is your current To-Dos, Rock & Fires</p>
                </section>

                {/* Upcoming Meeting Card */}
                <section className="meeting-card" onClick={handleMeetingClick} style={{ cursor: 'pointer' }}>
                    <div className="meeting-header">
                        <span className="meeting-label">Upcoming Meeting in {dashboardData.upcomingMeeting.timeUntil}</span>
                    </div>
                    <div className="meeting-content">
                        <img
                            src={dashboardData.upcomingMeeting.hostImage}
                            alt="Meeting host"
                            className="meeting-avatar"
                        />
                        <div className="meeting-details">
                            <h3 className="meeting-title">{dashboardData.upcomingMeeting.title}</h3>
                            <p className="meeting-subtitle">{dashboardData.upcomingMeeting.subtitle}</p>
                        </div>
                        <button className="join-btn" onClick={(e) => e.stopPropagation()}>
                            🎥 Join
                        </button>
                    </div>
                </section>

                {/* Overview Section */}
                <OverviewCard
                    data={dashboardData.overview}
                    onCardClick={handleOverviewClick}
                    onReportClick={handleReportClick}
                />

                {/* To-Do Section */}
                <section className="todo-section">
                    <div className="section-header">
                        <h2 className="section-title">To-Do</h2>
                        <button className="view-all-btn" onClick={() => handleNavClick('todo')}>👁️ View All To-Do</button>
                    </div>

                    <div className="todo-chart-container">
                        <div className="pie-chart">
                            <svg viewBox="0 0 200 200" className="pie-svg">
                                {/* Completed */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={dashboardData.todoStats.completed.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${completedSegment.dashArray} 502.65`}
                                    transform="rotate(-90 100 100)"
                                />
                                {/* In Progress */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={dashboardData.todoStats.inProgress.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${inProgressSegment.dashArray} 502.65`}
                                    strokeDashoffset={inProgressSegment.dashOffset}
                                    transform="rotate(-90 100 100)"
                                />
                                {/* Yet to Start */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke={dashboardData.todoStats.yetToStart.color}
                                    strokeWidth="40"
                                    strokeDasharray={`${yetToStartSegment.dashArray} 502.65`}
                                    strokeDashoffset={yetToStartSegment.dashOffset}
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                        </div>

                        <div className="chart-legend">
                            <div className="legend-item">
                                <span
                                    className="legend-dot completed"
                                    style={{ backgroundColor: dashboardData.todoStats.completed.color }}
                                ></span>
                                <span className="legend-text">{dashboardData.todoStats.completed.label}</span>
                                <span className="legend-percentage">{dashboardData.todoStats.completed.percentage}%</span>
                            </div>
                            <div className="legend-item">
                                <span
                                    className="legend-dot progress"
                                    style={{ backgroundColor: dashboardData.todoStats.inProgress.color }}
                                ></span>
                                <span className="legend-text">{dashboardData.todoStats.inProgress.label}</span>
                                <span className="legend-percentage">{dashboardData.todoStats.inProgress.percentage}%</span>
                            </div>
                            <div className="legend-item">
                                <span
                                    className="legend-dot yet-to-start"
                                    style={{ backgroundColor: dashboardData.todoStats.yetToStart.color }}
                                ></span>
                                <span className="legend-text">{dashboardData.todoStats.yetToStart.label}</span>
                                <span className="legend-percentage">{dashboardData.todoStats.yetToStart.percentage}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Pending To-Do's */}
                    <div className="pending-todos">
                        <div className="pending-header">
                            <h3 className="pending-title">Pending To-Do's</h3>
                            <button className="view-details-btn">View Details</button>
                        </div>

                        <div className="todo-list">
                            {dashboardData.pendingTodos.map((todo) => (
                                <div key={todo.id} className="todo-item">
                                    <div className="todo-info">
                                        <span className="todo-item-title">Title</span>
                                        <span className="todo-item-subtitle">{todo.title}</span>
                                    </div>
                                    <div className="todo-meta">
                                        <span className="todo-due">Due by</span>
                                        <span className="todo-date">{todo.dueDate}</span>
                                    </div>
                                    <button className="todo-arrow">→</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Fire Section */}
                <section className="metric-card fire-card">
                    <div className="metric-header">
                        <div className="metric-info">
                            <h3 className="metric-title">{dashboardData.metrics.fire.title}</h3>
                            <p className="metric-subtitle">{dashboardData.metrics.fire.description}</p>
                        </div>
                        <div className="metric-percentage">{dashboardData.metrics.fire.percentage}%</div>
                    </div>
                </section>

                {/* Rocks Section */}
                <section className="metric-card rocks-card">
                    <div className="metric-header">
                        <div className="metric-info">
                            <h3 className="metric-title">{dashboardData.metrics.rocks.title}</h3>
                            <p className="metric-subtitle">{dashboardData.metrics.rocks.description}</p>
                        </div>
                        <div className="metric-percentage">{dashboardData.metrics.rocks.percentage}%</div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation - BUG FIX #3: Shows text labels for active nav items */}
            <nav className="bottom-nav">
                <button
                    className={`nav-btn ${activeNav === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveNav('home')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    <span className="nav-label">Home</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'view' ? 'active' : ''}`}
                    onClick={() => handleNavClick('view')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                    <span className="nav-label">View</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'geyser' ? 'active' : ''}`}
                    onClick={() => handleNavClick('geyser')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span className="notification-badge">0</span>
                    </span>
                    <span className="nav-label">Info</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'menu' ? 'active' : ''}`}
                    onClick={() => handleNavClick('todo')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6" />
                            <line x1="8" y1="12" x2="21" y2="12" />
                            <line x1="8" y1="18" x2="21" y2="18" />
                            <line x1="3" y1="6" x2="3.01" y2="6" />
                            <line x1="3" y1="12" x2="3.01" y2="12" />
                            <line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                    </span>
                    <span className="nav-label">To-Do's</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'more' ? 'active' : ''}`}
                    onClick={() => setActiveNav('more')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                        </svg>
                    </span>
                    <span className="nav-label">More</span>
                </button>
            </nav>
        </div>
    );
}

export default DashboardScreen;