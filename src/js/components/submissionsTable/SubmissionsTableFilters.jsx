/**
 * SubmissionsTableFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import FilterSubmitContainer from 'containers/submissionsTable/FilterSubmitContainer';
import { Filter } from '../SharedComponents/icons/Icons';
import SubmissionIdFilter from './filters/SubmissionIdFilter';
import FileNameFilter from './filters/FileNameFilter';
import AgencyFilter from './filters/AgencyFilter';
import CreatedByFilter from './filters/CreatedByFilter';
import LastDateModifiedFilter from './filters/LastDateModifiedFilter';
import SubmissionTypeFilter from './filters/SubmissionTypeFilter';

const propTypes = {
    toggleFilter: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    table: PropTypes.oneOf(['active', 'published']),
    type: PropTypes.oneOf(['dabs', 'fabs']),
    minDateLastModified: PropTypes.string
};

const defaultProps = {
    toggleFilter: null,
    stagedFilters: {},
    appliedFilters: {},
    table: '',
    type: '',
    minDateLastModified: ''
};

export default class SubmissionsTableFilters extends React.Component {
    constructor(props) {
        super(props);

        this.updateFilterList = this.updateFilterList.bind(this);
    }

    updateFilterList(filter, value) {
        this.props.toggleFilter(this.props.table, filter, value);
    }

    render() {
        let submissionTypeFilter = null;
        // test submissions only exist in the active tables so we only need that filter there
        if (this.props.table === 'active') {
            submissionTypeFilter = <SubmissionTypeFilter updateFilterList={this.updateFilterList} />;
        }
        return (
            <div className="dashboard-filters">
                <div className="dashboard-filters__label">
                    <span className="usa-da-icon filter-icon">
                        <Filter />
                    </span>
                    Filter by:
                </div>
                <AgencyFilter
                    type={this.props.type}
                    table={this.props.table}
                    updateFilterList={this.updateFilterList} />
                <FileNameFilter
                    table={this.props.table}
                    updateFilterList={this.updateFilterList} />
                <SubmissionIdFilter
                    table={this.props.table}
                    updateFilterList={this.updateFilterList} />
                {submissionTypeFilter}
                <CreatedByFilter
                    type={this.props.type}
                    table={this.props.table}
                    updateFilterList={this.updateFilterList} />
                <LastDateModifiedFilter
                    type={this.props.type}
                    table={this.props.table}
                    updateFilterList={this.updateFilterList}
                    minDateLastModified={this.props.minDateLastModified} />
                <FilterSubmitContainer
                    stagedFilters={this.props.stagedFilters}
                    appliedFilters={this.props.appliedFilters}
                    type={this.props.type}
                    table={this.props.table} />
            </div>
        );
    }
}

SubmissionsTableFilters.propTypes = propTypes;
SubmissionsTableFilters.defaultProps = defaultProps;
