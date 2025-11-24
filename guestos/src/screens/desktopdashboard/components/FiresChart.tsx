import "./fireschart.css";

function FiresChart() {
    // Mock data for fires
    const firesData = [
        { label: "Completed", value: 78, percentage: 60, color: "#7ED957" },
        { label: "In-Progress", value: 45, percentage: 35, color: "#FFB74D" },
        { label: "Yet to Start", value: 6, percentage: 5, color: "#4FC3F7" }
    ];

    // Calculate pie chart segments
    const calculateSegment = (percentage: number, offset: number) => {
        const circumference = 2 * Math.PI * 80; // radius = 80
        const strokeDasharray = (percentage / 100) * circumference;
        const strokeDashoffset = -offset;
        return { strokeDasharray, strokeDashoffset };
    };

    let currentOffset = 0;
    const segments = firesData.map(data => {
        const segment = calculateSegment(data.percentage, currentOffset);
        currentOffset += (data.percentage / 100) * (2 * Math.PI * 80);
        return { ...data, ...segment };
    });

    return (
        <div className="fires-chart-component">
            <div className="fires-chart-header">
                <h2 className="fires-chart-title">Fires</h2>
                <div className="fires-chart-controls">
                    <select className="fires-select">
                        <option>Short Term</option>
                        <option>Mid Term</option>
                        <option>Long Term</option>
                    </select>
                    <button className="add-fires-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Add Fires
                    </button>
                </div>
            </div>

            <div className="fires-chart-content">
                <div className="fires-pie-chart">
                    <svg viewBox="0 0 200 200" className="pie-chart-svg">
                        <circle
                            cx="100"
                            cy="100"
                            r="80"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="40"
                        />
                        {segments.map((segment, index) => (
                            <circle
                                key={index}
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke={segment.color}
                                strokeWidth="40"
                                strokeDasharray={`${segment.strokeDasharray} ${2 * Math.PI * 80}`}
                                strokeDashoffset={segment.strokeDashoffset}
                                transform="rotate(-90 100 100)"
                                className="pie-segment"
                            />
                        ))}
                    </svg>
                    <div className="pie-center-text">
                        <div className="pie-center-value">{firesData.reduce((sum, d) => sum + d.value, 0)}</div>
                        <div className="pie-center-label">Total Fires</div>
                    </div>
                </div>

                <div className="fires-legend">
                    {firesData.map((data, index) => (
                        <div key={index} className="fires-legend-item">
                            <div className="fires-legend-left">
                                <span
                                    className="fires-legend-dot"
                                    style={{ backgroundColor: data.color }}
                                ></span>
                                <span className="fires-legend-label">{data.label}</span>
                            </div>
                            <div className="fires-legend-right">
                                <span className="fires-legend-percentage">{data.percentage}%</span>
                                <span className="fires-legend-value">({data.value})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FiresChart;