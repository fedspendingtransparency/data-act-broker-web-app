/**
 * SubmitButtonContainer.jsx
 * Created by Lizzie Salita 11/12/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is } from 'immutable';

import * as appliedFilterActions from 'redux/actions/dashboard/appliedFilterActions';
import { clearAllFilters as clearStagedFilters } from 'redux/actions/dashboard/dashboardFilterActions';

import SubmitButton from 'components/dashboard/filters/SubmitButton';

const combinedActions = Object.assign({}, appliedFilterActions, {
    clearStagedFilters
});

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    applyStagedFilters: PropTypes.func,
    clearStagedFilters: PropTypes.func,
    resetAppliedFilters: PropTypes.func
};

export class SubmitButtonContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filtersChanged: false
        };

        this.resetFilters = this.resetFilters.bind(this);
        this.applyStagedFilters = this.applyStagedFilters.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stagedFilters !== this.props.stagedFilters) {
            this.stagingChanged();
        }
        else if (prevProps.appliedFilters !== this.props.appliedFilters) {
            this.stagingChanged();
        }
    }

    componentWillUnmount() {
        this.resetFilters();
    }

    compareStores() {
        // we need to do a deep equality check by comparing every store key
        const storeKeys = Object.keys(this.props.stagedFilters);
        if (storeKeys.length !== Object.keys(this.props.appliedFilters).length) {
            // key lengths do not match, there's a difference so fail immediately
            return false;
        }

        // check that the key exists in the appliedFilters object and also that it
        // is equal (using Immutable's equality check utilty function) in both stores
        return storeKeys.every((key) => (
            {}.hasOwnProperty.call(this.props.appliedFilters, key) &&
                is(this.props.appliedFilters[key], this.props.stagedFilters[key])
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
        this.props.applyStagedFilters(this.props.stagedFilters);
        this.setState({
            filtersChanged: false
        });
    }

    resetFilters() {
        this.props.clearStagedFilters();
        this.props.resetAppliedFilters();
    }

    render() {
        // Make sure all the required filters have been staged
        const stagedFilters = this.props.stagedFilters;
        const requiredFields = stagedFilters.file
            && stagedFilters.quarters.size > 0 && stagedFilters.fy.size > 0;
        return (
            <SubmitButton
                filtersChanged={this.state.filtersChanged}
                applyStagedFilters={this.applyStagedFilters}
                validFilters={requiredFields}
                resetFilters={this.resetFilters} />
        );
    }
}

export default connect(
    (state) => ({
        isEmpty: state.appliedDashboardFilters._empty,
        stagedFilters: state.dashboardFilters,
        appliedFilters: state.appliedDashboardFilters.filters
    }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(SubmitButtonContainer);

SubmitButtonContainer.propTypes = propTypes;
