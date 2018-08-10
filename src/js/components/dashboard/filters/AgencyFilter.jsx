/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, {PropTypes} from 'react';

const propTypes = {
    updateDashboardFilter: PropTypes.func,
    currentAgency: PropTypes.object
};

export default class AgencyFilter extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className="dashboard-filters__filter">
                Agency Filter
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;
