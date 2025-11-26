
interface OverviewData {
    rocks: { label: string; percentage: number };
    fires: { label: string; percentage: number };
    todo: { label: string; percentage: number };
}

interface OverviewCardProps {
    data: OverviewData;
    onCardClick?: () => void;
    onReportClick?: () => void;
}

function OverviewCard({ data, onCardClick, onReportClick }: OverviewCardProps) {
    const progressData = [
        {
            label: data.rocks.label,
            percentage: data.rocks.percentage,
            gradient: "linear-gradient(90deg, #F5A623 0%, #F7B84E 100%)"
        },
        {
            label: data.fires.label,
            percentage: data.fires.percentage,
            gradient: "linear-gradient(90deg, #00B8D4 0%, #00D4E8 100%)"
        },
        {
            label: data.todo.label,
            percentage: data.todo.percentage,
            gradient: "linear-gradient(90deg, #00C853 0%, #69F0AE 100%)"
        },
    ];

    return (
        <div
            onClick={onCardClick}
            style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "20px 24px",
                margin: "16px 0",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
                cursor: onCardClick ? "pointer" : "default",
            }}
        >
            {/* Header */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}>
                <h2 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    margin: 0,
                    color: "white",
                }}>
                    Overview
                </h2>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onReportClick?.();
                    }}
                    style={{
                        background: "none",
                        border: "none",
                        color: "white",
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: "500",
                        padding: 0,
                    }}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Report
                </button>
            </div>

            {/* Progress Bars */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}>
                {progressData.map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}>
                        <label style={{
                            fontSize: "15px",
                            color: "white",
                            fontWeight: "500",
                        }}>
                            {item.label}
                        </label>
                        <div style={{
                            height: "12px",
                            background: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "6px",
                            overflow: "hidden",
                            position: "relative",
                            width: "100%",
                        }}>
                            <div style={{
                                height: "100%",
                                width: `${item.percentage}%`,
                                background: item.gradient,
                                borderRadius: "6px",
                                transition: "width 0.5s ease",
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OverviewCard;