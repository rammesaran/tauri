import React from 'react';
import './profitcomponent.css';

// Unit Economics Card
export interface Unit {
  id: number;
  icon: string;
  title: string;
  amount: number;
  color: string;
}

export interface UnitEconomicsProps {
  title: string;
  subtitle: string;
  units: Unit[];
  onViewAll?: () => void;
}

export const UnitEconomics: React.FC<UnitEconomicsProps> = ({
  title,
  subtitle,
  units,
  onViewAll
}) => {
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'room':
        return (
          <svg width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 8 L8 24 L8 56 L56 56 L56 24 Z M32 16 L48 28 L48 48 L16 48 L16 28 Z" />
            <circle cx="42" cy="36" r="3" />
          </svg>
        );
      case 'service':
        return (
          <svg width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
            <path d="M16 20 C16 14 20 10 26 10 L38 10 C44 10 48 14 48 20 L48 44 C48 50 44 54 38 54 L26 54 C20 54 16 50 16 44 Z" />
            <path d="M26 20 L38 20 L38 30 L26 30 Z" fill="rgba(255,255,255,0.3)" />
            <circle cx="32" cy="40" r="4" fill="rgba(255,255,255,0.3)" />
          </svg>
        );
      case 'activity':
        return (
          <svg width="40" height="40" viewBox="0 0 64 64" fill="currentColor">
            <path d="M32 10 L40 26 L56 28 L44 40 L47 56 L32 48 L17 56 L20 40 L8 28 L24 26 Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="unit-economics-card">
      <div className="unit-economics-header">
        <div>
          <h3 className="unit-economics-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            {title}
          </h3>
          <p className="unit-economics-subtitle">{subtitle}</p>
        </div>
        <button className="btn-view-all" onClick={onViewAll}>View All</button>
      </div>

      <div className="unit-cards">
        {units.map((unit) => (
          <div
            key={unit.id}
            className="unit-card"
            style={{ backgroundColor: `${unit.color}33`, borderColor: `${unit.color}66` }}
          >
            <div className="unit-icon" style={{ color: unit.color }}>
              {renderIcon(unit.icon)}
            </div>
            <div className="unit-title">{unit.title}</div>
            <div className="unit-amount">${unit.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profit Tips Card
export interface ProfitTipsProps {
  title: string;
  tip: string;
  hasGradientBorder?: boolean;
}

export const ProfitTips: React.FC<ProfitTipsProps> = ({
  title,
  tip,
  hasGradientBorder = true
}) => {
  return (
    <div className={`profit-tips-card ${hasGradientBorder ? 'gradient-border' : ''}`}>
      <h3 className="profit-tips-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        {title}
      </h3>
      <p className="profit-tips-content">{tip}</p>
    </div>
  );
};

// Profit Target Card
export interface ProgressSegment {
  color: string;
  width: number;
}

export interface ProfitTargetProps {
  title: string;
  targetPercentage: number;
  currentPercentage: number;
  status: string;
  progressSegments: ProgressSegment[];
}

export const ProfitTarget: React.FC<ProfitTargetProps> = ({
  title,
  targetPercentage,
  currentPercentage,
  status,
  progressSegments
}) => {
  return (
    <div className="profit-target-card">
      <h3 className="profit-target-title">{title}</h3>

      <div className="profit-target-header">
        <span className="profit-target-label">Profit Targeted {targetPercentage}%</span>
        <span className="profit-target-status">Status: {status}</span>
      </div>

      <div className="profit-target-progress">
        <div className="progress-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            {progressSegments.map((segment, index) => (
              <div
                key={index}
                className="progress-segment"
                style={{
                  width: `${segment.width}%`,
                  backgroundColor: segment.color
                }}
              />
            ))}
          </div>
          <div className="progress-markers">
            {[0, 25, 50, 75, 100].map((marker) => (
              <span key={marker} className="progress-marker" style={{ left: `${marker}%` }}>
                •
              </span>
            ))}
          </div>
        </div>

        <div className="progress-percentage">{currentPercentage}%</div>

        <button className="btn-expand">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </div>
    </div>
  );
};