import React from 'react';
import './datachart.css';

// Overview Area Chart
interface OverviewCategory {
    name: string;
    color: string;
    value: number;
}

interface OverviewChartProps {
    title: string;
    categories: OverviewCategory[];
    onCategoryChange?: (category: string) => void;
    onDownload?: () => void;
    onViewAll?: () => void;
}

export const OverviewAreaChart: React.FC<OverviewChartProps> = ({
    title,
    categories,
    onCategoryChange,
    onDownload,
    onViewAll
}) => {
    return (
        <div className="overview-chart-card">
            <div className="overview-header">
                <h3 className="overview-title">{title}</h3>
                <div className="overview-actions">
                    <select className="category-select" onChange={(e) => onCategoryChange?.(e.target.value)}>
                        <option>All Category</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                    <button className="btn-action" onClick={onDownload}>Download</button>
                    <button className="btn-action" onClick={onViewAll}>View All</button>
                </div>
            </div>

            <div className="chart-area">
                <svg className="area-chart-svg" viewBox="0 0 700 300" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 5, 10, 15, 20].map((val) => (
                        <line
                            key={val}
                            x1="0"
                            y1={300 - (val * 15)}
                            x2="700"
                            y2={300 - (val * 15)}
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Stacked areas */}
                    {/* Tours & Travels - Pink */}
                    <path
                        d="M 0,250 L 70,240 L 140,220 L 210,200 L 280,180 L 350,160 L 420,140 L 490,130 L 560,120 L 630,110 L 700,100 L 700,300 L 0,300 Z"
                        fill="#FF6B9D"
                        opacity="0.8"
                    />
                    {/* Hotel - Orange */}
                    <path
                        d="M 0,230 L 70,220 L 140,200 L 210,180 L 280,165 L 350,150 L 420,135 L 490,125 L 560,118 L 630,112 L 700,108 L 700,300 L 0,300 Z"
                        fill="#FFA500"
                        opacity="0.7"
                    />
                    {/* Restaurants - Yellow */}
                    <path
                        d="M 0,210 L 70,200 L 140,185 L 210,170 L 280,155 L 350,142 L 420,130 L 490,122 L 560,116 L 630,112 L 700,110 L 700,300 L 0,300 Z"
                        fill="#FFD700"
                        opacity="0.7"
                    />
                    {/* SPA - Green */}
                    <path
                        d="M 0,195 L 70,188 L 140,178 L 210,168 L 280,158 L 350,148 L 420,138 L 490,132 L 560,128 L 630,124 L 700,120 L 700,300 L 0,300 Z"
                        fill="#90EE90"
                        opacity="0.6"
                    />
                    {/* Others - Light Blue */}
                    <path
                        d="M 0,185 L 70,182 L 140,176 L 210,170 L 280,164 L 350,158 L 420,152 L 490,148 L 560,144 L 630,140 L 700,136 L 700,300 L 0,300 Z"
                        fill="#87CEEB"
                        opacity="0.5"
                    />

                    {/* Annotation */}
                    <g transform="translate(140, 160)">
                        <rect x="-35" y="-20" width="70" height="25" fill="white" rx="4" />
                        <text x="0" y="0" textAnchor="middle" fill="#333" fontSize="12" fontWeight="600">
                            Up by 15%
                        </text>
                        <line x1="0" y1="5" x2="0" y2="40" stroke="white" strokeWidth="2" strokeDasharray="4,4" />
                    </g>
                </svg>
            </div>

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
    title: string;
    dateRange: string;
    amount: number;
    change: string;
    data: RevPARData[];
}

export const RevPARChart: React.FC<RevPARChartProps> = ({
    title,
    dateRange,
    amount,
    change,
    data
}) => {
    const maxValue = 100;

    return (
        <div className="revpar-chart-card">
            <div className="revpar-header">
                <div>
                    <h3 className="revpar-title">{title}</h3>
                    <div className="revpar-date">{dateRange}</div>
                </div>
                <button className="btn-icon-calendar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </button>
            </div>

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

            <div className="revpar-bars">
                {data.map((item, index) => (
                    <div key={index} className="bar-group">
                        <div className="bar-container">
                            <div
                                className="bar bar-income"
                                style={{ height: `${(item.income / maxValue) * 100}%` }}
                            >
                                <span className="bar-value">{item.income}</span>
                            </div>
                            <div
                                className="bar bar-expense"
                                style={{ height: `${(item.expense / maxValue) * 100}%` }}
                            >
                                <span className="bar-value">{item.expense}</span>
                            </div>
                        </div>
                        <div className="bar-label">{item.category}</div>
                    </div>
                ))}
            </div>

            <div className="revpar-legend">
                <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#90EE90' }} />
                    <span>Income</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot" style={{ backgroundColor: '#FFA500' }} />
                    <span>Expense</span>
                </div>
            </div>
        </div>
    );
};