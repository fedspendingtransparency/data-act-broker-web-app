/**
  * DashboardContent.jsx
  * Created by Kevin Li 10/27/16
  */

import React, { PropTypes } from 'react';
import DashboardTable from './DashboardTable';
import DashboardFilters from "./DashboardFilters";
import FiltersMessage from "./filters/FiltersMessage";

const propTypes = {
    loadTableData: PropTypes.func,
    session: PropTypes.object,
    activeSubmissions: PropTypes.array,
    certifiedSubmissions: PropTypes.array,
    type: PropTypes.string,
    activeTotal: PropTypes.number,
    certifiedTotal: PropTypes.number,
    activeLoading: PropTypes.bool,
    certifiedLoading: PropTypes.bool,
    updateDashboardFilter: PropTypes.func,
    toggleDashboardFilter: PropTypes.func,
    resetDashboardFilters: PropTypes.func,
    currentFilters: PropTypes.object
};

const defaultProps = {
    loadTableData: null,
    session: null,
    activeSubmissions: [],
    certifiedSubmissions: [],
    type: '',
    activeTotal: 0,
    certifiedTotal: 0,
    activeLoading: false,
    certifiedLoading: false,
    updateDashboardFilter: null,
    toggleDashboardFilter: null,
    resetDashboardFilters: null,
    currentFilters: {}
};

export default class DashboardContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            certifiedPage: 1,
            title: this.props.type === 'fabs' ? 'Published Submissions' : 'Certified Submissions'
        };

        this.resetFilters = this.resetFilters.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.generateMessage = this.generateMessage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.setState({
                title: nextProps.type === 'fabs' ? 'Published Submissions' : 'Certified Submissions'
            });
        }
    }

    resetFilters(table) {
        this.props.resetDashboardFilters({
            dashboard: this.props.type,
            table
        });
    }

    updateFilter(table, filter, value) {
        this.props.updateDashboardFilter({
            dashboard: this.props.type,
            table,
            filter,
            value
        });
    }

    toggleFilter(table, filter, value) {
        this.props.toggleDashboardFilter({
            dashboard: this.props.type,
            table,
            filter,
            value
        });
    }

    calculateFilterCount(currentFilters) {
        let count = 0;
        const filterLists = ['agencies', 'fileNames', 'submissionIds', 'createdBy'];

        for (let i = 0; i < filterLists.length; i++) {
            const filter = filterLists[i];
            count += currentFilters[filter].length;
        }
        if (currentFilters.lastModified.startDate || currentFilters.lastModified.endDate) {
            count += 1;
        }

        return count;
    }

    generateMessage(count, currentFilters) {
        if (count > 0) {
            return (
                <FiltersMessage
                    filterCount={count}
                    currentFilters={currentFilters} />
            );
        }
        return null;
    }

    render() {
        const currentFilters = this.props.currentFilters[this.props.type];
        const secondTable = `${this.props.type === 'fabs' ? 'published' : 'certified'}`;

        const activeFilterCount = this.calculateFilterCount(currentFilters.active);
        const secondFilterCount = this.calculateFilterCount(currentFilters[secondTable]);

        const activeMessage = this.generateMessage(activeFilterCount, currentFilters.active);
        const secondMessage = this.generateMessage(secondFilterCount, currentFilters[secondTable]);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-heading">
                            <h2 className="table-heading__title">Active Submissions</h2>
                            {activeMessage}
                        </div>
                        <DashboardFilters
                            updateFilter={this.updateFilter}
                            toggleFilter={this.toggleFilter}
                            resetFilters={this.resetFilters}
                            currentFilters={currentFilters.active}
                            type={this.props.type}
                            table="active"
                            filterCount={activeFilterCount} />
                        <DashboardTable
                            isLoading={this.props.activeLoading}
                            isCertified={false}
                            loadTableData={this.props.loadTableData}
                            total={this.props.activeTotal}
                            data={this.props.activeSubmissions}
                            page={this.state.activePage}
                            session={this.props.session}
                            type={this.props.type} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-heading">
                            <h2 className="table-heading__title">{this.state.title}</h2>
                            {secondMessage}
                        </div>
                        <DashboardFilters
                            updateFilter={this.updateFilter}
                            toggleFilter={this.toggleFilter}
                            resetFilters={this.resetFilters}
                            currentFilters={currentFilters[secondTable]}
                            table={secondTable}
                            type={this.props.type}
                            filterCount={secondFilterCount} />
                        <DashboardTable
                            isLoading={this.props.certifiedLoading}
                            loadTableData={this.props.loadTableData}
                            total={this.props.certifiedTotal}
                            data={this.props.certifiedSubmissions}
                            page={this.state.certifiedPage}
                            session={this.props.session}
                            type={this.props.type} />
                    </div>
                </div>
            </div>
        );
    }
}

DashboardContent.propTypes = propTypes;
DashboardContent.defaultProps = defaultProps;
