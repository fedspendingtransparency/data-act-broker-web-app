/**
* LandingContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class LandingContent extends React.Component {
    render() {
        return (
            <div>
                <div className="usa-da-content-dark">
                    <div className="container">
                        <div className="row usa-da-content-landing usa-da-page-title">
                            <div className="col-md-7">
                                <h1>Welcome to the Data Broker</h1>
                                <p>This site enables you to upload your agency files and validate them against the latest
                                    version of the DATA Act Schema (version 0.8). The files you will need are:</p>
                                <ul>
                                    <li>File A: Appropriations Account</li>
                                    <li>File B: Program Activity and Object Class</li>
                                    <li>File C: Award and Financial</li>
                                    <li>File D: Award</li>
                                </ul>

                                <p>Details on how to format your data, including required and optional fields, can be
                                    found in the Reporting Submission Specification (RSS). You can <a href="/docs/RSS_v0.7.2.1_AlphaBroker.xlsx" target="_blank">download the RSS here.</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row usa-da-button-holder">
                            <div className="col-md-6">
                                <a className="usa-da-button-big" href="#/addData">Add &#38; Validate New Data</a>
                            </div>
                            <div className="col-md-6">
                                <a className="usa-da-button-big disabled" href="#">Performance Dashboard
                                    <div><em>Coming Soon</em></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
