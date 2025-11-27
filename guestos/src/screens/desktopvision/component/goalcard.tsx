import React from 'react';
import './goalcard.css';

interface Quarter {
    label: string;
    value: string;
    active?: boolean;
}

interface ProgressData {
    year: number;
    percentage: number;
}

interface GoalsCardProps {
    title: string;
    quarters: Quarter[];
    description: string;
    progressData: ProgressData[];
    onQuarterChange?: (quarter: string) => void;
}

// Function to get color based on percentage
const getColorForPercentage = (percentage: number): { gradient: string; solid: string } => {
    if (percentage >= 85) {
        // High - Blue
        return {
            gradient: 'linear-gradient(180deg, #38BDF8 0%, #1DA1E8 100%)',
            solid: '#38BDF8'
        };
    } else if (percentage >= 80) {
        // Good - Green
        return {
            gradient: 'linear-gradient(180deg, #4ADE80 0%, #36C76A 100%)',
            solid: '#4ADE80'
        };
    } else if (percentage >= 75) {
        // Average - Yellow/Orange
        return {
            gradient: 'linear-gradient(180deg, #F9B233 0%, #F5A020 100%)',
            solid: '#F9B233'
        };
    } else if (percentage >= 70) {
        // Below Average - Pink/Red
        return {
            gradient: 'linear-gradient(180deg, #E8657A 0%, #DC4B62 100%)',
            solid: '#E8657A'
        };
    } else {
        // Low - Dark Blue
        return {
            gradient: 'linear-gradient(180deg, #4F6DD9 0%, #3D5BC7 100%)',
            solid: '#4F6DD9'
        };
    }
};

const GoalsCard: React.FC<GoalsCardProps> = ({
    title,
    quarters,
    description,
    progressData: initialProgressData,
    onQuarterChange
}) => {
    const [selectedQuarter, setSelectedQuarter] = React.useState(
        quarters.find(q => q.active)?.value || quarters[quarters.length - 1].value
    );

    // Different data for each quarter
    const quarterData: Record<string, ProgressData[]> = {
        Q1: [
            { year: 2020, percentage: 65 },
            { year: 2021, percentage: 58 },
            { year: 2022, percentage: 72 },
            { year: 2023, percentage: 68 },
            { year: 2024, percentage: 75 }
        ],
        Q2: [
            { year: 2020, percentage: 70 },
            { year: 2021, percentage: 65 },
            { year: 2022, percentage: 78 },
            { year: 2023, percentage: 72 },
            { year: 2024, percentage: 82 }
        ],
        Q3: [
            { year: 2020, percentage: 75 },
            { year: 2021, percentage: 70 },
            { year: 2022, percentage: 85 },
            { year: 2023, percentage: 75 },
            { year: 2024, percentage: 88 }
        ],
        Q4: [
            { year: 2020, percentage: 80 },
            { year: 2021, percentage: 78 },
            { year: 2022, percentage: 88 },
            { year: 2023, percentage: 78 },
            { year: 2024, percentage: 92 }
        ]
    };

    const progressData = quarterData[selectedQuarter] || initialProgressData;

    const handleQuarterClick = (quarter: string) => {
        setSelectedQuarter(quarter);
        onQuarterChange?.(quarter);
    };

    return (
        <div className="goals-card">
            {/* Header */}
            <div className="goals-card-header">
                <h3 className="goals-card-title">{title}</h3>
                <div className="goals-quarters">
                    {quarters.map((quarter) => (
                        <button
                            key={quarter.value}
                            className={`quarter-btn ${selectedQuarter === quarter.value ? 'active' : ''}`}
                            onClick={() => handleQuarterClick(quarter.value)}
                        >
                            {quarter.label}
                        </button>
                    ))}
                    <button className="download-btn" title="Download">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Description */}
            <p className="goals-description">{description}</p>

            {/* Progress Section */}
            <div className="goals-progress-section">
                {/* Top Labels Row - 2020, 2022, 2024 */}
                <div className="progress-labels-row top">
                    <div className="label-slot start">
                        <div className="label-content">
                            <span className="year-text">{progressData[0].year}</span>
                            <span className="dash-text"> - </span>
                            <span
                                className="percent-text"
                                style={{ color: getColorForPercentage(progressData[0].percentage).solid }}
                            >
                                {progressData[0].percentage}%
                            </span>
                        </div>
                        <div className="connector-line"></div>
                    </div>
                    <div className="label-slot center">
                        <div className="label-content">
                            <span className="year-text">{progressData[2].year}</span>
                            <span className="dash-text"> - </span>
                            <span
                                className="percent-text"
                                style={{ color: getColorForPercentage(progressData[2].percentage).solid }}
                            >
                                {progressData[2].percentage}%
                            </span>
                        </div>
                        <div className="connector-line"></div>
                    </div>
                    <div className="label-slot end">
                        <div className="label-content">
                            <span className="year-text">{progressData[4].year}</span>
                            <span className="dash-text"> - </span>
                            <span
                                className="percent-text"
                                style={{ color: getColorForPercentage(progressData[4].percentage).solid }}
                            >
                                {progressData[4].percentage}%
                            </span>
                        </div>
                        <div className="connector-line"></div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar-outer">
                    <div className="progress-bar-inner">
                        {progressData.map((data, index) => (
                            <div
                                key={`${selectedQuarter}-${data.year}`}
                                className={`progress-segment segment-${index}`}
                                style={{
                                    background: getColorForPercentage(data.percentage).gradient,
                                    borderRadius: index === 0
                                        ? '25px 0 0 25px'
                                        : index === progressData.length - 1
                                            ? '0 25px 25px 0'
                                            : '0'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Labels Row - 2021, 2023 */}
                <div className="progress-labels-row bottom">
                    <div className="label-slot between-1">
                        <div className="connector-line"></div>
                        <div className="label-content">
                            <span className="year-text">{progressData[1].year}</span>
                            <span className="dash-text"> - </span>
                            <span
                                className="percent-text"
                                style={{ color: getColorForPercentage(progressData[1].percentage).solid }}
                            >
                                {progressData[1].percentage}%
                            </span>
                        </div>
                    </div>
                    <div className="label-slot between-2">
                        <div className="connector-line"></div>
                        <div className="label-content">
                            <span className="year-text">{progressData[3].year}</span>
                            <span className="dash-text"> - </span>
                            <span
                                className="percent-text"
                                style={{ color: getColorForPercentage(progressData[3].percentage).solid }}
                            >
                                {progressData[3].percentage}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoalsCard;