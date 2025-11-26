import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import "./overviewchart.css";

interface OverviewChartProps {
    selectedView: string;
    selectedPeriod: string;
    onViewChange: (view: string) => void;
    onPeriodChange: (period: string) => void;
}

function OverviewChart({
    selectedPeriod,
    onPeriodChange,
}: OverviewChartProps) {
    // Mock data generation with proper date labels
    const chartData = useMemo(() => {
        const dates = [
            "1/ Jan", "2/ Jan", "3/ Jan", "4/ Jan", "5/ Feb",
            "6/ Feb", "7/ Feb", "8/ Feb", "9/ Mar", "10/ Mar",
            "11/ Mar", "12/ Mar", "13/ Apr", "14/ Apr", "15/ Apr"
        ];

        return dates.map((date) => ({
            date,
            completed: Math.floor(Math.random() * 100) + 80,
            overdue: Math.floor(Math.random() * 80) + 60,
            taskAssigned: Math.floor(Math.random() * 70) + 50,
            completedNegative: -(Math.floor(Math.random() * 60) + 40),
            overdueNegative: -(Math.floor(Math.random() * 70) + 50),
            taskAssignedNegative: -(Math.floor(Math.random() * 50) + 30),
        }));
    }, [selectedPeriod]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="custom-tooltip">
                    <p className="tooltip-date">{data.date}</p>
                    <p className="tooltip-item completed">
                        Completed: {data.completed}
                    </p>
                    <p className="tooltip-item overdue">
                        Overdue: {data.overdue}
                    </p>
                    <p className="tooltip-item taskassigned">
                        Task Assigned: {data.taskAssigned}
                    </p>
                </div>
            );
        }
        return null;
    };

    const renderLegend = () => {
        return (
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
        );
    };

    return (
        <div className="overview-chart-component">
            <div className="overview-chart-header">
                <h2 className="overview-chart-title">Overview</h2>
                <div className="overview-chart-controls">
                    <button className="chart-download-btn" aria-label="Download">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
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

            <div className="recharts-container">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        barGap={3}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid
                            strokeDasharray="0"
                            stroke="rgba(255, 255, 255, 0.15)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="date"
                            stroke="rgba(255, 255, 255, 0.6)"
                            tick={{ fill: "rgba(255, 255, 255, 0.65)", fontSize: 12 }}
                            angle={0}
                            textAnchor="middle"
                            height={50}
                            interval={0}
                        />
                        <YAxis
                            stroke="rgba(255, 255, 255, 0.6)"
                            tick={{ fill: "rgba(255, 255, 255, 0.7)", fontSize: 14 }}
                            domain={[-200, 200]}
                            ticks={[200, 100, 50, 0, -50, -100, -200]}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.05)" }} />

                        {/* Positive Bars */}
                        <Bar
                            dataKey="completed"
                            fill="url(#completedGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={20}
                        />
                        <Bar
                            dataKey="overdue"
                            fill="url(#overdueGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={20}
                        />
                        <Bar
                            dataKey="taskAssigned"
                            fill="url(#taskAssignedGradient)"
                            radius={[6, 6, 0, 0]}
                            barSize={20}
                        />

                        {/* Negative Bars */}
                        <Bar
                            dataKey="completedNegative"
                            fill="url(#completedGradient)"
                            radius={[0, 0, 6, 6]}
                            barSize={20}
                            fillOpacity={0.4}
                        />
                        <Bar
                            dataKey="overdueNegative"
                            fill="url(#overdueGradient)"
                            radius={[0, 0, 6, 6]}
                            barSize={20}
                            fillOpacity={0.4}
                        />
                        <Bar
                            dataKey="taskAssignedNegative"
                            fill="url(#taskAssignedGradient)"
                            radius={[0, 0, 6, 6]}
                            barSize={20}
                            fillOpacity={0.4}
                        />

                        {/* Gradient Definitions */}
                        <defs>
                            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7ED957" />
                                <stop offset="100%" stopColor="#6BC948" />
                            </linearGradient>
                            <linearGradient id="overdueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#5DC1D8" />
                                <stop offset="100%" stopColor="#4DB8CF" />
                            </linearGradient>
                            <linearGradient id="taskAssignedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#FFB74D" />
                                <stop offset="100%" stopColor="#FFA726" />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {renderLegend()}
        </div>
    );
}

export default OverviewChart;