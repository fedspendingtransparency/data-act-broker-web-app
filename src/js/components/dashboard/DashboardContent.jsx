/**
  * DashboardContent.jsx
  * Created by Kevin Li 10/27/16
  */

import React, { PropTypes } from 'react';
import DashboardTable from './DashboardTable';
import DashboardFilters from "./DashboardFilters";

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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.setState({
                title: nextProps.type === 'fabs' ? 'Published Submissions' : 'Certified Submissions'
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="table-title">Active Submissions</h2>
                        <DashboardFilters
                            updateDashboardFilter={this.props.updateDashboardFilter}
                            resetDashboardFilters={this.props.resetDashboardFilters}
                            currentFilters={this.props.currentFilters} />
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
                        <h2 className="table-title">{this.state.title}</h2>
                        <DashboardFilters
                            updateDashboardFilter={this.props.updateDashboardFilter}
                            resetDashboardFilters={this.props.resetDashboardFilters}
                            currentFilters={this.props.currentFilters} />
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
