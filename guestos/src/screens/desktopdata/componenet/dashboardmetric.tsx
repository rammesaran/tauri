import React from 'react';

import './dashboardmetric.css';
import OccupancyCard from './occupancycard';
import { GuestSatisfactionCard, StaffEngagementCard } from './engagementcard';

const DashboardMetricsRow: React.FC = () => {
    return (
        <div className="dashboard-metrics-row">
            <div className="metrics-card-wrapper occupancy">
                <OccupancyCard title="Occupancy" />
            </div>
            <div className="metrics-card-wrapper engagement">
                <StaffEngagementCard />
            </div>
            <div className="metrics-card-wrapper satisfaction">
                <GuestSatisfactionCard />
            </div>
        </div>
    );
};

export default DashboardMetricsRow;