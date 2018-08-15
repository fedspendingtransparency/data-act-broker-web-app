/**
 * FilterSubmitContainer.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as appliedFilterActions from '../../redux/actions/dashboard/appliedFilterActions';
import { resetDashboardFilters as clearStagedFilters } from '../../redux/actions/dashboard/dashboardFilterActions';

import FilterSubmit from '../../components/dashboard/filters/FilterSubmit';

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
    setAppliedFilterCompletion: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

const defaultProps = {
    type: '',
    table: '',
    stagedFilters: {},
    appliedFilters: {},
    applyStagedFilters: null,
    clearStagedFilters: null,
    setAppliedFilterCompletion: null,
    resetAppliedFilters: null
};

export class FilterSubmitContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersChanged: false
        };

        this.resetFilters = this.resetFilters.bind(this);
        this.applyStagedFilters = this.applyStagedFilters.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stagedFilters[prevProps.type][prevProps.table]
            !== this.props.stagedFilters[this.props.type][this.props.table]) {
            this.stagingChanged();
        }
        else if (prevProps.appliedFilters[prevProps.type][prevProps.table]
            !== this.props.appliedFilters[this.props.type][this.props.table]) {
            this.stagingChanged();
        }
    }

    compareStores() {
        // access the filters for this dashboard type and table type
        const appliedFilters = this.props.appliedFilters[this.props.type][this.props.table].filters;
        const stagedFilters = this.props.stagedFilters[this.props.type][this.props.table];

        // we need to do a deep equality check by comparing every store key
        const storeKeys = Object.keys(stagedFilters);
        if (storeKeys.length !== Object.keys(appliedFilters).length) {
            // key lengths do not match, there's a difference so fail immediately
            return false;
        }

        // check that the key exists in the appliedFilters object and also that it
        // is equal (using Immutable's equality check utilty function) in both stores
        return storeKeys.every((key) => (
            {}.hasOwnProperty.call(appliedFilters, key) &&
            is(appliedFilters[key], stagedFilters[key])
        ));
    }

    stagingChanged() {
        // do a deep equality check between the staged filters and applied filters
        if (!this.compareStores()) {
            this.setState({
                filtersChanged: true
            });
        }
        else if (this.state.filtersChanged) {
            this.setState({
                filtersChanged: false
            });
        }
    }

    applyStagedFilters() {
        this.props.setAppliedFilterCompletion({
            complete: false,
            dashboard: this.props.type,
            table: this.props.table
        });
        this.props.applyStagedFilters({
            filters: this.props.stagedFilters[this.props.type][this.props.table],
            dashboard: this.props.type,
            table: this.props.table
        });
        this.setState({
            filtersChanged: false
        });
    }

    resetFilters() {
        this.props.clearStagedFilters({
            dashboard: this.props.type,
            table: this.props.table
        });
        this.props.resetAppliedFilters({
            dashboard: this.props.type,
            table: this.props.table
        });
    }

    render() {
        const requestsComplete = this.props.appliedFilters[this.props.type][this.props.table]._complete;
        return (
            <FilterSubmit
                filtersChanged={this.state.filtersChanged}
                requestsComplete={requestsComplete}
                applyStagedFilters={this.applyStagedFilters}
                resetFilters={this.resetFilters} />
        );
    }
}

export default connect(
    (state) => ({
        stagedFilters: state.dashboardFilters,
        appliedFilters: state.appliedDashboardFilters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(FilterSubmitContainer);

FilterSubmitContainer.propTypes = propTypes;
FilterSubmitContainer.defaultProps = defaultProps;
