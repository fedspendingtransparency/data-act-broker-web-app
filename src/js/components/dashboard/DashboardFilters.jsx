/**
 * DashboardFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, { PropTypes } from 'react';

import { Filter } from '../../components/SharedComponents/icons/Icons';
import AgencyFilter from './filters/AgencyFilter';
import FilterBar from './filters/FilterBar';

const propTypes = {
    updateFilter: PropTypes.func,
    toggleFilter: PropTypes.func,
    resetFilters: PropTypes.func,
    currentFilters: PropTypes.object,
    table: PropTypes.string,
    filterCount: PropTypes.number
};

const defaultProps = {
    updateFilter: null,
    toggleFilter: null,
    resetFilters: null,
    currentFilters: {},
    table: '',
    filterCount: 0
};

export default class DashboardFilters extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateFilterList = this.updateFilterList.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        // TODO - Lizzie: implement submit filters
        console.log(this.props.currentFilters);
    }

    resetForm(e) {
        e.preventDefault();
        this.props.resetFilters(this.props.table);
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
                <form
                    className="dashboard-filters"
                    onSubmit={this.handleSubmit}>
                    <div className="dashboard-filters__label">
                        <span className="usa-da-icon filter-icon">
                            <Filter />
                        </span>
                        Filter by:
                    </div>
                    <AgencyFilter
                        currentAgencies={this.props.currentFilters.agencies}
                        updateFilter={this.updateFilterList} />
                    <button
                        className="dashboard-filters__reset"
                        onClick={this.resetForm}>
                        Reset Filters
                    </button>
                    <input
                        className="btn-primary dashboard-filters__submit"
                        type="submit"
                        value="Submit" />
                </form>
                {filterBar}
            </div>
        );
    }
}

DashboardFilters.propTypes = propTypes;
DashboardFilters.defaultProps = defaultProps;
