/**
 * DashboardContent.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import DashboardSummaryContainer from 'containers/dashboard/DashboardSummaryContainer';

const DashboardContent = () => (
    <div>
        <h2>Historical Data Summary</h2>
        <hr />
        <DashboardSummaryContainer />
        <WarningsInfoGraphContainer />
    </div>
);

export default DashboardContent;
