import { useState } from "react";
import "./geyscreen.css";

import mockData from "./geyserMockData.json";
import StatCard from "./component/statcard";
import DaySchedule from "./component/dayschedule";

interface GeyserScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting" | "geyser") => void;
    geyserData?: typeof mockData;
}

function GeyserScreen({ onNavigate, geyserData = mockData }: GeyserScreenProps) {
    const [activeNav, setActiveNav] = useState("geyser");
    const [isCheckedIn, setIsCheckedIn] = useState(geyserData.geyser.timeTracker.isCheckedIn);

    const handleBack = () => {
        if (onNavigate) {
            onNavigate("dashboard");
        }
    };

    const handleNavClick = (nav: string) => {
        setActiveNav(nav);
        if (nav === "home" && onNavigate) {
            onNavigate("dashboard");
        }
    };

    const handleCheckIn = () => {
        setIsCheckedIn(true);
        console.log("Checked in");
    };

    const handleCheckOut = () => {
        setIsCheckedIn(false);
        console.log("Checked out");
    };

    const maxHours = geyserData.geyser.hoursLocked.maxHours;

    return (
        <div className="geyser-screen-container">
            {/* Header */}
            <header className="geyser-screen-header">
                <button className="geyser-back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="geyser-header-title">Guest OS</h1>
                <button className="geyser-notification-btn" aria-label="Notifications">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="geyser-screen-main">
                {/* Page Title */}
                <section className="geyser-title-section">
                    <h1 className="geyser-page-title">{geyserData.geyser.title}</h1>
                    <p className="geyser-page-subtitle">{geyserData.geyser.subtitle}</p>
                </section>

                {/* Employee Card */}
                <section className="employee-card">
                    <img
                        src={geyserData.geyser.employee.avatar}
                        alt={geyserData.geyser.employee.name}
                        className="employee-avatar"
                    />
                    <div className="employee-info-overlay">
                        <h3 className="employee-name">{geyserData.geyser.employee.name}</h3>
                        <p className="employee-role">{geyserData.geyser.employee.role}</p>
                        <div className="employee-shift">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>Shift Time: {geyserData.geyser.employee.shiftTime}</span>
                        </div>
                    </div>
                </section>

                {/* Time Tracker Card */}
                <section className="time-tracker-card">
                    <h2 className="time-tracker-title">{geyserData.geyser.timeTracker.title}</h2>
                    <div className="time-tracker-display">
                        <div className="time-tracker-circle">
                            <span className="time-tracker-time">{geyserData.geyser.timeTracker.workTime}</span>
                            <span className="time-tracker-label">{geyserData.geyser.timeTracker.label}</span>
                        </div>
                    </div>
                    <div className="time-tracker-shift-info">
                        Shift Time: {geyserData.geyser.timeTracker.shiftTime}
                    </div>
                    <div className="time-tracker-actions">
                        <button
                            className="check-out-btn"
                            onClick={handleCheckOut}
                            disabled={!isCheckedIn}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                <path d="M9 12h6" />
                            </svg>
                            Check-Out
                        </button>
                        <button
                            className="check-in-btn"
                            onClick={handleCheckIn}
                            disabled={isCheckedIn}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 11l3 3L22 4" />
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            Check-In
                        </button>
                    </div>
                </section>

                {/* Hours Locked Card */}
                <section className="hours-locked-card">
                    <div className="hours-locked-header">
                        <span className="hours-locked-label">{geyserData.geyser.hoursLocked.label}</span>
                        <div className="hours-locked-date">
                            {geyserData.geyser.hoursLocked.dateRange}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>
                    <div className="hours-locked-value">
                        {geyserData.geyser.hoursLocked.totalHours}
                        <span className="hours-locked-max">/{geyserData.geyser.hoursLocked.maxHours} Hrs</span>
                    </div>
                    <div className="hours-locked-chart">
                        {geyserData.geyser.hoursLocked.weeklyData.map((day, index) => (
                            <div key={index} className="hours-bar-wrapper">
                                <div className="hours-bar-container">
                                    <div
                                        className="hours-bar"
                                        style={{
                                            height: `${(day.hours / maxHours) * 100}%`,
                                            backgroundColor: day.color,
                                        }}
                                    ></div>
                                </div>
                                <span className="hours-bar-label">{day.day}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="stats-section">
                    {geyserData.geyser.stats.map((stat) => (
                        <StatCard
                            key={stat.id}
                            icon={stat.icon as any}
                            label={stat.label}
                            value={stat.value}
                            subtext={stat.subtext}
                        />
                    ))}
                </section>

                {/* Weekly Schedule Card */}
                <section className="weekly-schedule-card">
                    <div className="weekly-schedule-header">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                        <span className="weekly-schedule-date">{geyserData.geyser.weeklySchedule.dateRange}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    <div className="weekly-schedule-list">
                        {geyserData.geyser.weeklySchedule.days.map((day, index) => (
                            <div key={index}>
                                <DaySchedule
                                    day={day.day}
                                    time={day.time}
                                    status={day.status as any}
                                    progress={day.progress}
                                />
                                {index < geyserData.geyser.weeklySchedule.days.length - 1 && (
                                    <div className="schedule-divider"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Predictive Insights Card */}
                <section className="predictive-insights-card">
                    <div className="predictive-insights-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="predictive-insights-content">
                        <h3 className="predictive-insights-title">{geyserData.geyser.predictiveInsights.title}</h3>
                        <p className="predictive-insights-message">{geyserData.geyser.predictiveInsights.message}</p>
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="geyser-bottom-nav">
                <button
                    className={`geyser-nav-btn ${activeNav === "home" ? "active" : ""}`}
                    onClick={() => handleNavClick("home")}
                >
                    <span className="geyser-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    {activeNav === "home" && <span className="geyser-nav-label">Home</span>}
                </button>
                <button
                    className={`geyser-nav-btn ${activeNav === "view" ? "active" : ""}`}
                    onClick={() => handleNavClick("view")}
                >
                    <span className="geyser-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`geyser-nav-btn ${activeNav === "geyser" ? "active" : ""}`}
                    onClick={() => handleNavClick("geyser")}
                >
                    <span className="geyser-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v12" />
                            <path d="M8 12a4 4 0 0 0 8 0" />
                        </svg>
                    </span>
                    {activeNav === "geyser" && <span className="geyser-nav-label">Geyser</span>}
                </button>
                <button
                    className={`geyser-nav-btn ${activeNav === "menu" ? "active" : ""}`}
                    onClick={() => handleNavClick("menu")}
                >
                    <span className="geyser-nav-icon">
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
                    className={`geyser-nav-btn ${activeNav === "more" ? "active" : ""}`}
                    onClick={() => setActiveNav("more")}
                >
                    <span className="geyser-nav-icon">
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

export default GeyserScreen;