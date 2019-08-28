/**
 * FilterSubmitContainer.jsx
 * Created by Lizzie Salita 8/14/18
 */

import React from 'react'; 
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

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
    resetAppliedFilters: PropTypes.func
};

const defaultProps = {
    type: '',
    table: '',
    stagedFilters: {},
    appliedFilters: {},
    applyStagedFilters: null,
    clearStagedFilters: null,
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
        if (!isEqual(prevProps.stagedFilters, this.props.stagedFilters)) {
            // staged filters changed
            this.filtersChanged();
        }
        else if (!isEqual(prevProps.appliedFilters, this.props.appliedFilters)) {
            // applied filters changed
            this.filtersChanged();
        }
    }


    filtersChanged() {
        // do an equality check between the staged filters and applied filters
        if (!isEqual(this.props.stagedFilters, this.props.appliedFilters)) {
            this.setState({
                filtersChanged: true
            });
        }
        else {
            // staged filters have been changed back to what's already applied
            this.setState({
                filtersChanged: false
            });
        }
    }

    applyStagedFilters() {
        this.props.applyStagedFilters({
            filters: this.props.stagedFilters,
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
        return (
            <FilterSubmit
                filtersChanged={this.state.filtersChanged}
                applyStagedFilters={this.applyStagedFilters}
                resetFilters={this.resetFilters} />
        );
    }
}

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(FilterSubmitContainer);

FilterSubmitContainer.propTypes = propTypes;
FilterSubmitContainer.defaultProps = defaultProps;
