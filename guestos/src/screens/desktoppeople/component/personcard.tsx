import React from 'react';
import './personcard.css';

interface PersonCardProps {
    name: string;
    role: string;
    status: string;
    avatar: string;
    rating: number;
    team: string;
    location: string;
    experience: string;
    description: string;
    onEditDetails?: () => void;
    onViewDetails?: () => void;
}

const PersonCard: React.FC<PersonCardProps> = ({
    name,
    role,
    status,
    avatar,
    rating,
    team,
    location,
    experience,
    description,
    onEditDetails,
    onViewDetails
}) => {
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <svg
                key={index}
                className={`star-icon ${index < rating ? 'filled' : 'empty'}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={index < rating ? '#FFD700' : 'none'}
                stroke={index < rating ? '#FFD700' : '#6B7280'}
                strokeWidth="2"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ));
    };

    return (
        <div className="person-card">
            <div className="person-card-header">
                <img src={avatar} alt={name} className="person-avatar" />
                <div className="person-info">
                    <h3 className="person-name">{name}</h3>
                    <p className="person-role">{role}</p>
                    <span className="person-status">{status}</span>
                </div>
            </div>

            <div className="person-rating">
                <span className="rating-label">Ratings:</span>
                <div className="stars">{renderStars()}</div>
            </div>

            <div className="person-details">
                <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{team}</span>
                </div>
                <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{location}</span>
                </div>
                <div className="detail-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{experience}</span>
                </div>
            </div>

            <p className="person-description">{description}</p>

            <div className="person-actions">
                <button className="btn-secondary" onClick={onEditDetails}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit Details
                </button>
                <button className="btn-primary" onClick={onViewDetails}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Details
                </button>
            </div>
        </div>
    );
};

export default PersonCard;