import { useState } from "react";
import "./visionscreen.css";

interface VisionScreenProps {
    userName: string;
    onNavigate?: (screen: "dashboard" | "vision") => void;
}

function VisionScreen({ onNavigate }: VisionScreenProps) {
    const [activeTab, setActiveTab] = useState<"vision" | "mission" | "core-values">("vision");
    const [activeRocksTab, setActiveRocksTab] = useState<"current" | "last3" | "last5">("current");
    const [activeNav, setActiveNav] = useState("view");

    const handleNavClick = (nav: string) => {
        setActiveNav(nav);
        if (nav === "home" && onNavigate) {
            onNavigate("dashboard");
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "vision":
                return (
                    <p className="tab-content-text">
                        Our vision is to deliver hospitality that goes beyond service—creating moments of comfort,
                        connection, and care. We strive to make every guest experience memorable while embracing
                        sustainability and uplifting the communities we serve.
                    </p>
                );
            case "mission":
                return (
                    <p className="tab-content-text">
                        Our mission is to provide exceptional service and unforgettable experiences through
                        innovation, dedication, and a commitment to excellence in everything we do.
                    </p>
                );
            case "core-values":
                return (
                    <p className="tab-content-text">
                        Integrity, Excellence, Respect, Innovation, and Sustainability are the core values that
                        guide our actions and decisions every day.
                    </p>
                );
        }
    };

    const renderRocksContent = () => {
        switch (activeRocksTab) {
            case "current":
                return (
                    <>
                        <p className="rocks-description">
                            It is a long established fact that a reader will be distracted by the readable content
                            of a page when looking at its layout.
                        </p>
                        <div className="progress-section">
                            <div className="progress-header">
                                <span className="progress-label">Progress</span>
                                <span className="progress-percentage">40/100 Percentage</span>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar-track">
                                    <div className="progress-bar-fill" style={{ width: '40%' }}></div>
                                </div>

                            </div>
                            <div className="progress-legend">
                                <div className="legend-item">
                                    <span className="legend-dot current-year"></span>
                                    <span className="legend-text">Current Year</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot last-3-years"></span>
                                    <span className="legend-text">Last 3 Years</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot last-5-years"></span>
                                    <span className="legend-text">Last 5 Years</span>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case "last3":
                return (
                    <p className="rocks-description">
                        Overview of progress and achievements from the last 3 years.
                    </p>
                );
            case "last5":
                return (
                    <p className="rocks-description">
                        Overview of progress and achievements from the last 5 years.
                    </p>
                );
        }
    };

    return (
        <div className="vision-container">
            {/* Header */}
            <header className="vision-header">
                <div className="logo-section">
                    <h1 className="logo-vision">
                        <span className="logo-text-vision">Guest </span>
                        <span className="logo-os-vision">OS</span>
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
            <main className="vision-main">
                {/* Title Section */}
                <section className="title-section">
                    <h1 className="main-title">Vision, Mission & Core Values</h1>
                    <p className="main-subtitle">This is your current To-Dos, Rock & Fires</p>
                </section>

                {/* Vision/Mission/Core Values Card */}
                <section className="vmv-card">
                    <div className="vmv-tabs">
                        <button
                            className={`vmv-tab ${activeTab === "vision" ? "active" : ""}`}
                            onClick={() => setActiveTab("vision")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            Vision
                        </button>
                        <button
                            className={`vmv-tab ${activeTab === "mission" ? "active" : ""}`}
                            onClick={() => setActiveTab("mission")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <circle cx="12" cy="12" r="6" />
                                <circle cx="12" cy="12" r="2" />
                            </svg>
                            Mission
                        </button>
                        <button
                            className={`vmv-tab ${activeTab === "core-values" ? "active" : ""}`}
                            onClick={() => setActiveTab("core-values")}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                                <line x1="9" y1="9" x2="9.01" y2="9" />
                                <line x1="15" y1="9" x2="15.01" y2="9" />
                            </svg>
                            Core Values
                        </button>
                    </div>
                    <div className="vmv-content">
                        {renderTabContent()}
                    </div>
                </section>

                {/* Rocks Section */}
                <section className="rocks-section">
                    <div className="rocks-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <h2 className="rocks-title">Rocks</h2>
                    </div>

                    <div className="rocks-tabs">
                        <button
                            className={`rocks-tab ${activeRocksTab === "current" ? "active" : ""}`}
                            onClick={() => setActiveRocksTab("current")}
                        >
                            Current Year
                        </button>
                        <button
                            className={`rocks-tab ${activeRocksTab === "last3" ? "active" : ""}`}
                            onClick={() => setActiveRocksTab("last3")}
                        >
                            Last 3 Year
                        </button>
                        <button
                            className={`rocks-tab ${activeRocksTab === "last5" ? "active" : ""}`}
                            onClick={() => setActiveRocksTab("last5")}
                        >
                            Last 5 Year
                        </button>
                    </div>

                    <div className="rocks-content">
                        {renderRocksContent()}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <button
                    className={`nav-btn ${activeNav === 'home' ? 'active' : ''}`}
                    onClick={() => handleNavClick('home')}
                >
                    <span className="nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
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
                    {activeNav === 'view' && <span className="nav-label">Vision</span>}
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
                </button>
                <button
                    className={`nav-btn ${activeNav === 'menu' ? 'active' : ''}`}
                    onClick={() => handleNavClick('menu')}
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
                    onClick={() => handleNavClick('more')}
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

export default VisionScreen;
