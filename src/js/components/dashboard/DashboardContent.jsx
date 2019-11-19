/**
 * DashboardContent.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import DashboardTableContainer from 'containers/dashboard/visualizations/DashboardTableContainer';

const DashboardContent = () => (
    <div>
        <h2>Historical Data Summary</h2>
        <hr />
        <DashboardTableContainer />
    </div>
);

export default DashboardContent;
