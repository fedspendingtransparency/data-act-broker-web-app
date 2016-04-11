/**
* SubmissionPageHeader.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class AddDataHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark">
                <div className="container">
                    <div className="row usa-da-content-add-data usa-da-page-title">
                        <div className="col-md-7 mt-40 mb-50">
                            <div className="display-2">Add New Data</div>
                            <p>The current DATA Act Broker allows agencies to test financial data and is not connected to USA Spending.</p>
                            <p>Upload your files below. For more information on the file format, please <a href="http://prod-data-act-web-static-files.s3-website-us-gov-west-1.amazonaws.com/RSS-spec/RSS_DRAFT_v1.0_03292016.xlsx" target="_blank">download the Reporting Submission Specification (RSS)</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
