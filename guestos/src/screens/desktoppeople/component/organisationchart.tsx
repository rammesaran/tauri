import React from 'react';
import './organisationchart.css';

interface Person {
    id: number;
    name: string;
    role: string;
    level: string | null;
    avatar: string;
    parentId?: number;
    children?: number[];
    isCurrentUser?: boolean;
}

interface OrganizationChartProps {
    title: string;
    structure: Person[];
    onViewFullChart?: () => void;
}

const OrganizationChart: React.FC<OrganizationChartProps> = ({
    title,
    structure,
    onViewFullChart
}) => {
    // Organize structure by hierarchy
    const ceo = structure.find(p => !p.parentId);
    const managers = structure.filter(p => p.parentId === ceo?.id);
    const frontDeskManager = managers.find(m => m.role === 'Front Desk Manager');
    const employees = frontDeskManager
        ? structure.filter(p => p.parentId === frontDeskManager.id)
        : [];

    const getLevelIcon = (level: string | null, isCurrentUser?: boolean) => {
        if (isCurrentUser || level === 'You') {
            return null; // Will show "You" badge separately
        }
        if (level === 'Executive Level') {
            return <span className="level-icon level-executive">★</span>;
        }
        if (level === 'Your Manager') {
            return <span className="level-icon level-manager">●</span>;
        }
        if (level === 'Department Head') {
            return <span className="level-icon level-department">●</span>;
        }
        return null;
    };

    const renderPersonNode = (person: Person, nodeType: 'ceo' | 'manager' | 'employee' = 'employee') => (
        <div
            key={person.id}
            className={`org-person-node ${nodeType}-node ${person.isCurrentUser || person.level === 'You' ? 'current-user' : ''}`}
        >
            <img
                src={person.avatar}
                alt={person.name}
                className="org-avatar"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=5a9fd4&color=fff&size=80`;
                }}
            />
            <div className="org-person-info">
                <h4 className="org-person-name">{person.name}</h4>
                <p className="org-person-role">{person.role}</p>
                {person.level && (
                    <div className="org-person-level-wrapper">
                        {getLevelIcon(person.level, person.isCurrentUser)}
                        <span className={`org-person-level ${person.isCurrentUser || person.level === 'You' ? 'you-badge' : ''}`}>
                            {person.isCurrentUser ? 'You' : person.level}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="organization-chart-card">
            <div className="org-chart-header">
                <h3 className="org-chart-title">{title}</h3>
                <button className="btn-view-full-chart" onClick={onViewFullChart}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                    View Full Chart
                </button>
            </div>

            <div className="org-chart-structure">
                {/* CEO Level */}
                {ceo && (
                    <div className="org-level org-level-ceo">
                        {renderPersonNode(ceo, 'ceo')}
                    </div>
                )}

                {/* Vertical line from CEO */}
                <div className="org-vertical-line ceo-to-managers"></div>

                {/* Horizontal line connecting managers */}
                <div className="org-horizontal-line managers-line"></div>

                {/* Managers Level */}
                <div className="org-level org-level-managers">
                    {managers.map((manager,) => (
                        <div key={manager.id} className="org-manager-wrapper">
                            <div className="org-vertical-line short-line"></div>
                            {renderPersonNode(manager, 'manager')}
                        </div>
                    ))}
                </div>

                {/* Only show employees under Front Desk Manager */}
                {employees.length > 0 && (
                    <>
                        {/* Vertical line from Front Desk Manager to employees */}
                        <div className="org-vertical-line manager-to-employees"></div>

                        {/* Horizontal line connecting employees */}
                        <div className="org-horizontal-line employees-line"></div>

                        {/* Employees Level */}
                        <div className="org-level org-level-employees">
                            {employees.map((employee) => (
                                <div key={employee.id} className="org-employee-wrapper">
                                    <div className="org-vertical-line short-line"></div>
                                    {renderPersonNode(employee, 'employee')}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrganizationChart;