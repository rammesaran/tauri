import { useMemo } from "react";
import "./overviewchart.css";

interface OverviewChartProps {
    selectedView: string;
    selectedPeriod: string;
    onViewChange: (view: string) => void;
    onPeriodChange: (period: string) => void;
}

function OverviewChart({ selectedView, selectedPeriod, onViewChange, onPeriodChange }: OverviewChartProps) {
    // Generate mock data for the chart
    const chartData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
        const weeks = Array.from({ length: 31 }, (_, i) => `${i + 1}/`);

        const labels = selectedPeriod === 'Monthly' ? months : weeks;

        return labels.map((label, index) => ({
            label,
            taskAssigned: Math.floor(Math.random() * 100) + 50,
            overdue: Math.floor(Math.random() * 80) + 20,
            completed: Math.floor(Math.random() * 120) + 80,
        }));
    }, [selectedPeriod]);

    const maxValue = Math.max(
        ...chartData.flatMap(d => [d.taskAssigned, d.overdue, d.completed])
    );

    return (
        <div className="overview-chart-component">
            <div className="overview-chart-header">
                <h2 className="overview-chart-title">Overview</h2>
                <div className="overview-chart-controls">
                    <select
                        className="chart-select"
                        value={selectedView}
                        onChange={(e) => onViewChange(e.target.value)}
                    >
                        <option>Rocks</option>
                        <option>To-Dos</option>
                        <option>Fires</option>
                    </select>
                    <select
                        className="chart-select"
                        value={selectedPeriod}
                        onChange={(e) => onPeriodChange(e.target.value)}
                    >
                        <option>Quarterly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                    <button className="chart-download-btn" aria-label="Download">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
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
                            const completedHeight = (data.completed / maxValue) * 100;
                            const overdueHeight = (data.overdue / maxValue) * 100;
                            const assignedHeight = (data.taskAssigned / maxValue) * 100;

                            return (
                                <div key={index} className="chart-bar-group">
                                    <div className="chart-bars">
                                        <div
                                            className="chart-bar completed-bar"
                                            style={{ height: `${completedHeight}%` }}
                                            title={`Completed: ${data.completed}`}
                                        ></div>
                                        <div
                                            className="chart-bar overdue-bar"
                                            style={{ height: `${overdueHeight}%` }}
                                            title={`Overdue: ${data.overdue}`}
                                        ></div>
                                        <div
                                            className="chart-bar assigned-bar"
                                            style={{ height: `${assignedHeight}%` }}
                                            title={`Task Assigned: ${data.taskAssigned}`}
                                        ></div>
                                    </div>
                                    <div
                                        className="chart-bar-negative overdue-bar"
                                        style={{ height: `${overdueHeight * 0.6}%` }}
                                    ></div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="chart-x-axis">
                        {chartData.map((data, index) => (
                            <span key={index} className="x-axis-label">
                                {data.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="chart-legend">
                <div className="legend-item-chart">
                    <span className="legend-dot-chart completed"></span>
                    <span className="legend-text-chart">Completed</span>
                </div>
                <div className="legend-item-chart">
                    <span className="legend-dot-chart overdue"></span>
                    <span className="legend-text-chart">Overdue</span>
                </div>
                <div className="legend-item-chart">
                    <span className="legend-dot-chart assigned"></span>
                    <span className="legend-text-chart">Task Assigned</span>
                </div>
            </div>
        </div>
    );
}

export default OverviewChart;