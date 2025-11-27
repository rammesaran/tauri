import React from 'react';
import './enagementcard.css';

// Staff Engagement Card
interface Department {
    name: string;
    score: number;
    color: string;
}

interface StaffEngagementProps {
    title?: string;
    averageScore?: number;
    change?: string;
    departments?: Department[];
    onViewAll?: () => void;
}

export const StaffEngagementCard: React.FC<StaffEngagementProps> = ({
    title = "Staff Engagement",
    averageScore = 84,
    change = "+4.1% vs. Last quarter",
    departments = [
        { name: "Staff - 1", score: 85, color: "#F5A623" },
        { name: "Staff - 2", score: 92, color: "#4A90D9" },
        { name: "Staff - 3", score: 78, color: "#50C878" }
    ],
    onViewAll
}) => {
    return (
        <div className="engagement-card">
            <div className="engagement-header">
                <h3 className="engagement-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="engagement-score-section">
                <div className="big-score">{averageScore}%</div>
                <div className="score-meta">
                    <span className="score-label">Average Score</span>
                    <span className="score-change">
                        <span className="change-arrow">↑</span>
                        {change}
                    </span>
                </div>
            </div>

            <div className="departments-section">
                <h4 className="section-subtitle">Score by Department</h4>
                <div className="departments-list">
                    {departments.map((dept, index) => (
                        <div key={index} className="department-row">
                            <span className="dept-name">{dept.name}</span>
                            <div className="dept-bar-container">
                                <div className="dept-bar-bg">
                                    <div
                                        className="dept-bar-fill"
                                        style={{
                                            width: `${dept.score}%`,
                                            backgroundColor: dept.color
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Guest Satisfaction Card
interface RoomType {
    label: string;
    color: string;
}

interface GuestSatisfactionProps {
    title?: string;
    score?: number;
    change?: string;
    emoji?: string;
    roomTypes?: RoomType[];
    onViewAll?: () => void;
}

export const GuestSatisfactionCard: React.FC<GuestSatisfactionProps> = ({
    title = "Guest Satisfaction",
    score = 84.96,
    change = "Up by 15%",
    emoji = "😃",
    roomTypes = [
        { label: "Standard Room", color: "#50C878" },
        { label: "Deluxe Room", color: "#F5A623" },
        { label: "Family Room", color: "#E8657A" }
    ],
    onViewAll
}) => {
    // Calculate the arc for semi-circle gauge
    const radius = 70;
    const circumference = Math.PI * radius; // Half circle
    const progressOffset = circumference - (score / 100) * circumference;

    return (
        <div className="satisfaction-card">
            <div className="satisfaction-header">
                <h3 className="satisfaction-title">{title}</h3>
                <button className="btn-view-all" onClick={onViewAll}>View All</button>
            </div>

            <div className="satisfaction-content">
                {/* Gauge */}
                <div className="gauge-wrapper">
                    <svg className="gauge-svg" viewBox="0 0 160 100">
                        <defs>
                            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F5A623" />
                                <stop offset="50%" stopColor="#A8E063" />
                                <stop offset="100%" stopColor="#50C878" />
                            </linearGradient>
                        </defs>
                        {/* Background arc */}
                        <path
                            d="M 10 90 A 70 70 0 0 1 150 90"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.15)"
                            strokeWidth="12"
                            strokeLinecap="round"
                        />
                        {/* Progress arc */}
                        <path
                            d="M 10 90 A 70 70 0 0 1 150 90"
                            fill="none"
                            stroke="url(#gaugeGradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                        />
                    </svg>

                    {/* Center content */}
                    <div className="gauge-center">
                        <div className="gauge-emoji">{emoji}</div>
                        <div className="gauge-label">Average</div>
                        <div className="gauge-score">{score}%</div>
                        <div className="gauge-change">
                            <span className="check-icon">✓</span>
                            {change}
                        </div>
                    </div>

                    {/* Markers */}
                    <div className="gauge-markers">
                        <span className="marker-left">0</span>
                        <span className="marker-right">100</span>
                    </div>
                </div>

                {/* Room Types Legend */}
                <div className="room-types-legend">
                    {roomTypes.map((room, index) => (
                        <div key={index} className="room-type-item">
                            <span
                                className="room-dot"
                                style={{ backgroundColor: room.color }}
                            />
                            <span className="room-label">{room.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};