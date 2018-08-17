/**
 * DashboardFilters.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, { PropTypes } from 'react';

import { Filter } from '../../components/SharedComponents/icons/Icons';
import FilterSubmitContainer from '../../containers/dashboard/FilterSubmitContainer';
import SubmissionIdFilter from './filters/SubmissionIdFilter';

const propTypes = {
    updateFilter: PropTypes.func,
    toggleFilter: PropTypes.func,
    resetFilters: PropTypes.func,
    stagedFilters: PropTypes.object,
    table: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    updateFilter: null,
    toggleFilter: null,
    resetFilters: null,
    stagedFilters: {},
    table: '',
    type: ''
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
        return (
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
        );
    }
}

DashboardFilters.propTypes = propTypes;
DashboardFilters.defaultProps = defaultProps;
