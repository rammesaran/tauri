import React from 'react';
import './infocard.css';

interface InfoCardProps {
    title: string;
    description: string;
    icon: 'vision' | 'mission' | 'core-values';
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon }) => {
    const renderIcon = () => {
        switch (icon) {
            case 'vision':
                return (
                    <svg className="info-card-icon" viewBox="0 0 100 100" fill="none">
                        {/* Eye outer shape */}
                        <ellipse cx="50" cy="50" rx="35" ry="20" stroke="#4A9EFF" strokeWidth="3" fill="none" />
                        {/* Left decorative lines */}
                        <line x1="20" y1="45" x2="15" y2="40" stroke="#FF6B9D" strokeWidth="2" />
                        <line x1="18" y1="50" x2="12" y2="50" stroke="#FF6B9D" strokeWidth="2" />
                        <line x1="20" y1="55" x2="15" y2="60" stroke="#FF6B9D" strokeWidth="2" />
                        {/* Right decorative lines */}
                        <line x1="80" y1="45" x2="85" y2="40" stroke="#FF6B9D" strokeWidth="2" />
                        <line x1="82" y1="50" x2="88" y2="50" stroke="#FF6B9D" strokeWidth="2" />
                        <line x1="80" y1="55" x2="85" y2="60" stroke="#FF6B9D" strokeWidth="2" />
                        {/* Inner circle - iris */}
                        <circle cx="50" cy="50" r="12" fill="#FFA500" />
                        {/* Pupil */}
                        <circle cx="50" cy="50" r="6" fill="#1A3A52" />
                        {/* Light bulb filament inside */}
                        <path d="M 50 44 Q 47 47 50 50 Q 53 47 50 44" stroke="#FFD700" strokeWidth="1.5" fill="none" />
                        <circle cx="50" cy="51" r="2" fill="#FFD700" />
                    </svg>
                );
            case 'mission':
                return (
                    <svg className="info-card-icon" viewBox="0 0 100 100" fill="none">
                        {/* Flag pole */}
                        <line x1="30" y1="25" x2="30" y2="75" stroke="#4A9EFF" strokeWidth="3" />
                        {/* Flag */}
                        <path d="M 30 25 L 70 25 L 65 37.5 L 70 50 L 30 50 Z" fill="#4A9EFF" stroke="#4A9EFF" strokeWidth="2" />
                        {/* Person body */}
                        <circle cx="50" cy="35" r="4" fill="#FFA500" />
                        <line x1="50" y1="39" x2="50" y2="48" stroke="#FFA500" strokeWidth="2" />
                        <line x1="50" y1="42" x2="45" y2="45" stroke="#FFA500" strokeWidth="2" />
                        <line x1="50" y1="42" x2="55" y2="39" stroke="#FFA500" strokeWidth="2" />
                        {/* Mountain/triangle base */}
                        <path d="M 25 75 L 50 45 L 75 75 Z" stroke="#5AB9EA" strokeWidth="2" fill="none" />
                        {/* Small flag detail */}
                        <circle cx="68" cy="28" r="2" fill="#FFD700" />
                    </svg>
                );
            case 'core-values':
                return (
                    <svg className="info-card-icon" viewBox="0 0 100 100" fill="none">
                        {/* Hands cupping */}
                        <path d="M 25 55 Q 25 45 35 45 Q 40 45 42 50" stroke="#FF6B9D" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M 75 55 Q 75 45 65 45 Q 60 45 58 50" stroke="#FF6B9D" strokeWidth="3" fill="none" strokeLinecap="round" />
                        {/* Palm lines */}
                        <path d="M 30 60 Q 35 65 40 67" stroke="#FF6B9D" strokeWidth="2" fill="none" />
                        <path d="M 70 60 Q 65 65 60 67" stroke="#FF6B9D" strokeWidth="2" fill="none" />
                        {/* Star in the middle */}
                        <path d="M 50 35 L 52 42 L 59 42 L 53 47 L 55 54 L 50 49 L 45 54 L 47 47 L 41 42 L 48 42 Z" fill="#FFA500" stroke="#FFD700" strokeWidth="1.5" />
                        {/* Decorative sparkles */}
                        <circle cx="38" cy="38" r="1.5" fill="#FFD700" />
                        <circle cx="62" cy="38" r="1.5" fill="#FFD700" />
                        <line x1="35" y1="32" x2="37" y2="34" stroke="#5AB9EA" strokeWidth="1.5" />
                        <line x1="35" y1="34" x2="37" y2="32" stroke="#5AB9EA" strokeWidth="1.5" />
                        <line x1="65" y1="32" x2="63" y2="34" stroke="#5AB9EA" strokeWidth="1.5" />
                        <line x1="65" y1="34" x2="63" y2="32" stroke="#5AB9EA" strokeWidth="1.5" />
                    </svg>
                );
        }
    };

    return (
        <div className="info-card">
            <h3 className="info-card-title">{title}</h3>
            <div className="info-card-icon-wrapper">
                {renderIcon()}
            </div>
            <p className="info-card-description">{description}</p>
        </div>
    );
};

export default InfoCard;