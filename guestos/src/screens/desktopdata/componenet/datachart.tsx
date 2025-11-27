import React, { useState } from 'react';
import './datachart.css';

// Overview Area Chart
interface OverviewCategory {
    name: string;
    color: string;
}

interface OverviewChartProps {
    title?: string;
    categories?: OverviewCategory[];
    onDownload?: () => void;
    onViewAll?: () => void;
}

// Chart data for each category - paths drawn from bottom layer to top
const categoryChartData: Record<string, { path: string; color: string }[]> = {
    "All Category": [
        // Bottom layer - Tours & Travels (Pink) - largest area
        { path: "M 0,270 C 100,268 200,265 300,255 C 400,240 500,210 600,170 C 700,130 750,100 800,80 L 800,280 L 0,280 Z", color: "#FF6B9D" },
        // Hotel (Orange)
        { path: "M 0,272 C 100,270 200,268 300,262 C 400,252 500,235 600,210 C 700,185 750,165 800,150 L 800,280 L 0,280 Z", color: "#FFA500" },
        // Restaurants (Yellow/Lime)
        { path: "M 0,274 C 100,272 200,270 300,266 C 400,260 500,248 600,230 C 700,212 750,198 800,185 L 800,280 L 0,280 Z", color: "#C6E94B" },
        // SPA (Green)
        { path: "M 0,275 C 100,274 200,273 300,270 C 400,266 500,258 600,246 C 700,234 750,224 800,215 L 800,280 L 0,280 Z", color: "#7ED957" },
        // Top layer - Others (Cyan) - smallest area
        { path: "M 0,276 C 100,275 200,275 300,273 C 400,270 500,266 600,260 C 700,254 750,248 800,242 L 800,280 L 0,280 Z", color: "#5BC0EB" },
    ],
    "Tours & Travels": [
        { path: "M 0,265 C 100,260 200,250 300,235 C 400,215 500,185 600,150 C 700,115 750,90 800,70 L 800,280 L 0,280 Z", color: "#FF6B9D" },
    ],
    "Hotel": [
        { path: "M 0,268 C 100,264 200,258 300,248 C 400,232 500,208 600,180 C 700,152 750,132 800,115 L 800,280 L 0,280 Z", color: "#FFA500" },
    ],
    "Restaurants": [
        { path: "M 0,270 C 100,266 200,260 300,250 C 400,236 500,215 600,190 C 700,165 750,145 800,130 L 800,280 L 0,280 Z", color: "#C6E94B" },
    ],
    "SPA": [
        { path: "M 0,268 C 100,264 200,256 300,244 C 400,228 500,204 600,175 C 700,146 750,125 800,108 L 800,280 L 0,280 Z", color: "#7ED957" },
    ],
    "Others": [
        { path: "M 0,272 C 100,268 200,262 300,252 C 400,238 500,218 600,195 C 700,172 750,155 800,140 L 800,280 L 0,280 Z", color: "#5BC0EB" },
    ],
};

export const OverviewAreaChart: React.FC<OverviewChartProps> = ({
    title = "Overview",
    categories = [
        { name: "Tours & Travels", color: "#FF6B9D" },
        { name: "Hotel", color: "#FFA500" },
        { name: "Restaurants", color: "#C6E94B" },
        { name: "SPA", color: "#7ED957" },
        { name: "Others", color: "#5BC0EB" }
    ],
    onDownload,
    onViewAll
}) => {
    const [selectedCategory, setSelectedCategory] = useState("All Category");

    const chartData = categoryChartData[selectedCategory] || categoryChartData["All Category"];

    return (
        <div className="overview-chart-card">
            <div className="overview-header">
                <h3 className="overview-title">{title}</h3>
                <div className="overview-actions">
                    <select
                        className="category-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All Category">All Category</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <button className="btn-action" onClick={onDownload}>Download</button>
                    <button className="btn-action" onClick={onViewAll}>View All</button>
                </div>
            </div>

            <div className="chart-area">
                {/* Y-axis labels */}
                <div className="y-axis-labels">
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                </div>

                <div className="chart-svg-container">
                    <svg className="area-chart-svg" viewBox="0 0 800 280" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <line
                                key={i}
                                x1="0"
                                y1={i * 70}
                                x2="800"
                                y2={i * 70}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Dynamic chart areas based on selection */}
                        {chartData.map((data, index) => (
                            <path
                                key={index}
                                d={data.path}
                                fill={data.color}
                                opacity="0.9"
                            />
                        ))}

                        {/* Annotation */}
                        <g transform="translate(280, 180)">
                            <rect x="-45" y="-18" width="90" height="28" fill="white" rx="6" />
                            <text x="0" y="4" textAnchor="middle" fill="#333" fontSize="13" fontWeight="600">
                                Up by 15%
                            </text>
                        </g>
                        {/* Dotted line from annotation */}
                        <line x1="280" y1="190" x2="280" y2="280" stroke="white" strokeWidth="2" strokeDasharray="4,4" />
                    </svg>

                    {/* X-axis labels */}
                    <div className="x-axis-labels">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                            <span key={num}>{num}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend in single row */}
            <div className="chart-legend">
                {categories.map((cat, i) => (
                    <div key={i} className="legend-item">
                        <span className="legend-dot" style={{ backgroundColor: cat.color }} />
                        <span className="legend-label">{cat.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// RevPAR Bar Chart
interface RevPARData {
    category: string;
    income: number;
    expense: number;
}

interface RevPARChartProps {
    title?: string;
    dateRange?: string;
    amount?: number;
    change?: string;
    data?: RevPARData[];
}

export const RevPARChart: React.FC<RevPARChartProps> = ({
    title = "Rev/PAR",
    dateRange = "Sep 29th - Oct 3rd",
    amount = 490,
    change = "Revenue up by 15%",
    data = [
        { category: "Tours & Travels", income: 64, expense: 53 },
        { category: "Hotel", income: 57, expense: 10 },
        { category: "Restaurants", income: 98, expense: 82 },
        { category: "SPA", income: 100, expense: 83 },
        { category: "Others", income: 36, expense: 15 }
    ]
}) => {
    const maxValue = 100;

    return (
        <div className="revpar-chart-card">
            <div className="revpar-header">
                <h3 className="revpar-title">{title}</h3>
                <div className="revpar-date-section">
                    <span className="revpar-date">{dateRange}</span>
                    <button className="btn-icon-calendar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="revpar-amount-row">
                <div className="revpar-amount">
                    <span className="amount-symbol">$</span>
                    <span className="amount-value">{amount}</span>
                    <span className="amount-cents">.00</span>
                </div>
                <div className="revpar-change">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                        <polyline points="17 6 23 6 23 12" />
                    </svg>
                    <span>{change}</span>
                </div>
            </div>

            <div className="revpar-chart-area">
                {/* Y-axis */}
                <div className="revpar-y-axis">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                </div>

                <div className="revpar-bars">
                    {data.map((item, index) => (
                        <div key={index} className="bar-group">
                            <div className="bar-container">
                                {/* Income bar with background */}
                                <div className="bar-wrapper">
                                    <div className="bar-background"></div>
                                    <div
                                        className="bar bar-income"
                                        style={{ height: `${(item.income / maxValue) * 100}%` }}
                                    >
                                        <span className="bar-value">{item.income}</span>
                                    </div>
                                </div>
                                {/* Expense bar with background */}
                                <div className="bar-wrapper">
                                    <div className="bar-background"></div>
                                    <div
                                        className="bar bar-expense"
                                        style={{ height: `${(item.expense / maxValue) * 100}%` }}
                                    >
                                        <span className="bar-value">{item.expense}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-label">{item.category}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="revpar-legend">
                <div className="legend-item">
                    <span className="legend-dot income-dot" />
                    <span>Income</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot expense-dot" />
                    <span>Expense</span>
                </div>
            </div>
        </div>
    );
};

// Combined Row Component
export const ChartsRow: React.FC = () => {
    return (
        <div className="charts-row">
            <div className="chart-wrapper overview-wrapper">
                <OverviewAreaChart />
            </div>
            <div className="chart-wrapper revpar-wrapper">
                <RevPARChart />
            </div>
        </div>
    );
};