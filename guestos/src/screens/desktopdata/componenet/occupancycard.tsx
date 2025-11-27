import React from 'react';
import './occupancycard.css';

interface OccupancyMetric {
    id: number;
    percentage: string;
    trend: 'up' | 'down';
    leftValue: number;
    leftLabel: string;
    rightValue: number;
    rightLabel: string;
    color: 'green' | 'pink' | 'yellow';
}

interface OccupancyCardProps {
    title?: string;
    metrics?: OccupancyMetric[];
}

const OccupancyCard: React.FC<OccupancyCardProps> = ({
    title = "Occupancy",
    metrics
}) => {
    const defaultMetrics: OccupancyMetric[] = [
        {
            id: 1,
            percentage: "5%",
            trend: 'up',
            leftValue: 42,
            leftLabel: "Booked",
            rightValue: 17,
            rightLabel: "Check-In",
            color: 'green'
        },
        {
            id: 2,
            percentage: "6%",
            trend: 'up',
            leftValue: 34,
            leftLabel: "Success",
            rightValue: 8,
            rightLabel: "Extended",
            color: 'pink'
        },
        {
            id: 3,
            percentage: "3%",
            trend: 'down',
            leftValue: 6,
            leftLabel: "Refund",
            rightValue: 2,
            rightLabel: "Cancelled",
            color: 'yellow'
        }
    ];

    const data = metrics || defaultMetrics;

    return (
        <div className="occupancy-card-container">
            <h3 className="occupancy-card-title">{title}</h3>

            <div className="occupancy-cards-row">
                {data.map((metric) => (
                    <div
                        key={metric.id}
                        className={`occupancy-color-card ${metric.color}`}
                    >
                        {/* Arrow and Percentage */}
                        <div className="occupancy-percent-area">
                            <span className="occupancy-trend-arrow">
                                {metric.trend === 'up' ? '↑' : '↓'}
                            </span>
                            <span className="occupancy-percent-text">{metric.percentage}</span>
                        </div>

                        {/* Two stat boxes at bottom */}
                        <div className="occupancy-stats-row">
                            <div className="occupancy-stat-box">
                                <span className="occupancy-stat-number">{metric.leftValue}</span>
                                <span className="occupancy-stat-label">{metric.leftLabel}</span>
                            </div>
                            <div className="occupancy-stat-box">
                                <span className="occupancy-stat-number">{metric.rightValue}</span>
                                <span className="occupancy-stat-label">{metric.rightLabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OccupancyCard;