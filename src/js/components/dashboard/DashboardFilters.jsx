/**
 * DashboardFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, { PropTypes } from 'react';

import { Filter } from '../../components/SharedComponents/icons/Icons';
import FilterBar from './filters/FilterBar';
import FilterSubmitContainer from '../../containers/dashboard/FilterSubmitContainer';
import SubmissionIdFilter from './filters/SubmissionIdFilter';

const propTypes = {
    updateFilter: PropTypes.func,
    toggleFilter: PropTypes.func,
    resetFilters: PropTypes.func,
    currentFilters: PropTypes.object,
    table: PropTypes.string,
    type: PropTypes.string,
    filterCount: PropTypes.number
};

const defaultProps = {
    updateFilter: null,
    toggleFilter: null,
    resetFilters: null,
    currentFilters: {},
    table: '',
    type: '',
    filterCount: 0
};

export default class DashboardFilters extends React.Component {
    constructor(props) {
        super(props);

        this.updateFilter = this.updateFilter.bind(this);
        this.updateFilterList = this.updateFilterList.bind(this);
    }

    updateFilter(filter, value) {
        this.props.updateFilter(this.props.table, filter, value);
    }

    updateFilterList(filter, value) {
        this.props.toggleFilter(this.props.table, filter, value);
    }

    render() {
        let filterBar = null;
        if (this.props.filterCount > 0) {
            filterBar = (
                <FilterBar
                    currentFilters={this.props.currentFilters}
                    toggleFilter={this.updateFilterList} />
            );
        }
        return (
            <div className="dashboard-filters-wrapper">
                <div className="dashboard-filters">
                    <div className="dashboard-filters__label">
                        <span className="usa-da-icon filter-icon">
                            <Filter />
                        </span>
                        Filter by:
                    </div>
                    <SubmissionIdFilter
                        updateFilterList={this.updateFilterList} />
                    <FilterSubmitContainer
                        type={this.props.type}
                        table={this.props.table} />
                </div>
                {filterBar}
            </div>
        );
    }
}

DashboardFilters.propTypes = propTypes;
DashboardFilters.defaultProps = defaultProps;
