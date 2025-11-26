import React from 'react';
import './HoursLockedChart.css';

interface DayData {
    day: string;
    hours: number;
    color: string;
}

interface HoursLockedChartProps {
    data: DayData[];
    maxHours: number;
}

const HoursLockedChart: React.FC<HoursLockedChartProps> = ({ data, maxHours }) => {
    const barWidth = 18;
    const chartHeight = 180;
    const maxBarHeight = 130;
    const totalWidth = data.length * 50;

    const getGradientId = (index: number) => `bar-gradient-${index}`;

    const getGradientColors = (color: string) => {
        switch (color) {
            case '#00E5D4':
                return { start: '#00E5D4', end: '#00B8A9' };
            case '#FFA500':
                return { start: '#FFD93D', end: '#FF6B35' };
            case '#7ED957':
                return { start: '#A8E063', end: '#56AB2F' };
            case '#FF6B6B':
                return { start: '#FFB347', end: '#FF6B6B' };
            default:
                return { start: color, end: color };
        }
    };

    return (
        <div className="hours-chart-container">
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${totalWidth} ${chartHeight}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    {data.map((item, index) => {
                        const colors = getGradientColors(item.color);
                        return (
                            <linearGradient
                                key={getGradientId(index)}
                                id={getGradientId(index)}
                                x1="0%"
                                y1="0%"
                                x2="0%"
                                y2="100%"
                            >
                                <stop offset="0%" stopColor={colors.start} />
                                <stop offset="100%" stopColor={colors.end} />
                            </linearGradient>
                        );
                    })}
                </defs>

                {data.map((item, index) => {
                    const barHeight = Math.max((item.hours / maxHours) * maxBarHeight, 8);
                    const x = index * 50 + 16;
                    const yBackground = 10;
                    const yBar = chartHeight - barHeight - 35;

                    return (
                        <g key={index}>
                            {/* Background track */}
                            <rect
                                x={x}
                                y={yBackground}
                                width={barWidth}
                                height={maxBarHeight}
                                rx={barWidth / 2}
                                ry={barWidth / 2}
                                fill="rgba(255, 255, 255, 0.12)"
                            />
                            {/* Filled bar with animation */}
                            <rect
                                x={x}
                                y={yBar}
                                width={barWidth}
                                height={barHeight}
                                rx={barWidth / 2}
                                ry={barWidth / 2}
                                fill={`url(#${getGradientId(index)})`}
                                className="chart-bar-animated"
                            />
                            {/* Dot */}
                            <circle
                                cx={x + barWidth / 2}
                                cy={chartHeight - 18}
                                r={4}
                                fill={item.hours > 0 ? item.color : 'rgba(255, 255, 255, 0.3)'}
                                className="chart-dot-animated"
                            />
                            {/* Day label */}
                            <text
                                x={x + barWidth / 2}
                                y={chartHeight - 2}
                                textAnchor="middle"
                                fill="rgba(255, 255, 255, 0.8)"
                                fontSize="14"
                                fontWeight="500"
                            >
                                {item.day}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default HoursLockedChart;