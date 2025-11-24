import "./metriccard.css";

interface MetricCardProps {
    title: string;
    value: number;
    change: number;
    label: string;
    type: "rocks" | "todos" | "fires";
    isNegative?: boolean;
}

function MetricCard({ title, value, change, label, type, isNegative = false }: MetricCardProps) {
    const getIcon = () => {
        switch (type) {
            case "rocks":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                );
            case "todos":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 11l3 3L22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                );
            case "fires":
                return (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                );
        }
    };

    return (
        <div className={`metric-card-component ${type}-card-component`}>
            <div className="metric-card-header">
                <div className="metric-card-title-section">
                    <h3 className="metric-card-title">{title}</h3>
                </div>
                <div className="metric-card-icon">
                    {getIcon()}
                </div>
            </div>

            <div className="metric-card-value">{value}</div>

            <div className="metric-card-footer">
                <div className={`metric-card-change ${isNegative ? 'negative' : 'positive'}`}>
                    <span className="change-icon">{isNegative ? '↓' : '↑'}</span>
                    <span className="change-value">{Math.abs(change)}%</span>
                </div>
                <span className="metric-card-label">{label}</span>
            </div>
        </div>
    );
}

export default MetricCard;