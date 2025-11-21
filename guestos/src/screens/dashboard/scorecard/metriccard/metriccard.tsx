import "./metriccard.css";

interface MetricCardProps {
    value: string;
    label: string;
    trend: "up" | "down";
    trendValue: string;
    icon?: string;
}

function MetricCard({ value, label, trend, trendValue, icon }: MetricCardProps) {
    return (
        <div className="metric-card-container">
            <div className="metric-value">{value}</div>
            <div className="metric-trend">
                <div className={`trend-indicator ${trend === "up" ? "trend-up" : "trend-down"}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        {trend === "up" ? (
                            <path d="M6 3L10 7H2L6 3Z" />
                        ) : (
                            <path d="M6 9L2 5H10L6 9Z" />
                        )}
                    </svg>
                </div>
                <span className="trend-text">
                    {trend === "up" ? "Up" : "Down"} by {trendValue}
                </span>
            </div>
            <div className="metric-label">{label}</div>
        </div>
    );
}

export default MetricCard;