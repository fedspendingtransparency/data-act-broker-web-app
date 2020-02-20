/**
 * DashboardContent.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import WarningsInfoGraphContainer from 'containers/dashboard/graph/WarningsInfoGraphContainer';
import DashboardSummaryContainer from 'containers/dashboard/DashboardSummaryContainer';
import DashboardTableContainer from 'containers/dashboard/table/DashboardTableContainer';

const propTypes = {
    type: PropTypes.oneOf(['historical', 'active'])
};

const DashboardContent = (props) => (
    <div>
        <h2>{startCase(props.type)} Data Summary</h2>
        <hr />
        {props.type === 'historical' ? (
            <Fragment>
                <DashboardSummaryContainer />
                <WarningsInfoGraphContainer />
                <DashboardTableContainer />
            </Fragment>
        ) : (
            <p>Active Dashboard content here</p>
        )}
    </div>
);

DashboardContent.propTypes = propTypes;
export default DashboardContent;
