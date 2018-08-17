/**
 * FilterBarContainer.jsx
 * Created by Lizzie Salita 8/16/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as dashboardFilterActions from '../../redux/actions/dashboard/dashboardFilterActions';

import FilterBar from '../../components/dashboard/filters/FilterBar';

const propTypes = {
    stagedFilters: PropTypes.object,
    toggleDashboardFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    updateFilterCount: PropTypes.func
};

const defaultProps = {
    stagedFilters: {},
    toggleDashboardFilter: null,
    type: '',
    table: '',
    updateFilterCount: null
};

export class FilterBarContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: [],
            filterCount: 0,
            applied: false
        };
    }

    componentDidMount() {
        // prepare filters on initial mount to handle pre-populated filters (such as a back
        // button event)
        this.prepareFilters();
    }

    componentDidUpdate(prevProps) {
        const type = this.props.type;
        const table = this.props.table;

        if (!Object.is(prevProps.stagedFilters[type][table], this.props.stagedFilters[type][table])) {
            // staged filters changed
            this.prepareFilters();
        }
    }

    /**
     * Convert the Redux filter data into JS objects
     */
    prepareFilters() {
        const type = this.props.type;
        const table = this.props.table;
        const props = this.props.stagedFilters[type][table];

        let filters = [];

        // prepare the submission id filters
        const submissionIdFilters = this.prepareSubmissionIds(props);
        if (submissionIdFilters) {
            filters = filters.concat(submissionIdFilters);
        }

        this.setState({
            filters,
            filterCount: filters.length
        }, () => {
            this.props.updateFilterCount(this.state.filterCount, type, table);
        });
    }

    /**
     * Logic for parsing the current Redux submission ID filter into a JS object that can be parsed by the
     * filter bar
     */
    prepareSubmissionIds(props) {
        if (props.submissionIds.length > 0) {
            return props.submissionIds.map((id) => ({
                    name: id,
                    value: id,
                    group: 'submissionIds'
                }
            ));
        }
        return null;
    }

    /**
     * Determine the current number of filters that have been applied
     */
    determineFilterCount(filters) {
        let filterCount = 0;
        filters.forEach((filter) => {
            if (typeof filter === "string") {
                filterCount += 1;
            }
            else if (filter instanceof Array) {
                filterCount += filter.values.length;
            }
            else {
                filterCount += Object.keys(filter).length;
            }
        });

        return filterCount;
    }

    render() {
        let output = null;
        if (this.state.filters.length > 0) {
            output = (
                <FilterBar
                    {...this.props}
                    applied={this.state.applied}
                    filters={this.state.filters}
                    filterCount={this.state.filterCount} />
            );
        }

        return output;
    }
}

FilterBarContainer.propTypes = propTypes;
FilterBarContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        stagedFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(dashboardFilterActions, dispatch)
)(FilterBarContainer);
