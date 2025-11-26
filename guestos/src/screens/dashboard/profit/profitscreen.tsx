import { useState } from "react";
import "./profitscreen.css";
import mockData from "./profitMockData.json";

interface ProfitScreenProps {
    onNavigate?: (screen: "dashboard" | "vision" | "todo" | "addtodo" | "profit") => void;
    profitData?: typeof mockData;
}

function ProfitScreen({ onNavigate, profitData = mockData }: ProfitScreenProps) {
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

    const handleApprove = (id: number) => {
        console.log("Approved:", id);
        // Handle approve logic
    };

    const handleReject = (id: number) => {
        console.log("Rejected:", id);
        // Handle reject logic
    };

    // Calculate donut chart segments using the chartData percentages
    const profitPercentage = profitData.profitDashboard.chartData.profit.percentage;
    const expensesPercentage = profitData.profitDashboard.chartData.expenses.percentage;
    const taxesPercentage = profitData.profitDashboard.chartData.taxes.percentage;

    // Calculate circumferences for each ring
    const outerCircumference = 2 * Math.PI * 80; // r=80
    const middleCircumference = 2 * Math.PI * 62; // r=62
    const innerCircumference = 2 * Math.PI * 44; // r=44

    // Calculate dash array for each segment based on percentage
    const profitDashArray = (profitPercentage / 100) * outerCircumference;
    const expensesDashArray = (expensesPercentage / 100) * middleCircumference;
    const taxesDashArray = (taxesPercentage / 100) * innerCircumference;

    return (
        <div className="profit-screen-container">
            {/* Header */}
            <header className="profit-screen-header">
                <button className="profit-back-btn" onClick={handleBack} aria-label="Go back">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 className="profit-header-title">Guest OS</h1>
                <button className="profit-notification-btn" aria-label="Notifications">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="profit-screen-main">
                {/* Page Title */}
                <section className="profit-title-section">
                    <h1 className="profit-page-title">Profit</h1>
                    <p className="profit-page-subtitle">Fiscal Metrics: Revenue and Expenditures</p>
                </section>

                {/* Profit Dashboard Card */}
                <section className="profit-dashboard-card">
                    <div className="profit-card-header">
                        <h2 className="profit-card-title">{profitData.profitDashboard.title}</h2>
                        <div className="profit-month-selector">
                            <span className="profit-month-text">{profitData.profitDashboard.month}</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </div>
                    </div>

                    <div className="profit-chart-content">
                        <div className="profit-donut-chart">
                            <svg viewBox="0 0 200 200" className="profit-donut-svg">
                                <defs>
                                    <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00E5D4" />
                                        <stop offset="100%" stopColor="#00CFC0" />
                                    </linearGradient>
                                    <linearGradient id="expensesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FFA500" />
                                        <stop offset="100%" stopColor="#FFB733" />
                                    </linearGradient>
                                    <linearGradient id="taxesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#D946EF" />
                                        <stop offset="100%" stopColor="#C026D3" />
                                    </linearGradient>
                                    <filter id="shadow">
                                        <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
                                    </filter>
                                </defs>

                                {/* Background circle */}
                                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                                {/* Outer ring - Profit */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="url(#profitGradient)"
                                    strokeWidth="18"
                                    strokeDasharray={`${profitDashArray} ${outerCircumference}`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 100 100)"
                                    filter="url(#shadow)"
                                    opacity="0.95"
                                />

                                {/* Middle ring - Expenses */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="62"
                                    fill="none"
                                    stroke="url(#expensesGradient)"
                                    strokeWidth="18"
                                    strokeDasharray={`${expensesDashArray} ${middleCircumference}`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 100 100)"
                                    filter="url(#shadow)"
                                    opacity="0.95"
                                />

                                {/* Inner ring - Taxes */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="44"
                                    fill="none"
                                    stroke="url(#taxesGradient)"
                                    strokeWidth="18"
                                    strokeDasharray={`${taxesDashArray} ${innerCircumference}`}
                                    strokeLinecap="round"
                                    transform="rotate(-90 100 100)"
                                    filter="url(#shadow)"
                                    opacity="0.95"
                                />

                                {/* Decorative background arcs */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="80"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.08)"
                                    strokeWidth="18"
                                    strokeDasharray={`${outerCircumference - profitDashArray} ${outerCircumference}`}
                                    strokeDashoffset={`-${profitDashArray}`}
                                    transform="rotate(-90 100 100)"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="62"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.08)"
                                    strokeWidth="18"
                                    strokeDasharray={`${middleCircumference - expensesDashArray} ${middleCircumference}`}
                                    strokeDashoffset={`-${expensesDashArray}`}
                                    transform="rotate(-90 100 100)"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="44"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.08)"
                                    strokeWidth="18"
                                    strokeDasharray={`${innerCircumference - taxesDashArray} ${innerCircumference}`}
                                    strokeDashoffset={`-${taxesDashArray}`}
                                    transform="rotate(-90 100 100)"
                                />
                            </svg>
                        </div>

                        <div className="profit-chart-info">
                            <div className="profit-stat-item">
                                <span className="profit-stat-text">{profitData.profitDashboard.chartData.profit.percentage}% Profit</span>
                            </div>
                            <div className="profit-stat-item">
                                <span className="profit-stat-text">{profitData.profitDashboard.chartData.expenses.percentage}% Operating Expenses</span>
                            </div>
                            <div className="profit-stat-item">
                                <span className="profit-stat-text">{profitData.profitDashboard.chartData.taxes.percentage}% Taxes</span>
                            </div>
                        </div>

                        <div className="profit-legend">
                            <div className="profit-legend-item">
                                <span className="profit-legend-dot" style={{ backgroundColor: profitData.profitDashboard.chartData.profit.color }}></span>
                                <span className="profit-legend-text">{profitData.profitDashboard.chartData.profit.label}</span>
                            </div>
                            <div className="profit-legend-item">
                                <span className="profit-legend-dot" style={{ backgroundColor: profitData.profitDashboard.chartData.expenses.color }}></span>
                                <span className="profit-legend-text">{profitData.profitDashboard.chartData.expenses.label}</span>
                            </div>
                            <div className="profit-legend-item">
                                <span className="profit-legend-dot" style={{ backgroundColor: profitData.profitDashboard.chartData.taxes.color }}></span>
                                <span className="profit-legend-text">{profitData.profitDashboard.chartData.taxes.label}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profit Target Card */}
                <section className="profit-target-card">
                    <div className="target-header">
                        <h2 className="target-title">{profitData.profitTarget.title}</h2>
                    </div>
                    <div className="target-info">
                        <div className="target-info-item">
                            <span className="target-label">Target - {profitData.profitTarget.targetPercentage}%</span>
                        </div>
                        <div className="target-info-item">
                            <span className="target-status">Status: {profitData.profitTarget.status}</span>
                        </div>
                    </div>
                    <div className="target-progress-wrapper">
                        <div className="target-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        </div>
                        <div className="target-progress-bar">
                            <div className="target-progress-fill" style={{ width: `${profitData.profitTarget.currentPercentage}%` }}>
                                <span className="target-progress-label">{profitData.profitTarget.currentPercentage}%</span>
                            </div>
                        </div>
                        <button className="target-flag-btn" aria-label="Flag">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                <line x1="4" y1="22" x2="4" y2="15" />
                            </svg>
                        </button>
                    </div>
                    <div className="target-steps">
                        {profitData.profitTarget.progressSteps.map((index) => (
                            <div key={index} className="target-step"></div>
                        ))}
                    </div>
                </section>

                {/* Unit Economics Card */}
                <section className="unit-economics-card">
                    <div className="economics-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="20" x2="12" y2="10" />
                            <line x1="18" y1="20" x2="18" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="16" />
                        </svg>
                    </div>
                    <div className="economics-content">
                        <h3 className="economics-title">{profitData.unitEconomics.title}</h3>
                        <p className="economics-description">{profitData.unitEconomics.description}</p>
                    </div>
                    <div className="economics-actions">
                        <button className="economics-action-btn plus-btn" aria-label="Add">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                        <button className="economics-action-btn minus-btn" aria-label="Remove">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                    </div>
                </section>

                {/* Purchase Approvals Section */}
                <section className="purchase-approvals-section">
                    <div className="approvals-header">
                        <h2 className="approvals-title">Purchase Approvals</h2>
                        <button className="view-all-link">View all</button>
                    </div>

                    {profitData.purchaseApprovals.map((approval) => (
                        <div key={approval.id} className="approval-card">
                            <div className="approval-details">
                                <div className="approval-row">
                                    <span className="approval-label">Available funds</span>
                                    <span className="approval-amount">${approval.availableFunds.toFixed(2)}</span>
                                </div>
                                <div className="approval-row">
                                    <span className="approval-item-name">{approval.title}</span>
                                    <span className="approval-amount">${approval.requestedAmount.toFixed(2)}</span>
                                </div>
                                <div className="approval-row">
                                    <span className="approval-label">Remaining Funds</span>
                                    <span className="approval-amount">${approval.remainingFunds.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="approval-actions">
                                <button
                                    className="approval-btn reject-btn"
                                    onClick={() => handleReject(approval.id)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <line x1="9" y1="9" x2="15" y2="15" />
                                        <line x1="15" y1="9" x2="9" y2="15" />
                                    </svg>
                                    Reject
                                </button>
                                <button
                                    className="approval-btn approve-btn"
                                    onClick={() => handleApprove(approval.id)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 11l3 3L22 4" />
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                    Approve
                                </button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>

            {/* Bottom Navigation */}
            <nav className="profit-bottom-nav">
                <button
                    className={`profit-nav-btn ${activeNav === "home" ? "active" : ""}`}
                    onClick={() => handleNavClick("home")}
                >
                    <span className="profit-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </span>
                    {activeNav === "home" && <span className="profit-nav-label">Home</span>}
                </button>
                <button
                    className={`profit-nav-btn ${activeNav === "view" ? "active" : ""}`}
                    onClick={() => setActiveNav("view")}
                >
                    <span className="profit-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`profit-nav-btn ${activeNav === "info" ? "active" : ""}`}
                    onClick={() => setActiveNav("info")}
                >
                    <span className="profit-nav-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                    </span>
                </button>
                <button
                    className={`profit-nav-btn ${activeNav === "menu" ? "active" : ""}`}
                    onClick={() => setActiveNav("menu")}
                >
                    <span className="profit-nav-icon">
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
                    className={`profit-nav-btn ${activeNav === "more" ? "active" : ""}`}
                    onClick={() => setActiveNav("more")}
                >
                    <span className="profit-nav-icon">
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

export default ProfitScreen;