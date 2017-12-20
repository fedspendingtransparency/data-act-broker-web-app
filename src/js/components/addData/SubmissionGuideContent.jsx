/**
 * SubmissionGuideContent.jsx
 * Created by Mike Bray 5/19/16
 */

import React, { PropTypes } from 'react';
import Banner from '../SharedComponents/Banner';

const propTypes = {
    saveSkipGuide: PropTypes.func,
    session: PropTypes.object
};

const defaultProps = {
    saveSkipGuide: null,
    session: null
};

export default class SubmissionGuideContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skipGuide: props.session.skipGuide
        };
    }

    toggleSkipGuide() {
        this.setState({ skipGuide: !(this.state.skipGuide) });
    }

    nextClicked() {
        this.props.saveSkipGuide(this.state.skipGuide);
    }

    render() {
        const aws = "https://s3-us-gov-west-1.amazonaws.com/prod-data-act-web-static-files/sample-files/";
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
                <Banner type="dabs" />
                <div className="container usa-da-submission-guide">
                    <div className="row text-center">
                        <div className="col-md-12 mt-60">
                            <h5>Four Steps to Upload and Validate Agency Data</h5>
                        </div>
                    </div>
                    <div className="row submission-guide-holder">
                        <div className="col-md-offset-2 col-md-8">
                            <div className="row">
                                <div className="col-md-12 usa-da-steps-line first-step">
                                    <div className="col-md-1 usa-da-submission-guide-step">
                                        <span className="submission-guide-step-number first-step">1</span>
                                    </div>
                                    <div className="col-md-11 usa-da-reg-wrapper">
                                        <h4>Submission Info</h4>
                                        <p>
                                            Provide the DATA Act Broker with information about the submission you’ll be
                                            creating. This information includes the name of your agency and the
                                            reporting period.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 usa-da-steps-line">
                                    <div className="col-md-1 usa-da-submission-guide-step">
                                        <span className="submission-guide-step-number">2</span>
                                    </div>
                                    <div className="col-md-11 usa-da-reg-wrapper mt-20">
                                        <h4>Upload Files (.csv or .txt)</h4>
                                        <p>
                                            You'll need the following files to complete your submission. Files A, B, and
                                            C can be provided as comma-separate values (.csv) or pipe-separated values
                                            (.txt). Sample files are available for download in the DATA Act Broker.
                                        </p>
                                        <ul>
                                            <li>File A: Appropriation Account data.
                                                <a
                                                    href={aws + "appropValid.csv"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-reactid=".0.0.1.0.0.0.1.1.1.0">
                                                    (Sample file)
                                                </a>
                                            </li>
                                            <li>File B: Object Class and Program Activity.
                                                <a
                                                    href={aws + "programActivityValid.csv"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-reactid=".0.0.1.0.0.0.1.2.1.0">
                                                    (Sample file)
                                                </a>
                                            </li>
                                            <li>File C: Award Financial data.
                                                <a
                                                    href={aws + "awardFinancialValid.csv"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-reactid=".0.0.1.0.0.0.1.3.1.0">
                                                    (Sample file)
                                                </a>
                                            </li>
                                        </ul>
                                        <p>
                                            <strong>
                                                Files D1, D2, E, and F will be generated for you based on the
                                                reporting period you provide.
                                            </strong>
                                        </p>
                                        <ul>
                                            <li>File D1: Award and Awardee Attributes (Procurement Award) data.</li>
                                            <li>File D2: Award and Awardee Attributes (Financial Assistance) data.
                                                <a
                                                    href={aws + "awardValid.csv"}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-reactid=".0.0.1.0.0.0.1.4.1.0">
                                                    (Sample file)
                                                </a>
                                            </li>
                                            <li>File E: Additional Awardee Attributes data.</li>
                                            <li>File F: Sub-award Attributes data.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 usa-da-steps-line">
                                    <div className="col-md-1 usa-da-submission-guide-step">
                                        <span className="submission-guide-step-number">3</span>
                                    </div>
                                    <div className="col-md-11 usa-da-reg-wrapper mt-20">
                                        <h4>Validate Data Files</h4>
                                        <p>
                                            In this step, the DATA Act Broker will validate your submitted files
                                            separately, and all files (including D1 and D2) against each other.
                                            All files must be present to perform cross-file validations.
                                        </p>
                                        <p>
                                            <a href="#/validations">
                                                Find out what validations are currently implemented
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 usa-da-steps-line last-step">
                                    <div className="col-md-1 usa-da-submission-guide-step">
                                        <span className="submission-guide-step-number">4</span>
                                    </div>
                                    <div className="col-md-11 usa-da-reg-wrapper mt-20">
                                        <h4>Review, Certify, and Publish</h4>
                                        <p>
                                            Once your submission has successfully passed validation, this step allows
                                            you to:
                                        </p>
                                        <ul>
                                            <li>
                                                Notify another user that the submission is ready for them to review,
                                                certify, and publish.
                                            </li>
                                            <li>
                                                Review, certify, and publish your agency’s data.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-offset-1 col-md-11 mt-20">
                                    <div className="row submitStep">
                                        <div className="col-xs-8 col-md-6 submission-guide-hide checkbox">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    value="skipGuide"
                                                    onChange={this.toggleSkipGuide.bind(this)}
                                                    defaultChecked={this.props.session.skipGuide} />
                                                    Hide this page next time I submit files.
                                            </label>
                                        </div>
                                        <div className="col-xs-4 col-md-6">
                                            <button
                                                type="button"
                                                className="usa-da-button btn-primary btn-lg pull-right"
                                                onClick={this.nextClicked.bind(this)}>
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionGuideContent.propTypes = propTypes;
SubmissionGuideContent.defaultProps = defaultProps;
