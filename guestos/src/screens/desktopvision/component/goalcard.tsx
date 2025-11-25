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

const GoalsCard: React.FC<GoalsCardProps> = ({
    title,
    quarters,
    description,
    progressData,
    onQuarterChange
}) => {
    const [selectedQuarter, setSelectedQuarter] = React.useState(
        quarters.find(q => q.active)?.value || quarters[0].value
    );

    const handleQuarterClick = (quarter: string) => {
        setSelectedQuarter(quarter);
        onQuarterChange?.(quarter);
    };

    return (
        <div className="goals-card">
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

            <p className="goals-description">{description}</p>

            <div className="goals-progress">
                <div className="progress-timeline">
                    {progressData.map((data, index) => (
                        <div key={data.year} className="progress-item">
                            <div className="progress-year-label">
                                {data.year} - <span className="progress-percentage">{data.percentage}%</span>
                            </div>
                            {index < progressData.length - 1 && (
                                <div className="progress-connector" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="progress-bar-container">
                    <div className="progress-bar">
                        <div className="progress-segment" style={{ width: '20%', background: '#5B7FDB' }} />
                        <div className="progress-segment" style={{ width: '20%', background: '#E85D9A' }} />
                        <div className="progress-segment" style={{ width: '20%', background: '#FFA500' }} />
                        <div className="progress-segment" style={{ width: '20%', background: '#FFD700' }} />
                        <div className="progress-segment" style={{ width: '20%', background: '#4ADE80' }} />
                    </div>
                </div>

                <div className="progress-timeline progress-timeline-bottom">
                    {progressData.map((data, index) => (
                        <div key={`bottom-${data.year}`} className="progress-item">
                            {index >= 3 && (
                                <div className="progress-year-label">
                                    {data.year} - <span className="progress-percentage">{data.percentage}%</span>
                                </div>
                            )}
                            {index < progressData.length - 1 && index >= 2 && (
                                <div className="progress-connector" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoalsCard;