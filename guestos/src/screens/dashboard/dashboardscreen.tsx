import { useState } from "react";
import "./dashboardscreen.css";

interface DashboardScreenProps {
    userName: string;
    onLogout: () => void;
}

function DashboardScreen({ userName, onLogout }: DashboardScreenProps) {
    const [activeNav, setActiveNav] = useState("home");

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="dashboard-header">
                <div className="logo-section">
                    <div className="logo-dashboard">
                        <span className="logo-text-dashboard">Guest</span>
                        <span className="logo-os-dashboard">OS</span>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="notification-btn" aria-label="Notifications">
                        🔔
                    </button>
                    <button className="profile-btn" aria-label="Profile">
                        <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="profile-img" />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="dashboard-main">
                {/* Greeting Section */}
                <section className="greeting-section">
                    <h1 className="greeting-title">Hello {userName}!</h1>
                    <p className="greeting-subtitle">This is your current To-Dos, Rock & Fires</p>
                </section>

                {/* Upcoming Meeting Card */}
                <section className="meeting-card">
                    <div className="meeting-header">
                        <span className="meeting-label">Upcoming Meeting in 10 Min</span>
                    </div>
                    <div className="meeting-content">
                        <img src="https://i.pravatar.cc/150?img=12" alt="Meeting host" className="meeting-avatar" />
                        <div className="meeting-details">
                            <h3 className="meeting-title">Weekly 1-on-1</h3>
                            <p className="meeting-subtitle">Leadership team meeting</p>
                        </div>
                        <button className="join-btn">
                            🎥 Join
                        </button>
                    </div>
                </section>

                {/* Overview Section */}
                <section className="overview-section">
                    <div className="section-header">
                        <h2 className="section-title">Overview</h2>
                        <button className="report-btn">📊 Report</button>
                    </div>
                    <div className="progress-bars">
                        <div className="progress-item">
                            <label className="progress-label">Rocks</label>
                            <div className="progress-bar">
                                <div className="progress-fill rocks-fill" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <label className="progress-label">Fires</label>
                            <div className="progress-bar">
                                <div className="progress-fill fires-fill" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className="progress-item">
                            <label className="progress-label">To-Do</label>
                            <div className="progress-bar">
                                <div className="progress-fill todo-fill" style={{ width: '45%' }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* To-Do Section */}
                <section className="todo-section">
                    <div className="section-header">
                        <h2 className="section-title">To-Do</h2>
                        <button className="view-all-btn">👁️ View All To-Do</button>
                    </div>

                    <div className="todo-chart-container">
                        <div className="pie-chart">
                            <svg viewBox="0 0 200 200" className="pie-svg">
                                {/* Completed - 60% */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#7ED957"
                                    strokeWidth="40"
                                    strokeDasharray="301.59 502.65"
                                    transform="rotate(-90 100 100)"
                                />
                                {/* In Progress - 35% */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#FFA500"
                                    strokeWidth="40"
                                    strokeDasharray="175.93 502.65"
                                    strokeDashoffset="-301.59"
                                    transform="rotate(-90 100 100)"
                                />
                                {/* Yet to Start - 5% */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="#00BCD4"
                                    strokeWidth="40"
                                    strokeDasharray="25.13 502.65"
                                    strokeDashoffset="-477.52"
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                            <div className="chart-center">
                                <span className="chart-percentage">60%</span>
                            </div>
                        </div>

                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-dot completed"></span>
                                <span className="legend-text">Completed</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot progress"></span>
                                <span className="legend-text">In Progress</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot yet-to-start"></span>
                                <span className="legend-text">Yet to Start</span>
                            </div>
                            <button className="add-todo-btn">➕</button>
                        </div>
                    </div>

                    {/* Pending To-Do's */}
                    <div className="pending-todos">
                        <div className="pending-header">
                            <h3 className="pending-title">Pending To-Do's</h3>
                            <button className="view-details-btn">View Details</button>
                        </div>

                        <div className="todo-list">
                            <div className="todo-item">
                                <div className="todo-info">
                                    <span className="todo-item-title">Title</span>
                                    <span className="todo-item-subtitle">ABD Assessm...</span>
                                </div>
                                <div className="todo-meta">
                                    <span className="todo-due">Due by</span>
                                    <span className="todo-date">Sep 30</span>
                                </div>
                                <button className="todo-arrow">→</button>
                            </div>

                            <div className="todo-item">
                                <div className="todo-info">
                                    <span className="todo-item-title">Title</span>
                                    <span className="todo-item-subtitle">ABD Assessm...</span>
                                </div>
                                <div className="todo-meta">
                                    <span className="todo-due">Due by</span>
                                    <span className="todo-date">Sep 30</span>
                                </div>
                                <button className="todo-arrow">→</button>
                            </div>

                            <div className="todo-item">
                                <div className="todo-info">
                                    <span className="todo-item-title">Title</span>
                                    <span className="todo-item-subtitle">ABD Assessm...</span>
                                </div>
                                <div className="todo-meta">
                                    <span className="todo-due">Due by</span>
                                    <span className="todo-date">Sep 30</span>
                                </div>
                                <button className="todo-arrow">→</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fire Section */}
                <section className="metric-card fire-card">
                    <div className="metric-header">
                        <div className="metric-info">
                            <h3 className="metric-title">Fire</h3>
                            <p className="metric-subtitle">Identify and organize pressing issues to resolve them with ease.</p>
                        </div>
                        <div className="metric-percentage">47.5%</div>
                    </div>
                </section>

                {/* Rocks Section */}
                <section className="metric-card rocks-card">
                    <div className="metric-header">
                        <div className="metric-info">
                            <h3 className="metric-title">Rocks</h3>
                            <p className="metric-subtitle">Set and track quarterly goals to help your team consistently hit their targets.</p>
                        </div>
                        <div className="metric-percentage">47.5%</div>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <button
                    className={`nav-btn ${activeNav === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveNav('home')}
                >
                    <span className="nav-icon">🏠</span>
                    <span className="nav-label">Home</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'search' ? 'active' : ''}`}
                    onClick={() => setActiveNav('search')}
                >
                    <span className="nav-icon">🔍</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'files' ? 'active' : ''}`}
                    onClick={() => setActiveNav('files')}
                >
                    <span className="nav-icon">📁</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'menu' ? 'active' : ''}`}
                    onClick={() => setActiveNav('menu')}
                >
                    <span className="nav-icon">☰</span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'more' ? 'active' : ''}`}
                    onClick={() => setActiveNav('more')}
                >
                    <span className="nav-icon">⋯</span>
                </button>
            </nav>
        </div>
    );
}

export default DashboardScreen;
