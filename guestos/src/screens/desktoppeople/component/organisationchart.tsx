import React from 'react';
import './organisationchart.css';

interface Person {
    id: number;
    name: string;
    role: string;
    level: string | null;
    avatar: string;
    parentId?: number;
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
    const getEmployees = (managerId: number) => structure.filter(p => p.parentId === managerId);

    const renderPersonNode = (person: Person, className: string = '') => (
        <div key={person.id} className={`org-person-node ${className} ${person.isCurrentUser ? 'current-user' : ''}`}>
            <img src={person.avatar} alt={person.name} className="org-avatar" />
            <div className="org-person-info">
                <h4 className="org-person-name">{person.name}</h4>
                <p className="org-person-role">{person.role}</p>
                {person.level && (
                    <span className={`org-person-level ${person.isCurrentUser ? 'you-badge' : ''}`}>
                        {person.level}
                    </span>
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
                        {renderPersonNode(ceo, 'ceo-node')}
                    </div>
                )}

                {/* Connector Line */}
                <div className="org-connector org-connector-vertical" />

                {/* Managers Level */}
                <div className="org-level org-level-managers">
                    <div className="org-connector org-connector-horizontal" />
                    {managers.map((manager) => (
                        <div key={manager.id} className="org-branch">
                            <div className="org-connector org-connector-vertical-short" />
                            {renderPersonNode(manager, 'manager-node')}
                        </div>
                    ))}
                </div>

                {/* Employees Level - Only show for Front Desk Manager */}
                {managers.map((manager) => {
                    const employees = getEmployees(manager.id);
                    if (employees.length === 0 || manager.role !== 'Front Desk Manager') return null;

                    return (
                        <div key={`employees-${manager.id}`} className="org-level org-level-employees">
                            <div className="org-connector org-connector-vertical" />
                            <div className="org-connector org-connector-horizontal-wide" />
                            {employees.map((employee) => (
                                <div key={employee.id} className="org-branch">
                                    <div className="org-connector org-connector-vertical-short" />
                                    {renderPersonNode(employee, 'employee-node')}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrganizationChart;