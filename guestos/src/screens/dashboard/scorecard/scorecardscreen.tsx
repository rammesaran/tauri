import { useState } from "react";
import "./scorecardscreen.css";

import mockData from "./scorecardMockData.json";
import MetricCard from "./metriccard/metriccard";
import ProgressItem from "./metriccard/progressitem";

interface ScorecardScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit" | "scorecard") => void;
    scorecardData?: typeof mockData;
}

function ScorecardScreen({ onNavigate, scorecardData = mockData }: ScorecardScreenProps) {
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

    return (
        <div className="scorecard-screen-container">
            {/* Header */}
            <header className="scorecard-screen-header">
                <button className="scorecard-back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="scorecard-header-title">Guest OS</h1>
                <button className="scorecard-notification-btn" aria-label="Notifications">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="scorecard-screen-main">
                {/* Page Title */}
                <section className="scorecard-title-section">
                    <h1 className="scorecard-page-title">{scorecardData.scorecard.title}</h1>
                    <p className="scorecard-page-subtitle">{scorecardData.scorecard.subtitle}</p>
                </section>

                {/* Metrics Grid */}
                <section className="scorecard-metrics-grid">
                    {scorecardData.scorecard.metrics.map((metric) => (
                        <MetricCard
                            key={metric.id}
                            value={metric.value}
                            label={metric.label}
                            trend={metric.trend as "up" | "down"}
                            trendValue={metric.trendValue}
                            icon={metric.icon}
                        />
                    ))}
                </section>

                {/* Rev/PAR Card */}
                <section className="revpar-card">
                    <div className="revpar-header">
                        <h2 className="revpar-title">{scorecardData.scorecard.revpar.label}</h2>
                        <button className="revpar-share-btn" aria-label="Share">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                                <polyline points="16 6 12 2 8 6" />
                                <line x1="12" y1="2" x2="12" y2="15" />
                            </svg>
                        </button>
                    </div>
                    <div className="revpar-amount-wrapper">
                        <span className="revpar-amount">
                            {scorecardData.scorecard.revpar.currency}
                            {scorecardData.scorecard.revpar.amount.toFixed(2)}
                        </span>
                        <span className="revpar-label">{scorecardData.scorecard.revpar.amountLabel}</span>
                    </div>
                    <div className="revpar-progress-bar">
                        <div
                            className="revpar-progress-fill"
                            style={{ width: `${scorecardData.scorecard.revpar.progressPercentage}%` }}
                        ></div>
                    </div>
                </section>

                {/* Q2 Rocks Card */}
                <section className="q2rocks-card">
                    <div className="q2rocks-header">
                        <div className="q2rocks-title-wrapper">
                            <h2 className="q2rocks-title">{scorecardData.scorecard.q2Rocks.title}</h2>
                            {scorecardData.scorecard.q2Rocks.showDropdown && (
                                <button className="q2rocks-dropdown-btn" aria-label="Toggle dropdown">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button className="q2rocks-view-details">
                            {scorecardData.scorecard.q2Rocks.viewDetailsLink}
                        </button>
                    </div>

                    <div className="q2rocks-items">
                        {scorecardData.scorecard.q2Rocks.items.map((item, index) => (
                            <div key={item.id}>
                                <ProgressItem
                                    title={item.title}
                                    percentage={item.percentage}
                                    icon={item.icon}
                                    hasFlag={item.hasFlag}
                                />
                                {index === 0 && (
                                    <button className="q2rocks-add-btn" aria-label="Add new item">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                )}
                                {index < scorecardData.scorecard.q2Rocks.items.length - 1 && (
                                    <div className="q2rocks-divider"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="scorecard-bottom-nav">
                <button
                    className={`scorecard-nav-btn ${activeNav === "home" ? "active" : ""}`}
                    onClick={() => handleNavClick("home")}
                >
                    <span className="scorecard-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    {activeNav === "home" && <span className="scorecard-nav-label">Home</span>}
                </button>
                <button
                    className={`scorecard-nav-btn ${activeNav === "view" ? "active" : ""}`}
                    onClick={() => setActiveNav("view")}
                >
                    <span className="scorecard-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`scorecard-nav-btn ${activeNav === "info" ? "active" : ""}`}
                    onClick={() => setActiveNav("info")}
                >
                    <span className="scorecard-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`scorecard-nav-btn ${activeNav === "menu" ? "active" : ""}`}
                    onClick={() => setActiveNav("menu")}
                >
                    <span className="scorecard-nav-icon">
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
                    className={`scorecard-nav-btn ${activeNav === "more" ? "active" : ""}`}
                    onClick={() => setActiveNav("more")}
                >
                    <span className="scorecard-nav-icon">
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

export default ScorecardScreen;