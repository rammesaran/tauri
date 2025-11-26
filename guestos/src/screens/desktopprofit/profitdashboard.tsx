import React from 'react';
import './ProfitDashboard.css';

export interface Segment {
  label: string;
  value: number;
  color: string;
}

export interface Legend {
  label: string;
  color: string;
}

export interface ProfitDashboardProps {
  title: string;
  month: string;
  segments: Segment[];
  legend: Legend[];
}

const ProfitDashboard: React.FC<ProfitDashboardProps> = ({
  title,
  month,
  segments,
  legend
}) => {
  // Calculate the donut chart paths
  const radius = 80;
  const strokeWidth = 35;
  const center = 100;

  let accumulatedValue = 0;
  const segmentPaths = segments.map((segment) => {
    const startAngle = (accumulatedValue / 100) * 360 - 90;
    accumulatedValue += segment.value;
    const endAngle = (accumulatedValue / 100) * 360 - 90;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = segment.value > 50 ? 1 : 0;

    return {
      d: `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: segment.color
    };
  });

  return (
    <div className="profit-dashboard-card">
      <div className="profit-dashboard-header">
        <h3 className="profit-dashboard-title">{title}</h3>
        <div className="profit-dashboard-date">
          <span>{month}</span>
          <button className="btn-calendar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </button>
        </div>
      </div>

      <div className="profit-donut-container">
        <svg className="profit-donut-svg" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />

          {/* Donut segments */}
          {segmentPaths.map((path, index) => (
            <path
              key={index}
              d={path.d}
              fill={path.color}
              opacity="0.9"
            />
          ))}

          {/* Inner white circle */}
          <circle
            cx={center}
            cy={center}
            r={radius - strokeWidth / 2}
            fill="rgba(30, 58, 95, 0.6)"
          />
        </svg>

        <div className="profit-labels">
          {segments.map((segment, index) => (
            <div key={index} className="profit-label">
              {segment.label}
            </div>
          ))}
        </div>
      </div>

      <div className="profit-legend">
        {legend.map((item, index) => (
          <div key={index} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: item.color }} />
            <span className="legend-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfitDashboard;