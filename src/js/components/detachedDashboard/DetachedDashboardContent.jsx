/**
  * DetachedDashboardContent.jsx
  * Created by Daniel Boos 6/29/17
  **/

import React from 'react';
import DetachedDashboardTable from './DetachedDashboardTable.jsx';

export default class DetachedDashboardContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="table-title">Active Submissions</h2>
                        <DetachedDashboardTable
                            isLoading={this.props.activeLoading}
                            isCertified={false}
                            loadTableData={this.props.loadTableData}
                            total={this.props.activeTotal}
                            data={this.props.activeSubmissions}
                            page={1}
                            session={this.props.session} />
                        <DetachedDashboardTable
                            isLoading={this.props.certifiedLoading}
                            isCertified={true}
                            loadTableData={this.props.loadTableData}
                            total={this.props.certifiedTotal}
                            data={this.props.certifiedSubmissions}
                            page={1}
                            session={this.props.session} />
                    </div>
                </div>
            </div>
        );
    }
}