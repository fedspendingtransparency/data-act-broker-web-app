/**
 * DashboardFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, { PropTypes } from 'react';

import { Filter } from '../../components/SharedComponents/icons/Icons';
import FilterSubmitContainer from '../../containers/dashboard/FilterSubmitContainer';
import SubmissionIdFilter from './filters/SubmissionIdFilter';
import FileNameFilter from './filters/FileNameFilter';
import AgencyFilter from './filters/AgencyFilter';
import CreatedByFilter from './filters/CreatedByFilter';
import LastDateModifiedFilter from './filters/LastDateModifiedFilter';

const propTypes = {
    toggleFilter: PropTypes.func,
    stagedFilters: PropTypes.object,
    appliedFilters: PropTypes.object,
    table: PropTypes.string,
    type: PropTypes.string,
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

export default class DashboardFilters extends React.Component {
    constructor(props) {
        super(props);

        this.updateFilterList = this.updateFilterList.bind(this);
    }

    updateFilterList(filter, value) {
        this.props.toggleFilter(this.props.table, filter, value);
    }

    render() {
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
                    updateFilterList={this.updateFilterList} />
                <SubmissionIdFilter
                    updateFilterList={this.updateFilterList} />
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

DashboardFilters.propTypes = propTypes;
DashboardFilters.defaultProps = defaultProps;
