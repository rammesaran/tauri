import { useMemo } from "react";
import "./overviewchart.css";

interface OverviewChartProps {
    selectedView: string;
    selectedPeriod: string;
    onViewChange: (view: string) => void;
    onPeriodChange: (period: string) => void;
}

function OverviewChart({ selectedView, selectedPeriod, onViewChange, onPeriodChange }: OverviewChartProps) {
    // Mock data generation
    const chartData = useMemo(() => {
        return Array.from({ length: 31 }, (_, i) => ({
            completed: Math.floor(Math.random() * 100) + 50,
            overdue: Math.floor(Math.random() * 70) + 30,
            taskAssigned: Math.floor(Math.random() * 60) + 40,
        }));
    }, [selectedPeriod]);

    // Date labels
    const dateLabels = [
        '1/ Jan', '2/ Jan', '3/ Jan', '4/ Jan', '5/ Feb', '6/ Feb', '7/ Feb', '8/ Feb',
        '9/ Mar', '10/ Mar', '11/ Mar', '12/ Mar', '13/ Apr', '14/ Apr', '15/ Apr', '16/ Apr',
        '17/ May', '18/ May', '19/ May', '20/ May', '21/ Jun', '22/ Jun', '23/ Jun', '24/ Jun',
        '25/ Jul', '26/ Jul', '27/ Jul', '28/ Jul', '29/ Aug', '30/ Aug', '31/ Aug'
    ];

    return (
        <div className="overview-chart-component">
            <div className="overview-chart-header">
                <h2 className="overview-chart-title">Overview</h2>
                <div className="overview-chart-controls">
                    <button className="chart-download-btn" aria-label="Download">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                    <select
                        className="chart-select"
                        value={selectedPeriod}
                        onChange={(e) => onPeriodChange(e.target.value)}
                    >
                        <option>Quarterly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-y-axis">
                    <span>200</span>
                    <span>100</span>
                    <span>50</span>
                    <span>0</span>
                    <span>-50</span>
                    <span>-100</span>
                    <span>-200</span>
                </div>

                <div className="chart-area">
                    <div className="chart-bars-wrapper">
                        {chartData.map((data, index) => {
                            // Calculate heights as percentage (scale to 200)
                            const completedPercent = (data.completed / 200) * 100;
                            const overduePercent = (data.overdue / 200) * 100;
                            const assignedPercent = (data.taskAssigned / 200) * 100;

                            return (
                                <div key={index} className="chart-bar-group">
                                    {/* Positive bars above zero */}
                                    <div className="chart-bars">
                                        <div
                                            className="chart-bar completed-bar"
                                            style={{ height: `${completedPercent}%` }}
                                            title={`Completed: ${data.completed}`}
                                        />
                                        <div
                                            className="chart-bar taskassigned-bar"
                                            style={{ height: `${assignedPercent}%` }}
                                            title={`Task Assigned: ${data.taskAssigned}`}
                                        />
                                        <div
                                            className="chart-bar overdue-bar"
                                            style={{ height: `${overduePercent}%` }}
                                            title={`Overdue: ${data.overdue}`}
                                        />
                                    </div>
                                    {/* Negative bars below zero */}
                                    <div className="chart-bars-negative">
                                        <div
                                            className="chart-bar-negative overdue-bar-negative"
                                            style={{ height: `${overduePercent * 0.6}%` }}
                                            title={`Overdue (below): ${data.overdue}`}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="chart-x-axis">
                        {dateLabels.map((label, index) => (
                            <span key={index} className="x-axis-label">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="chart-legend">
                <div className="legend-item-chart">
                    <span className="legend-dot-chart taskassigned"></span>
                    <span className="legend-text-chart">Task Assigned</span>
                </div>
                <div className="legend-item-chart">
                    <span className="legend-dot-chart overdue"></span>
                    <span className="legend-text-chart">Overdue</span>
                </div>
                <div className="legend-item-chart">
                    <span className="legend-dot-chart completed"></span>
                    <span className="legend-text-chart">Completed</span>
                </div>
            </div>
        </div>
    );
}

export default OverviewChart;