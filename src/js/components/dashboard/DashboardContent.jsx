/**
  * DashboardContent.jsx
  * Created by Kevin Li 10/27/16
  */

import React, { PropTypes } from 'react';
import DashboardTable from './DashboardTable.jsx';

const propTypes = {
    loadTableData: PropTypes.func,
    session: PropTypes.object,
    activeSubmissions: PropTypes.array,
    certifiedSubmissions: PropTypes.array,
    type: PropTypes.string,
    activeTotal: PropTypes.number,
    certifiedTotal: PropTypes.number,
    activeLoading: PropTypes.bool,
    certifiedLoading: PropTypes.bool
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
