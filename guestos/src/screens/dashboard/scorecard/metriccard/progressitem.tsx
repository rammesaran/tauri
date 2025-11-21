import "./progressitem.css";

interface ProgressItemProps {
    title: string;
    percentage: number;
    icon?: string;
    hasFlag?: boolean;
}

function ProgressItem({ title, percentage, icon = "☀️", hasFlag = true }: ProgressItemProps) {
    return (
        <div className="progress-item-container">
            <div className="progress-item-header">
                <span className="progress-item-icon">{icon}</span>
                <div className="progress-item-bar-wrapper">
                    <div className="progress-item-bar">
                        <div
                            className="progress-item-fill"
                            style={{ width: `${percentage}%` }}
                        >
                            <span className="progress-item-percentage">{percentage}%</span>
                        </div>
                    </div>
                </div>
                {hasFlag && (
                    <button className="progress-item-flag-btn" aria-label="Flag">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                            <line x1="4" y1="22" x2="4" y2="15" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="progress-item-title">{title}</div>
            <div className="progress-item-dots">
                <span className="progress-dot"></span>
                <span className="progress-dot"></span>
                <span className="progress-dot"></span>
                <span className="progress-dot"></span>
                <span className="progress-dot"></span>
            </div>
        </div>
    );
}

export default ProgressItem;