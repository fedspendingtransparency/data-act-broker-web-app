/**
 * FilterBarContainer.jsx
 * Created by Lizzie Salita 8/16/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import * as dashboardFilterActions from 'redux/actions/submissionsTable/dashboardFilterActions';

import FilterBar from 'components/submissionsTable/filters/FilterBar';

const propTypes = {
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    toggleDashboardFilter: PropTypes.func,
    updateDashboardFilter: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    updateFilterCount: PropTypes.func
};

const defaultProps = {
    stagedFilters: {},
    appliedFilters: {},
    toggleDashboardFilter: null,
    updateDashboardFilter: null,
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

        // prepare the agency filters
        const agencyFilters = this.prepareAgencies(props);
        if (agencyFilters) {
            filters = filters.concat(agencyFilters);
        }

        // prepare the createdBy filters
        const createdByFilters = this.prepareCreatedBy(props);
        if (createdByFilters) {
            filters = filters.concat(createdByFilters);
        }

        // prepare the lastDateModified filters
        const lastDateModifiedFilters = this.prepareLastDateModified(props);
        if (lastDateModifiedFilters) {
            filters = filters.concat(lastDateModifiedFilters);
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
            }));
        }
        return null;
    }

    prepareSubmissionIds(props) {
        if (props.submissionIds.length > 0) {
            return props.submissionIds.map((id) => ({
                name: id,
                value: id,
                group: 'submissionIds'
            }));
        }
        return null;
    }

    prepareAgencies(props) {
        if (props.agencies.length > 0) {
            return props.agencies.map((agency) => ({
                name: agency.name,
                value: agency,
                group: 'agencies'
            }));
        }
        return null;
    }

    prepareCreatedBy(props) {
        if (props.createdBy.length > 0) {
            return props.createdBy.map((createdBylist) => ({
                name: createdBylist.name,
                value: createdBylist,
                group: 'createdBy'
            }));
        }
        return null;
    }

    prepareLastDateModified(props) {
        if (props.lastDateModified.endDate) {
            return {
                name: `${props.lastDateModified.startDate} - ${props.lastDateModified.endDate}`,
                value: props.lastDateModified,
                group: 'lastDateModified'
            };
        }
        return null;
    }

    // Determine the current number of filters that have been applied
    determineFilterCount(filters) {
        let filterCount = 0;
        filters.forEach((filter) => {
            if (typeof filter === 'string') {
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
    (dispatch) => bindActionCreators(dashboardFilterActions, dispatch),
)(FilterBarContainer);
