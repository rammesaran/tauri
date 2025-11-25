import React from 'react';
import './occupancycard.css';

interface OccupancyMetric {
    id: number;
    percentage: number;
    label: string;
    trend: 'up' | 'down';
    primary: number;
    secondary: number;
    primaryLabel: string;
    secondaryLabel: string;
    color: string;
}

interface OccupancyCardProps {
    title: string;
    metrics: OccupancyMetric[];
}

const OccupancyCard: React.FC<OccupancyCardProps> = ({ title, metrics }) => {
    return (
        <div className="occupancy-card">
            <h3 className="occupancy-title">{title}</h3>

            <div className="occupancy-metrics">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className="occupancy-metric"
                        style={{ backgroundColor: `${metric.color}33` }}
                    >
                        <div className="metric-header">
                            <span className="metric-percentage">{metric.label}</span>
                            <span className={`metric-trend ${metric.trend}`}>
                                {metric.trend === 'up' ? '↑' : '↓'}
                            </span>
                        </div>

                        <div className="metric-values">
                            <div className="metric-value">
                                <span className="value-number">{metric.primary}</span>
                                <span className="value-label">{metric.primaryLabel}</span>
                            </div>
                            <div className="metric-value">
                                <span className="value-number">{metric.secondary}</span>
                                <span className="value-label">{metric.secondaryLabel}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OccupancyCard;