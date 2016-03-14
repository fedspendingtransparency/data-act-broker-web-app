/**
* SubmissionPageHeader.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class SubmissionPageHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data usa-da-page-title">
                        <div className="col-md-6">
                            <h1>Add New Data</h1>
                            <p>The alpha Data Broker allows agencies to test financial data and is not connected to USA Spending.</p>
                            <p>Upload your files below. For more information on the file format,
                                please <a href="/docs/RSS_v0.7.2.1_AlphaBroker.xlsx" target="_blank">download the Reporting Specification</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
