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
                            <p>The current DATA Act Broker allows agencies to upload and test their data as it is required under the DATA Act. It is not connected to USAspending. To get started, you will need the following files:
                                    <li>A: Appropriation Data (<em><a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/appropValid.csv" target="_blank">Sample file</a></em>)</li>
                                    <li>B: Program Activity and Object Class Data (<em><a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/programActivityValid.csv" target="_blank">Sample file</a></em>)</li>
                                    <li>C: Award Financial Data (<em><a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardFinancialValid.csv" target="_blank">Sample file</a></em>)</li>
                                    <li>D: Financial Assistance Award File (<em><a href="https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/awardValid.csv" target="_blank">Sample file</a></em>) <br />*<em style={{fontSize: '.8em'}}>The D file will be generated for users in future broker versions. Agencies must still upload a D file currently. If you do not have this data, simply submit the sample file.</em></li>

                            </p>
                            <p>Upload your files below. For more information on the file format, please <a href="http://prod-data-act-web-static-files.s3-website-us-gov-west-1.amazonaws.com/RSS-spec/RSS_DRAFT_v1.0_03292016.xlsx" target="_blank">download the Reporting Submission Specification (RSS)</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
