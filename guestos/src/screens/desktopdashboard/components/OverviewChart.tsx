import { useMemo, useState } from "react";
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import "./overviewchart.css";

interface OverviewChartProps {
    selectedView?: string;
    selectedPeriod?: string;
    onViewChange?: (view: string) => void;
    onPeriodChange?: (period: string) => void;
}

function OverviewChart({
    selectedPeriod: externalPeriod,
    onPeriodChange,
}: OverviewChartProps) {
    const [internalPeriod, setInternalPeriod] = useState("Quarterly");
    const selectedPeriod = externalPeriod || internalPeriod;

    const handlePeriodChange = (period: string) => {
        setInternalPeriod(period);
        onPeriodChange?.(period);
    };

    const chartData = useMemo(() => {
        // Different data based on period selection
        const getDataForPeriod = () => {
            switch (selectedPeriod) {
                case "Weekly":
                    return [
                        { t: 85, o: -25 }, { t: 95, o: -30 }, { t: 78, o: -22 }, { t: 110, o: -35 },
                        { t: 92, o: -28 }, { t: 88, o: -26 }, { t: 105, o: -32 }, { t: 75, o: -20 },
                        { t: 115, o: -38 }, { t: 98, o: -30 }, { t: 82, o: -24 }, { t: 108, o: -34 },
                        { t: 90, o: -27 }, { t: 100, o: -31 }, { t: 95, o: -29 },
                    ];
                case "Monthly":
                    return [
                        { t: 140, o: -45 }, { t: 125, o: -40 }, { t: 155, o: -50 }, { t: 130, o: -42 },
                        { t: 145, o: -47 }, { t: 118, o: -38 }, { t: 160, o: -52 }, { t: 135, o: -44 },
                        { t: 150, o: -48 }, { t: 128, o: -41 }, { t: 142, o: -46 }, { t: 138, o: -45 },
                        { t: 165, o: -55 }, { t: 148, o: -48 }, { t: 158, o: -51 },
                    ];
                case "Quarterly":
                default:
                    return [
                        { t: 95, o: -30 }, { t: 80, o: -25 }, { t: 115, o: -38 }, { t: 88, o: -28 },
                        { t: 105, o: -34 }, { t: 75, o: -22 }, { t: 98, o: -31 }, { t: 85, o: -26 },
                        { t: 120, o: -40 }, { t: 92, o: -29 }, { t: 108, o: -35 }, { t: 100, o: -32 },
                        { t: 125, o: -42 }, { t: 110, o: -36 }, { t: 118, o: -38 },
                    ];
            }
        };

        const dates = [
            "1/ Jan", "2/ Jan", "3/ Jan", "4/ Jan",
            "5/ Feb", "6/ Feb", "7/ Feb", "8/ Feb",
            "9/ Mar", "10/ Mar", "11/ Mar", "12/ Mar",
            "13/ Apr", "14/ Apr", "15/ Apr"
        ];

        const dataValues = getDataForPeriod();

        return dates.map((date, index) => ({
            date,
            taskAssigned: dataValues[index].t,
            overdue: dataValues[index].o,
        }));
    }, [selectedPeriod]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="chart-tooltip">
                    <p className="chart-tooltip-title">{data.date}</p>
                    <div className="chart-tooltip-item green">
                        <span className="chart-tooltip-dot"></span>
                        <span>Task Assigned: {data.taskAssigned}</span>
                    </div>
                    <div className="chart-tooltip-item gray">
                        <span className="chart-tooltip-dot"></span>
                        <span>Overdue: {Math.abs(data.overdue)}</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="overview-chart-wrapper">
            <div className="overview-chart-header">
                <h2 className="overview-chart-title">Overview</h2>
                <div className="overview-chart-actions">
                    <select
                        className="overview-period-select"
                        value={selectedPeriod}
                        onChange={(e) => handlePeriodChange(e.target.value)}
                    >
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                    </select>
                    <button className="overview-download-btn" aria-label="Download">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="overview-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                        barGap={2}
                        barCategoryGap="20%"
                    >
                        <defs>
                            {/* Task Assigned - Bright Cyan/Green gradient matching reference */}
                            <linearGradient id="barGreenGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2DD4BF" />
                                <stop offset="35%" stopColor="#10B981" />
                                <stop offset="70%" stopColor="#059669" />
                                <stop offset="100%" stopColor="#047857" />
                            </linearGradient>

                            {/* Overdue - Muted gray/slate gradient for reflection */}
                            <linearGradient id="barGrayGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#64748B" stopOpacity="0.5" />
                                <stop offset="50%" stopColor="#475569" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="0"
                            stroke="rgba(255, 255, 255, 0.06)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="date"
                            stroke="transparent"
                            tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 11 }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                            height={50}
                        />

                        <YAxis
                            stroke="transparent"
                            tick={{ fill: "rgba(255, 255, 255, 0.5)", fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            domain={[-60, 200]}
                            ticks={[200, 100, 50, 0, -50]}
                            width={45}
                        />

                        <ReferenceLine y={0} stroke="rgba(255, 255, 255, 0.15)" strokeWidth={1} />

                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.02)" }} />

                        {/* Task Assigned - Green/Cyan bars ABOVE zero */}
                        <Bar
                            dataKey="taskAssigned"
                            fill="url(#barGreenGradient)"
                            radius={[50, 50, 0, 0]}
                            barSize={22}
                        />

                        {/* Overdue - Gray bars BELOW zero */}
                        <Bar
                            dataKey="overdue"
                            fill="url(#barGrayGradient)"
                            radius={[0, 0, 50, 50]}
                            barSize={22}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="overview-chart-legend">
                <div className="overview-legend-item">
                    <span className="overview-legend-dot green"></span>
                    <span className="overview-legend-text">Task Assigned</span>
                </div>
                <div className="overview-legend-item">
                    <span className="overview-legend-dot gray"></span>
                    <span className="overview-legend-text">Overdue</span>
                </div>
            </div>
        </div>
    );
}

export default OverviewChart;