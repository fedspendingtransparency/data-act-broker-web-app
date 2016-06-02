/**
 * SubmissionGuideContent.jsx
 * Created by Mike Bray 5/19/16
 **/

import React from 'react';
import { hashHistory } from 'react-router';

export default class SubmissionGuideContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skipGuide: false
        };
    }

    toggleSkipGuide() {
        this.setState({skipGuide: !(this.state.skipGuide)});
    }

    nextClicked() {
        this.props.saveSkipGuide(this.state.skipGuide);
    }

    render() {
        return (
            <div className="site_content">
                <div className="usa-da-content-dark">
                    <div className="container">
                        <div className="row usa-da-page-title">
                            <div className="col-md-12 mt-40 mb-20">
                                <div className="display-2">Upload & Validate a New Submission</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container usa-da-submission-guide">
                        <div className="row text-center">
                            <div className="col-md-12 mt-60">
                                <h6 className="mb-20">Four Steps to Upload and Validate Agency Data</h6>
                            </div>
                        </div>
                        <div className="row submission-guide-holder">
                            <div className="col-md-10">
                                <div className="row submission-guide-content">
                                    <div className="col-md-4 flex-center-content-only-height submission-guide-step submission-guide-step-1">
                                        <div className="submission-guide-step-text">Submission Info</div>
                                        <span className="submission-guide-step-number">1</span>
                                    </div>
                                    <div className="col-md-8 submission-guide-instructions">
                                        <p>Provide the Data Broker with information about the submission you’ll be creating. This information includes the name of your agency and the reporting period.</p>
                                    </div>
                                </div>
                                <div className="row submission-guide-content">
                                    <div className="col-md-4 flex-center-content-only-height submission-guide-step">
                                        <div className="submission-guide-step-text">Upload Files (.csv or .txt)</div>
                                        <span className="submission-guide-step-number">2</span>
                                    </div>
                                    <div className="col-md-8 submission-guide-instructions">
                                        <p>You'll need the following files to complete your submission.<br /><br />

                                            File A: Appropriation Account data<br /> File B: Object Class and Program Activity<br /> File C: Award Financial data<br /><br />

                                            Files A, B, and C can be provided as comma-separate values (.csv) or pipe-separated values (.txt). Sample files are available for download in the Data Broker – Alpha Release.<br /><br />

                                            Files D1, D2, E, and F will be generated for you based on the reporting period you provide.<br /><br />

                                            File D1: Award and Awardee Attributes (Procurement Award) data<br /> File D2: Award and Awardee Attributes (Financial Assistance) data<br /> File E: Additional Awardee Attributes data<br /> File F: Sub-award Attributes data
                                        </p>
                                    </div>
                                </div>
                                <div className="row submission-guide-content">
                                    <div className="col-md-4 flex-center-content-only-height submission-guide-step">
                                        <div className="submission-guide-step-text">Validate Data Files</div>
                                        <span className="submission-guide-step-number">3</span>
                                    </div>
                                    <div className="col-md-8 submission-guide-instructions">
                                        <p>In this step, the Data Broker will validate the files separately and against each other. All files must be present to perform cross-file validations.</p>
                                    </div>
                                </div>
                                <div className="row submission-guide-content">
                                    <div className="col-md-4 flex-center-content-only-height submission-guide-step submission-guide-step-4">
                                        <div className="submission-guide-step-text">Review, Certify, and Publish</div>
                                        <span className="submission-guide-step-number">4</span>
                                    </div>
                                    <div className="col-md-8 submission-guide-instructions">
                                        <p>Once your submission has successfully passed validation this step allows you to:</p>
                                        <ul>
                                            <li>Notify another user that the submission is ready for them to review, certify, and publish.</li>
                                            <li>Review, certify, and publish your agency’s data.</li>
                                            <li>Download your submission to review and archive.</li>
                                            <li>Delete the submission you created in the Data Broker.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 flex-center-content submission-guide-next">
                                <div className="submission-guide-next-button">
                                    <button type="button" className="usa-da-button btn-primary" onClick={this.nextClicked.bind(this)}>Next</button>
                                </div>
                                <div className="submission-guide-hide checkbox">
                                    <label><input type="checkbox" value="skipGuide" onChange={this.toggleSkipGuide.bind(this)}/>Hide this page next time I submit files</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
