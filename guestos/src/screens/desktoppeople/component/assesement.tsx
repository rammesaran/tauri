import React from 'react';
import './assesement.css';

interface ACEMetric {
    id: number;
    score: number;
    maxScore: number;
    label: string;
    change: string;
    status: string;
    color: string;
}

interface ACEAssessmentProps {
    title: string;
    subtitle: string;
    overallScore: number;
    metrics: ACEMetric[];
    reminder: {
        title: string;
        message: string;
    };
    onEvaluate?: () => void;
}

const ACEAssessment: React.FC<ACEAssessmentProps> = ({
    title,
    subtitle,
    overallScore,
    metrics,
    reminder,
    onEvaluate
}) => {
    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'good':
                return '😊';
            case 'excellent':
                return '🌟';
            case 'needs work':
                return '⚠️';
            default:
                return '✓';
        }
    };

    return (
        <div className="ace-assessment-card">
            <div className="ace-header">
                <div>
                    <h3 className="ace-title">{title}</h3>
                    <p className="ace-subtitle">{subtitle}</p>
                </div>
                <button className="btn-evaluate" onClick={onEvaluate}>
                    Evaluate
                </button>
            </div>

            <div className="ace-overall-score">
                <span className="score-label">Overall Score</span>
                <div className="score-bar-container">
                    <div className="score-bar">
                        <div
                            className="score-bar-fill"
                            style={{ width: `${overallScore}%` }}
                        />
                        <div className="score-markers">
                            {[0, 25, 50, 75, 100].map((marker) => (
                                <div key={marker} className="score-marker" style={{ left: `${marker}%` }}>
                                    <div className="marker-dot" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <span className="score-value">{overallScore}%</span>
                </div>
                <button className="btn-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </button>
            </div>

            <div className="ace-metrics">
                {metrics.map((metric) => (
                    <div key={metric.id} className="ace-metric">
                        <div
                            className="metric-circle"
                            style={{
                                background: `conic-gradient(${metric.color} ${(metric.score / metric.maxScore) * 360}deg, rgba(255,255,255,0.1) 0deg)`
                            }}
                        >
                            <div className="metric-circle-inner">
                                <span className="metric-score">{metric.score}/{metric.maxScore}</span>
                            </div>
                        </div>
                        <div className="metric-info">
                            <h4 className="metric-label">{metric.label}</h4>
                            <p className="metric-change">{metric.change}</p>
                            <div className="metric-status">
                                <span className="status-icon">{getStatusIcon(metric.status)}</span>
                                <span className="status-text">{metric.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="ace-reminder">
                <div className="reminder-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </div>
                <div className="reminder-content">
                    <h4 className="reminder-title">{reminder.title}</h4>
                    <p className="reminder-message">{reminder.message}</p>
                </div>
            </div>
        </div>
    );
};

export default ACEAssessment;