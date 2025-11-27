import React, { useState } from 'react';
import './profitdashboard.css';

export interface Segment {
  label: string;
  percentage: number;
  color: string;
  gradientEnd?: string;
}

export interface Legend {
  label: string;
  color: string;
}

export interface ProfitDashboardProps {
  title?: string;
  month?: string;
  segments?: Segment[];
  legend?: Legend[];
  onMonthChange?: (month: string) => void;
}

const ProfitDashboard: React.FC<ProfitDashboardProps> = ({
  title = "Profit Dashboard",
  month = "Oct 2025",
  segments = [
    { label: "20% Profit", percentage: 80, color: "#2DD4BF", gradientEnd: "#22C55E" },
    { label: "60% Operating Expenses", percentage: 70, color: "#F59E0B", gradientEnd: "#F97316" },
    { label: "20% Taxes", percentage: 60, color: "#D946EF", gradientEnd: "#A855F7" },
  ],
  legend = [
    { label: "Profit", color: "#2DD4BF" },
    { label: "Expenses", color: "#F59E0B" },
    { label: "Taxes", color: "#D946EF" },
  ],
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // SVG parameters for multi-ring arc chart
  const centerX = 150;
  const centerY = 160;
  const baseRadius = 130;
  const strokeWidth = 22;
  const gap = 8;

  // Create arc path for each ring (270 degree arc - 3/4 circle opening to the right)
  const createArcPath = (radius: number, percentage: number) => {
    // Start from bottom-left, go up and around to bottom-right (270 degrees max)
    const startAngle = 135; // Bottom-left
    const maxSweep = 270; // 3/4 of circle
    const sweepAngle = (percentage / 100) * maxSweep;
    const endAngle = startAngle + sweepAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArc = sweepAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Create background arc (full 270 degrees)
  const createBackgroundArc = (radius: number) => {
    const startAngle = 135;
    const endAngle = 405; // 135 + 270

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 1 1 ${x2} ${y2}`;
  };

  return (
    <div className="profit-dashboard-card">
      <div className="profit-dashboard-header">
        <h3 className="profit-dashboard-title">{title}</h3>
        <div className="profit-dashboard-date">
          <span>{month}</span>
          <button
            className="btn-dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <div className="profit-chart-container">
        {/* Arc Chart */}
        <div className="profit-arcs-wrapper">
          <svg className="profit-arcs-svg" viewBox="0 0 300 280">
            <defs>
              {/* Gradients for each arc */}
              <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="taxesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Background arcs (light shade) */}
            <path
              d={createBackgroundArc(baseRadius)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={createBackgroundArc(baseRadius - strokeWidth - gap)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            <path
              d={createBackgroundArc(baseRadius - (strokeWidth + gap) * 2)}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />

            {/* Colored arcs - Outer to Inner: Profit (cyan), Expenses (orange), Taxes (purple) */}
            <path
              d={createArcPath(baseRadius, segments[0]?.percentage || 80)}
              fill="none"
              stroke="url(#profitGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="arc-animated"
            />
            <path
              d={createArcPath(baseRadius - strokeWidth - gap, segments[1]?.percentage || 70)}
              fill="none"
              stroke="url(#expensesGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="arc-animated"
            />
            <path
              d={createArcPath(baseRadius - (strokeWidth + gap) * 2, segments[2]?.percentage || 60)}
              fill="none"
              stroke="url(#taxesGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="arc-animated"
            />
          </svg>
        </div>

        {/* Labels next to chart */}
        <div className="profit-labels">
          {segments.map((segment, index) => (
            <div key={index} className="profit-label-item">
              <span className="profit-label-text">{segment.label}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="profit-legend">
          {legend.map((item, index) => (
            <div key={index} className="profit-legend-item">
              <span
                className="profit-legend-dot"
                style={{ backgroundColor: item.color }}
              />
              <span className="profit-legend-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfitDashboard;