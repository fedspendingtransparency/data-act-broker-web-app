/**
 * DashboardContent.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import DashboardSummaryContainer from 'containers/dashboard/DashboardSummaryContainer';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired
}

const DashboardContent = (props) => (
    <div>
        <h2>Historical Data Summary</h2>
        <hr />
        <DashboardSummaryContainer appliedFilters={props.appliedFilters}/>
    </div>
);

DashboardContent.propTypes = propTypes;
export default DashboardContent;
