import React from 'react';
import './enagementcard.css';

// Staff Engagement Card
interface Department {
    name: string;
    score: number;
    color: string;
}

interface StaffEngagementProps {
    title: string;
    averageScore: number;
    change: string;
    departments: Department[];
    onViewAll?: () => void;
}

export const StaffEngagementCard: React.FC<StaffEngagementProps> = ({
    title,
    averageScore,
    change,
    departments,
    onViewAll
}) => {
    return (
        <div className="engagement-card">
            <div className="engagement-header">
                <h3 className="engagement-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="average-score">
                <div className="score-display">{averageScore}%</div>
                <div className="score-label">Average Score</div>
                <div className="score-change">{change}</div>
            </div>

            <div className="departments-section">
                <h4 className="section-subtitle">Score by Department</h4>
                {departments.map((dept, index) => (
                    <div key={index} className="department-item">
                        <span className="department-name">{dept.name}</span>
                        <div className="department-bar">
                            <div
                                className="department-bar-fill"
                                style={{
                                    width: `${dept.score}%`,
                                    backgroundColor: dept.color
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Guest Satisfaction Card
interface Breakdown {
    label: string;
    color: string;
}

interface GuestSatisfactionProps {
    title: string;
    score: number;
    change: string;
    emoji: string;
    breakdown: Breakdown[];
    onViewAll?: () => void;
}

export const GuestSatisfactionCard: React.FC<GuestSatisfactionProps> = ({
    title,
    score,
    change,
    emoji,
    breakdown,
    onViewAll
}) => {
    const circumference = 2 * Math.PI * 80;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="satisfaction-card">
            <div className="satisfaction-header">
                <h3 className="satisfaction-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="satisfaction-gauge">
                <svg className="gauge-svg" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="20"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="20"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#90EE90" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#FFA500" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="gauge-content">
                    <div className="gauge-emoji">{emoji}</div>
                    <div className="gauge-label">Average</div>
                    <div className="gauge-score">{score}%</div>
                    <div className="gauge-change">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="3">
                            <polyline points="18 15 12 9 6 15" />
                        </svg>
                        {change}
                    </div>
                </div>

                <div className="gauge-markers">
                    <span className="marker marker-left">0</span>
                    <span className="marker marker-right">100</span>
                </div>
            </div>

            <div className="satisfaction-breakdown">
                {breakdown.map((item, index) => (
                    <div key={index} className="breakdown-item">
                        <span
                            className="breakdown-dot"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="breakdown-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};