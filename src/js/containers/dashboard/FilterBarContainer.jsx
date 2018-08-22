/**
 * FilterBarContainer.jsx
 * Created by Lizzie Salita 8/16/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as dashboardFilterActions from '../../redux/actions/dashboard/dashboardFilterActions';

import FilterBar from '../../components/dashboard/filters/FilterBar';

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    toggleDashboardFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    updateFilterCount: PropTypes.func
};

const defaultProps = {
    stagedFilters: {},
    appliedFilters: {},
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
        if (isEqual(this.props.stagedFilters, this.props.appliedFilters)) {
            // filters have been applied or staged filters are empty
            this.prepareFilters(this.props.appliedFilters, true);
        }

        else {
            // filters are staged but have not been applied
            this.prepareFilters(this.props.stagedFilters, false);
        }
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps.appliedFilters, this.props.appliedFilters)) {
            // new filters have been applied
            this.prepareFilters(this.props.appliedFilters, true);
        }

        else if (!isEqual(prevProps.stagedFilters, this.props.stagedFilters)) {
            // staged filters changed
            if (!isEqual(this.props.stagedFilters, this.props.appliedFilters)) {
                this.prepareFilters(this.props.stagedFilters, false);
            }
            else {
                // staged filters match the applied filters
                this.prepareFilters(this.props.appliedFilters, true);
            }
        }
    }

    prepareFilters(props, applied) {
        const type = this.props.type;
        const table = this.props.table;

        let filters = [];

        // prepare the file name filters
        const fileNameFilters = this.prepareFileNames(props);
        if (fileNameFilters) {
            filters = filters.concat(fileNameFilters);
        }

        // prepare the submission id filters
        const submissionIdFilters = this.prepareSubmissionIds(props);
        if (submissionIdFilters) {
            filters = filters.concat(submissionIdFilters);
        }

        this.setState({
            filters,
            applied,
            filterCount: applied ? 0 : filters.length
        }, () => {
            this.props.updateFilterCount(this.state.filterCount, type, table);
        });
    }

    prepareFileNames(props) {
        if (props.fileNames.length > 0) {
            return props.fileNames.map((name) => ({
                    name,
                    value: name,
                    group: 'fileNames'
                }
            ));
        }
        return null;
    }

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

    // Determine the current number of filters that have been applied
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
                    filters={this.state.filters} />
            );
        }

        return output;
    }
}

FilterBarContainer.propTypes = propTypes;
FilterBarContainer.defaultProps = defaultProps;

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(dashboardFilterActions, dispatch)
)(FilterBarContainer);
