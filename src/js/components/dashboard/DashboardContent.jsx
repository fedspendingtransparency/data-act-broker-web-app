/**
 * DashboardContent.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import DashboardSummaryContainer from 'containers/dashboard/DashboardSummaryContainer';
import DashboardTableContainer from 'containers/dashboard/visualizations/DashboardTableContainer';

const DashboardContent = () => (
    <div>
        <h2>Historical Data Summary</h2>
        <hr />
        <div className="dashboard-page__visualizations">
            <DashboardSummaryContainer />
            <DashboardTableContainer />
        </div>
    </div>
);

export default DashboardContent;
