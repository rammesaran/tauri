import React from 'react';
import './progresstrading.css';

// Progress Card Component
interface ProgressCardProps {
    title: string;
    grade: string;
    percentage: number;
    label: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
    title,

    percentage,
    label
}) => {
    return (
        <div className="progress-card">
            <div className="progress-header">
                <h3 className="progress-title">{title}</h3>
                <button className="btn-view-all">View All</button>
            </div>

            <div className="progress-content">
                <div className="progress-icons">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                </div>

                <span className="progress-label">{label}</span>

                <div className="progress-bar-wrapper">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>

                    <div className="progress-bar-horizontal">
                        <div className="progress-bar-segments">
                            <div className="segment segment-1" />
                            <div className="segment segment-2" />
                            <div className="segment segment-3" />
                            <div className="segment segment-4" />
                        </div>
                        <span className="progress-percentage">{percentage}%</span>
                    </div>

                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

// Training Card Component
interface TrainingCardProps {
    title: string;
    subtitle: string;
    priority: string;
    course: {
        title: string;
        duration: string;
        dueDate: string;
        description: string;
    };
    onStartTraining?: () => void;
}

export const TrainingCard: React.FC<TrainingCardProps> = ({
    title,
    subtitle,
    priority,
    course,
    onStartTraining
}) => {
    return (
        <div className="training-card">
            <div className="training-header">
                <h3 className="training-title">{title}</h3>
                <button className="btn-view-all">View All</button>
            </div>

            <p className="training-subtitle">{subtitle}</p>

            <div className="training-course">
                <h4 className="course-title">{course.title}</h4>

                <div className="course-meta">
                    <div className="course-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Duration: {course.duration}</span>
                    </div>
                    <div className="course-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>Due: {course.dueDate}</span>
                    </div>
                </div>

                <p className="course-description">{course.description}</p>

                <div className="training-footer">
                    <div className="priority-badge">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{priority}</span>
                    </div>
                    <button className="btn-start-training" onClick={onStartTraining}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polygon points="10 8 16 12 10 16 10 8" />
                        </svg>
                        Start Training
                    </button>
                </div>
            </div>
        </div>
    );
};