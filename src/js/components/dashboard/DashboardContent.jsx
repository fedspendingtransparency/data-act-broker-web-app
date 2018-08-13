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
    updateDashboardFilterList: PropTypes.func,
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
    certifiedLoading: false
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
        this.updateFilterList = this.updateFilterList.bind(this);
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

    updateFilterList(table, filter, value) {
        this.props.updateDashboardFilterList({
            dashboard: this.props.type,
            table,
            filter,
            value
        });
    }

    render() {
        const currentFilters = this.props.currentFilters[this.props.type];
        const secondTable = `${this.props.type === 'fabs' ? 'published' : 'certified'}`;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="table-heading">
                            <h2 className="table-heading__title">Active Submissions</h2>
                            <FiltersMessage
                                currentFilters={currentFilters.active} />
                        </div>
                        <DashboardFilters
                            updateFilter={this.updateFilter}
                            updateFilterList={this.updateFilterList}
                            resetFilters={this.resetFilters}
                            currentFilters={currentFilters.active}
                            table="active" />
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
                            <h2 className="table-title">{this.state.title}</h2>
                            <FiltersMessage
                                currentFilters={currentFilters[secondTable]} />
                        </div>
                        <DashboardFilters
                            updateFilter={this.updateFilter}
                            updateFilterList={this.updateFilterList}
                            resetFilters={this.resetFilters}
                            currentFilters={currentFilters[secondTable]}
                            table={secondTable} />
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
