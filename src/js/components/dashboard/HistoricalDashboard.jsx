/**
 * HistoricalDashboard.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import DashboardSummaryContainer from 'containers/dashboard/DashboardSummaryContainer';
import DashboardTableContainer from 'containers/dashboard/table/DashboardTableContainer';


const HistoricalDashboard = () => (
    <div>
        <h2>Historical Data Summary</h2>
        <hr />
        <DashboardSummaryContainer />
        <WarningsInfoGraphContainer />
        <DashboardTableContainer />
    </div>
);

export default HistoricalDashboard;
