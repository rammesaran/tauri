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
                        </div>

                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-dot completed"></span>
                                <span className="legend-text">Completed</span>
                                <span className="legend-percentage">60%</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot progress"></span>
                                <span className="legend-text">In Progress</span>
                                <span className="legend-percentage">35%</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot yet-to-start"></span>
                                <span className="legend-text">Yet to Start</span>
                                <span className="legend-percentage">5%</span>
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
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    {activeNav === 'home' && <span className="nav-label">Home</span>}
                </button>
                <button
                    className={`nav-btn ${activeNav === 'view' ? 'active' : ''}`}
                    onClick={() => setActiveNav('view')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveNav('info')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span className="notification-badge">0</span>
                    </span>
                </button>
                <button
                    className={`nav-btn ${activeNav === 'menu' ? 'active' : ''}`}
                    onClick={() => setActiveNav('menu')}
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
                </button>
            </nav>
        </div>
    );
}

export default DashboardScreen;
