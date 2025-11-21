import { useState } from "react";
import "./meetingscreen.css";

import mockData from "./meetingMockData.json";
import MeetingControl from "./component/meetingcontrol";
import MeetingMenuItem from "./component/meetingmenuitem";

interface MeetingScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard" | "meeting") => void;
    meetingData?: typeof mockData;
}

function MeetingScreen({ onNavigate, meetingData = mockData }: MeetingScreenProps) {
    const [activeNav, setActiveNav] = useState("home");

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

    const handleJoinMeeting = () => {
        console.log("Joining meeting...");
        // Handle join meeting logic
    };

    const handleMenuItemClick = (route: string) => {
        console.log("Navigate to:", route);
        // Handle menu item navigation
    };

    return (
        <div className="meeting-screen-container">
            {/* Header */}
            <header className="meeting-screen-header">
                <button className="meeting-back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="meeting-header-title">Guest OS</h1>
                <div className="meeting-header-spacer"></div>
            </header>

            {/* Main Content */}
            <main className="meeting-screen-main">
                {/* Page Title */}
                <section className="meeting-title-section">
                    <h1 className="meeting-page-title">{meetingData.meeting.title}</h1>
                    <p className="meeting-page-subtitle">{meetingData.meeting.subtitle}</p>
                </section>

                {/* Upcoming Meeting Card */}
                <section className="upcoming-meeting-card">
                    <h2 className="upcoming-meeting-title">
                        Upcoming Meeting in {meetingData.meeting.upcomingMeeting.timeUntil}
                    </h2>

                    {/* Meeting Controls */}
                    <div className="meeting-controls">
                        {meetingData.meeting.upcomingMeeting.controls.map((control) => (
                            <MeetingControl
                                key={control.id}
                                icon={control.icon as any}
                                label={control.label}
                            />
                        ))}
                    </div>

                    {/* Meeting Details */}
                    <div className="meeting-details-wrapper">
                        <img
                            src={meetingData.meeting.upcomingMeeting.hostImage}
                            alt="Meeting host"
                            className="meeting-host-avatar"
                        />
                        <div className="meeting-info">
                            <h3 className="meeting-info-title">
                                {meetingData.meeting.upcomingMeeting.title}
                            </h3>
                            <p className="meeting-info-description">
                                {meetingData.meeting.upcomingMeeting.description}
                            </p>
                        </div>
                        <button className="meeting-join-btn" onClick={handleJoinMeeting}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="23 7 16 12 23 17 23 7" />
                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                            </svg>
                            Join
                        </button>
                    </div>
                </section>

                {/* Menu Items */}
                <section className="meeting-menu-section">
                    {meetingData.meeting.menuItems.map((item, index) => (
                        <div key={item.id} className="meeting-menu-item-wrapper">
                            <MeetingMenuItem
                                icon={item.icon as any}
                                label={item.label}
                                onClick={() => handleMenuItemClick(item.route)}
                            />
                            {item.hasAddButton && (
                                <button className="meeting-add-btn" aria-label="Add new">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="meeting-bottom-nav">
                <button
                    className={`meeting-nav-btn ${activeNav === "home" ? "active" : ""}`}
                    onClick={() => handleNavClick("home")}
                >
                    <span className="meeting-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    {activeNav === "home" && <span className="meeting-nav-label">Home</span>}
                </button>
                <button
                    className={`meeting-nav-btn ${activeNav === "view" ? "active" : ""}`}
                    onClick={() => setActiveNav("view")}
                >
                    <span className="meeting-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`meeting-nav-btn ${activeNav === "info" ? "active" : ""}`}
                    onClick={() => setActiveNav("info")}
                >
                    <span className="meeting-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`meeting-nav-btn ${activeNav === "menu" ? "active" : ""}`}
                    onClick={() => setActiveNav("menu")}
                >
                    <span className="meeting-nav-icon">
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
                    className={`meeting-nav-btn ${activeNav === "more" ? "active" : ""}`}
                    onClick={() => setActiveNav("more")}
                >
                    <span className="meeting-nav-icon">
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

export default MeetingScreen;