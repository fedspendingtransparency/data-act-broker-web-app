/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    submissionID: PropTypes.string
};

const ActiveDashboard = (props) => (
    <div>
        <h2>Active Submission Summary</h2>
        <hr />
        {props.submissionID}
    </div>
);

ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
