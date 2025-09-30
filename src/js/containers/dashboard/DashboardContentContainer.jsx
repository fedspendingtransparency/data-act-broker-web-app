/**
 * DashboardContentContainer.jsx
 * Created by Alisa Burdeyny 11/7/19
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChooseFiltersMessage from 'components/dashboard/ChooseFiltersMessage';
import HistoricalDashboard from 'components/dashboard/HistoricalDashboard';
import ActiveDashboardContainer from './ActiveDashboardContainer';

const propTypes = {
    appliedFilters: PropTypes.object,
    type: PropTypes.oneOf(['active', 'historical'])
};

const DashboardContentContainer = (props) => {
    const empty = `_${props.type}Empty`;
    if (props[empty]) {
        return (
            <div className="dashboard-page__content">
                <ChooseFiltersMessage>
                    Choose your filters and submit <br />
                    your search to begin
                </ChooseFiltersMessage>
            </div>
        );
    }
    else if (props.type === 'active') {
        return <ActiveDashboardContainer />;
    }
    return <HistoricalDashboard {...props} />;
};

DashboardContentContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters,
        _activeEmpty: state.appliedDashboardFilters._activeEmpty,
        _historicalEmpty: state.appliedDashboardFilters._historicalEmpty
    })
)(DashboardContentContainer);
