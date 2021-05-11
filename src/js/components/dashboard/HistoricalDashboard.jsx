/**
 * HistoricalDashboard.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import DashboardTableContainer from 'containers/dashboard/table/DashboardTableContainer';


const HistoricalDashboard = () => (
    <div className="dashboard-page__content">
        <h2>Historical Data Summary</h2>
        <hr />
        <WarningsInfoGraphContainer />
        <DashboardTableContainer />
    </div>
);

export default HistoricalDashboard;
