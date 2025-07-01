/**
 * SubmissionGuideContent.jsx
 * Created by Mike Bray 5/19/16
 */

import React from 'react';
import PropTypes from 'prop-types';

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

        this.toggleSkipGuide = this.toggleSkipGuide.bind(this);
        this.nextClicked = this.nextClicked.bind(this);
    }

    toggleSkipGuide() {
        this.setState({ skipGuide: !(this.state.skipGuide) });
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
                                            Provide Data Broker with information about the submission you&#39;ll be
                                            creating. This information includes the name of your agency and the
                                            reporting period.
                                        </p>
                                        <p>
                                            <b>
                                                Test submissions are automatically deleted if they remain unedited for
                                                a period of 6 months.
                                            </b>
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
                                        You will need to prepare File B &amp; C internally to complete your submission.
                                        Data Broker will generate File A. You can upload a custom File A after the
                                        initial submission. Data Broker supports comma-separated .csv or pipe-delimited
                                        .txt UTF-8 file formats.
                                        </p>
                                        <ul>
                                            <li>File A: Appropriation Account data.</li>
                                            <li>File B: Object Class and Program Activity.</li>
                                            <li>File C: Award Financial data.</li>
                                        </ul>
                                        <p>
                                            <strong>
                                                Files D1, D2, E, and F will be generated for you by Data Broker.
                                            </strong>
                                        </p>
                                        <ul>
                                            <li>File D1: Award and Awardee Attributes (Procurement Award) data.</li>
                                            <li>File D2: Award and Awardee Attributes (Financial Assistance) data.</li>
                                            <li>File E: Additional Awardee Attributes data.</li>
                                            <li>File F: Sub-award Attributes data.</li>
                                        </ul>
                                        <p>
                                            Submission information, including sample files and explanations of how Files
                                            A, D1, D2, E and F are generated, is available on the&nbsp;
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://tfx.treasury.gov/data-transparency/gsdm">
                                                GSDM
                                            </a>
                                            &nbsp;page of the Data Transparency site for the Bureau of the Fiscal
                                            Service.
                                        </p>
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
                                            In this step, Data Broker will validate your submitted files separately,
                                            and all files (including D1 and D2) against each other. All files must be
                                            present to perform cross-file validations.
                                        </p>
                                        <p>
                                            <a
                                                href={`https://github.com/fedspendingtransparency/data-act-broker-` +
                                                    `backend/tree/master/dataactvalidator/config/sqlrules`}
                                                target="_blank"
                                                rel="noopener noreferrer">
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
                                                    onChange={this.toggleSkipGuide}
                                                    defaultChecked={this.props.session.skipGuide} />
                                                    Hide this page next time I submit files.
                                            </label>
                                        </div>
                                        <div className="col-xs-4 col-md-6">
                                            <button
                                                type="button"
                                                className="usa-da-button btn-primary btn-lg pull-right"
                                                onClick={this.nextClicked}>
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
