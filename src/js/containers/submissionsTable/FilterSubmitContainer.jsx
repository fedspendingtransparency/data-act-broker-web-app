/**
 * FilterSubmitContainer.jsx
 * Created by Lizzie Salita 8/14/18
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as appliedFilterActions from 'redux/actions/submissionsTable/appliedFilterActions';
import { resetDashboardFilters as clearStagedFilters } from 'redux/actions/submissionsTable/stagedFiltersActions';

import FilterSubmit from 'components/submissionsTable/filters/FilterSubmit';

const combinedActions = Object.assign({}, appliedFilterActions, {
    clearStagedFilters
});

const propTypes = {
    type: PropTypes.string,
    table: PropTypes.string,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

const FilterSubmitContainer = ({
    type = '',
    table = '',
    stagedFilters = {},
    appliedFilters = {},
    applyStagedFilters = null,
    clearStagedFilters = null,
    resetAppliedFilters = null
}) => {
    const [filtersChanged, setFiltersChanged] = useState(null);

    useEffect(() => {
        filtersUpdated();
    }, [stagedFilters, appliedFilters]);

    const filtersUpdated = () => {
        // do an equality check between the staged filters and applied filters
        if (!isEqual(stagedFilters, appliedFilters)) {
            setFiltersChanged(true);
        }
        else {
            // staged filters have been changed back to what's already applied
            setFiltersChanged(false);
        }
    };

    const setStagedFilters = () => {
        applyStagedFilters({
            filters: stagedFilters,
            dashboard: type,
            table: table
        });
        setFiltersChanged(false);
    };

    const resetFilters = () => {
        clearStagedFilters({
            dashboard: type,
            table: table
        });
        resetAppliedFilters({
            dashboard: type,
            table: table
        });
    };

    return (
        <FilterSubmit
            filtersChanged={filtersChanged}
            applyStagedFilters={setStagedFilters}
            resetFilters={resetFilters} />
    );
};

FilterSubmitContainer.propTypes = propTypes;

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(FilterSubmitContainer);
