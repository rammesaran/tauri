import './profitdashboard.css';

// ============ PROFIT DASHBOARD ============
export interface ProfitSegment {
  label: string;
  percentage: number;
  color: string;
}

export interface ProfitLegend {
  label: string;
  color: string;
}

interface ProfitDashboardProps {
  title?: string;
  month?: string;
  segments?: ProfitSegment[];
  legend?: ProfitLegend[];
}

export const ProfitDashboard: React.FC<ProfitDashboardProps> = ({
  title = "Profit Dashboard",
  month = "Oct 2025",
  segments = [
    { label: "20% Profit", percentage: 80, color: "#2DD4BF" },
    { label: "60% Operating Expenses", percentage: 70, color: "#F59E0B" },
    { label: "20% Taxes", percentage: 60, color: "#D946EF" },
  ],
  legend = [
    { label: "Profit", color: "#2DD4BF" },
    { label: "Expenses", color: "#F59E0B" },
    { label: "Taxes", color: "#D946EF" },
  ]
}) => {
  // Smaller arc parameters
  const centerX = 70;
  const centerY = 80;
  const baseRadius = 60;
  const strokeWidth = 12;
  const gap = 4;

  const createArcPath = (radius: number, percentage: number) => {
    const startAngle = 135;
    const maxSweep = 270;
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

  const createBackgroundArc = (radius: number) => {
    const startAngle = 135;
    const endAngle = 405;

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
          <button className="btn-dropdown">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <div className="profit-chart-content">
        <div className="profit-arcs-section">
          <svg className="profit-arcs-svg" viewBox="0 0 140 130">
            <defs>
              <linearGradient id="profitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2DD4BF" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="expensesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
              <linearGradient id="taxesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D946EF" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Background arcs */}
            <path d={createBackgroundArc(baseRadius)} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={createBackgroundArc(baseRadius - strokeWidth - gap)} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={createBackgroundArc(baseRadius - (strokeWidth + gap) * 2)} fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth={strokeWidth} strokeLinecap="round" />

            {/* Colored arcs */}
            <path d={createArcPath(baseRadius, segments[0]?.percentage || 80)} fill="none" stroke="url(#profitGrad)" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={createArcPath(baseRadius - strokeWidth - gap, segments[1]?.percentage || 70)} fill="none" stroke="url(#expensesGrad)" strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d={createArcPath(baseRadius - (strokeWidth + gap) * 2, segments[2]?.percentage || 60)} fill="none" stroke="url(#taxesGrad)" strokeWidth={strokeWidth} strokeLinecap="round" />
          </svg>

          {/* Labels */}
          <div className="profit-labels">
            {segments.map((seg, i) => (
              <div key={i} className="profit-label-text">{seg.label}</div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="profit-legend">
          {legend.map((item, i) => (
            <div key={i} className="profit-legend-item">
              <span className="profit-legend-dot" style={{ backgroundColor: item.color }} />
              <span className="profit-legend-text" style={{ color: item.color }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============ UNIT ECONOMICS ============
interface UnitMetric {
  icon: string;
  label: string;
  value: string;
  color: 'green' | 'pink' | 'yellow';
}

interface UnitEconomicsProps {
  title?: string;
  subtitle?: string;
  metrics?: UnitMetric[];
  onViewAll?: () => void;
}

export const UnitEconomics: React.FC<UnitEconomicsProps> = ({
  title = "Unit Economics",
  subtitle = "Per-room, Per service, or Per-activity profitability trackers",
  metrics = [
    { icon: "🛏️", label: "Per Room", value: "$50", color: "green" },
    { icon: "🛎️", label: "Per Service", value: "$08", color: "pink" },
    { icon: "⛳", label: "Per Activity", value: "$05", color: "yellow" },
  ],
  onViewAll
}) => {
  return (
    <div className="unit-economics-card">
      <div className="unit-economics-header">
        <div className="unit-economics-title-row">
          <span className="unit-icon">🏨</span>
          <h3 className="unit-economics-title">{title}</h3>
        </div>
        <button className="btn-view-all" onClick={onViewAll}>View All</button>
      </div>
      <p className="unit-economics-subtitle">{subtitle}</p>

      <div className="unit-metrics-row">
        {metrics.map((metric, index) => (
          <div key={index} className={`unit-metric-box ${metric.color}`}>
            <div className="unit-metric-icon">{metric.icon}</div>
            <div className="unit-metric-label">{metric.label}</div>
            <div className="unit-metric-value">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ PROFIT TIPS ============
interface ProfitTipsProps {
  title?: string;
  tip?: string;
}

export const ProfitTips: React.FC<ProfitTipsProps> = ({
  title = "Profit Tips",
  tip = "Setting seasonal pricing tiers can increase profit margin by up to 15% during peak periods."
}) => {
  return (
    <div className="profit-tips-card">
      <div className="profit-tips-header">
        <span className="tips-icon">💡</span>
        <h3 className="profit-tips-title">{title}</h3>
      </div>
      <p className="profit-tips-content">{tip}</p>
    </div>
  );
};

// ============ PROFIT TARGET ============
interface ProfitTargetProps {
  title?: string;
  targetPercentage?: number;
  currentPercentage?: number;
  status?: string;
}

export const ProfitTarget: React.FC<ProfitTargetProps> = ({
  title = "Profit Target",
  targetPercentage = 30,
  currentPercentage = 27,
  status = "On Track"
}) => {
  return (
    <div className="profit-target-card">
      <h3 className="profit-target-title">{title}</h3>

      <div className="profit-target-info">
        <span className="target-label">Profit Targeted {targetPercentage}%</span>
        <span className="target-status">Status: {status}</span>
      </div>

      <div className="profit-target-bar-container">
        <div className="target-icon-left">☀️</div>
        <div className="profit-target-bar">
          <div
            className="profit-target-fill"
            style={{ width: `${(currentPercentage / targetPercentage) * 100}%` }}
          >
            <span className="target-percentage">{currentPercentage}%</span>
          </div>
        </div>
        <div className="target-icon-right">📈</div>
      </div>

      <div className="target-markers">
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
    </div>
  );
};

// ============ COMBINED ROW ============
export const ProfitSectionRow: React.FC = () => {
  return (
    <div className="profit-section-row">
      {/* 1. Profit Dashboard */}
      <div className="profit-card-wrapper dashboard-wrapper">
        <ProfitDashboard />
      </div>
      {/* 2. Unit Economics */}
      <div className="profit-card-wrapper economics-wrapper">
        <UnitEconomics />
      </div>
      {/* 3. Profit Tips + Profit Target (stacked) */}
      <div className="profit-card-wrapper tips-target-column">
        <ProfitTips />
        <ProfitTarget />
      </div>
    </div>
  );
};