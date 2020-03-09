/**
 * DashboardContentContainer.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChooseFiltersMessage from 'components/dashboard/ChooseFiltersMessage';
import DashboardContent from 'components/dashboard/DashboardContent';
import ActiveDashboardContainer from './ActiveDashboardContainer';

const propTypes = {
    appliedFilters: PropTypes.object,
    type: PropTypes.oneOf(['active', 'historical'])
};

const DashboardContentContainer = (props) => {
    const empty = `_${props.type}Empty`;
    if (props[empty]) {
        return <ChooseFiltersMessage />;
    }
    else if (props.type === 'active') {
        return <ActiveDashboardContainer />;
    }
    return <DashboardContent {...props} />;
};

DashboardContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters,
        _activeEmpty: state.appliedDashboardFilters._activeEmpty,
        _historicalEmpty: state.appliedDashboardFilters._historicalEmpty
    }),
)(DashboardContentContainer);
