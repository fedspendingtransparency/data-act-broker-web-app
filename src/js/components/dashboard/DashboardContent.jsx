/**
  * DashboardContent.jsx
  * Created by Kevin Li 10/27/16
  **/

import React from 'react';
import DashboardTable from './DashboardTable.jsx';

export default class DashboardContent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="table-title">Active Submissions</h2>
                        <DashboardTable />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="table-title">Certified Submissions</h2>
                        
                    </div>
                </div>
            </div>
        );
    }
}