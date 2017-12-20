/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import ReviewDataContentRow from './ReviewDataContentRow';
import ReviewDataButton from './ReviewDataButton';
import ReviewDataNotifyModal from './ReviewDataNotifyModal';
import ReviewDataCertifyModal from './CertificationModal/ReviewDataCertifyModal';
import RevalidateDataModal from './CertificationModal/RevalidateDataModal';
import ReviewDataNarrative from './ReviewDataNarrative';
import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    data: PropTypes.object,
    params: PropTypes.object,
    session: PropTypes.object,
    submissionID: PropTypes.string
};

const defaultProps = {
    data: null,
    params: null,
    session: null,
    submissionID: ''
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openNotify: false,
            openCertify: false,
            openRevalidate: false,
            calculatedData: {
                totalSize: '0 KB',
                totalWarnings: 0
            }
        };
    }

    componentDidMount() {
        this.calculateFields();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.submissionID !== this.props.submissionID) {
            this.calculateFields();
        }
    }

    openModal(type, e) {
        e.preventDefault();

        this.setState({
            ['open' + type]: true
        });
    }

    closeModal(type, e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            ['open' + type]: false
        });
    }


    disabledLink(e) {
        e.preventDefault();
    }

    calculateFields() {
        let totalSize = 0;
        let totalWarnings = 0;

        this.props.data.jobs.forEach((job) => {
            if (parseFloat(job.file_size) > 0) {
                totalSize += parseFloat(job.file_size);
            }

            // sum the number of warnings
            job.warning_data.forEach((warning) => {
                totalWarnings += parseInt(warning.occurrences, 10);
            });
        });

        let displaySize = totalSize + ' bytes';
        if (totalSize >= 750000) {
            displaySize = (Math.round((totalSize / 100000000) * 100) / 100) + ' MB';
        }
        else if (totalSize >= 750) {
            displaySize = (Math.round((totalSize / 1000) * 100) / 100) + ' KB';
        }

        this.setState({
            totalSize: displaySize,
            totalWarnings
        });
    }

    formatCurrency(currencyNumber) {
        const negative = currencyNumber < 0;
        let currencyString = currencyNumber.toFixed(2);
        // remove negative sign for formatting
        if (negative) {
            currencyString = currencyString.substr(1);
        }
        const cents = currencyString.split(".")[1];
        let dollars = currencyString.split(".")[0];
        // start at the end and every 3 numbers add a comma to the string
        for (let i = dollars.length - 3; i > 0; i -= 3) {
            dollars = dollars.slice(0, i) + "," + dollars.slice(i);
        }
        let formattedCurrencyString = "$" + dollars + "." + cents;
        // add negative sign for formatting
        if (negative) {
            formattedCurrencyString = "-" + formattedCurrencyString;
        }
        return formattedCurrencyString;
    }

    checkAffiliations() {
        const affiliations = this.props.session.user.affiliations;
        for (let i = 0; i < affiliations.length; i++) {
            if (affiliations[i].agency_name === this.props.data.agency_name) {
                if (affiliations[i].permission === 'submitter') {
                    return true;
                }
            }
        }
        return false;
    }

    windowBlocked() {
        if (!this.props.data.window) {
            return false;
        }
        let currentWindow = null;
        for (let i = 0; i < this.props.data.window.length; i++) {
            if (this.props.data.window[i].notice_block) {
                if (currentWindow === null) {
                    currentWindow = this.props.data.window[i];
                }
                else if (moment(this.props.data.window[i].end_date) > moment(currentWindow.end_date)) {
                    currentWindow = this.props.data.window[i];
                }
            }
        }
        if (currentWindow) {
            return currentWindow;
        }
        return false;
    }

    render() {
        let modalToOpen = 'Certify';
        if (!this.props.data.last_validated || new Date(this.props.data.last_validated) <
            new Date(this.props.data.revalidation_threshold)) {
            modalToOpen = 'Revalidate';
        }

        // The first parameter in each of these arrays is the corresponding class for the SVG icon
        const buttonContent = [[<Icons.CheckCircle />, 'Publish this data to USAspending.gov'],
            [<Icons.ShareSquare />, 'Send this data to another Data Broker user'],
            [<Icons.CloudDownload />, 'Download this data to your computer'],
            [<Icons.Trash />, 'Delete this data from the Data Broker']];

        const buttons = [];
        for (let i = 0; i < buttonContent.length; i++) {
            buttons.push(<ReviewDataButton key={i} icon={buttonContent[i][0]} label={buttonContent[i][1]} />);
        }

        const reportLabels = ['Agency Name:', 'Report Start Date:', 'Report End Date:',
            'Award Obligations Incurred (file C):', 'Total Financial Assistance Obligations:',
            'Total Procurement Obligations:'];

        const reportData = [
            this.props.data.agency_name,
            this.props.data.reporting_period_start_date,
            this.props.data.reporting_period_end_date,
            this.formatCurrency(this.props.data.total_obligations),
            this.formatCurrency(this.props.data.total_assistance_obligations),
            this.formatCurrency(this.props.data.total_procurement_obligations)
        ];

        const reportRows = [];

        for (let j = 0; j < reportLabels.length; j++) {
            reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
        }

        let certifyButtonText = "You do not have permissions to certify";
        let notifyButtonText = "Notify Another User that the Submission is Ready for Certification";
        let buttonClass = " btn-disabled";
        let buttonAction = "";
        let monthlySubmissionError = null;
        const blockedWindow = this.windowBlocked();

        if (this.props.data.publish_status === "published") {
            certifyButtonText = "Submission has already been certified";
        }
        else if (!this.props.data.quarterly_submission) {
            certifyButtonText = "Monthly submissions cannot be certified";
            notifyButtonText = "Notify Another User that the Submission is Ready";
            monthlySubmissionError = (
                <div
                    className="alert alert-danger text-center monthly-submission-error"
                    role="alert">
                    Monthly submissions cannot be certified
                </div>);
        }
        else if (blockedWindow) {
            certifyButtonText = "You cannot certify until " +
                moment(blockedWindow.end_date).format("dddd, MMMM D, YYYY");
        }
        else if (this.checkAffiliations() || this.props.session.admin) {
            certifyButtonText = "Certify & Publish the Submission to USAspending.gov";
            buttonClass = "";
            buttonAction = this.openModal.bind(this, modalToOpen);
        }

        return (
            <div className="container">
                <div className="row center-block mt-60">
                    <div className="col-md-12 text-center">
                        <h5 data-testid="review-header">
                            Congratulations your data has been successfully validated!
                            Now, what would you like to do with it?
                        </h5>
                    </div>
                </div>
                <div className="center-block usa-da-review-data-content-holder">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="usa-da-file-wrap">
                                <div className="usa-da-icon usa-da-icon-CheckCircle">
                                    <Icons.CheckCircle />
                                </div>
                                <div className="usa-da-submission-info">
                                    <ul className="no-bullet">
                                        <li>Total File Size: <strong>{this.state.totalSize}</strong></li>
                                        <li>Total Rows: <strong>{this.props.data.number_of_rows}</strong></li>
                                        <li>Created on: <strong>{this.props.data.created_on}</strong></li>
                                        <li>Total Warnings: <strong>{this.state.totalWarnings}</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 usa-da-review-data-alternating-rows">
                            {reportRows}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4" />
                        <ReviewDataNarrative
                            narrative={this.props.data.file_narrative}
                            submissionID={this.props.params.submissionID} />
                    </div>
                    <div className="mt-20">
                        <div className="submission-wrapper">
                            <div className="left-link">
                                <button
                                    onClick={buttonAction}
                                    className={"usa-da-button btn-primary btn-lg btn-full " + buttonClass}>
                                    <div className="button-wrapper">
                                        <div className="button-icon">
                                            <Icons.Globe />
                                        </div>
                                        <div className="button-content">
                                            {certifyButtonText}
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="right-link">
                                <button
                                    onClick={this.openModal.bind(this, 'Notify')}
                                    className="usa-da-button btn-primary btn-lg btn-full last">
                                    <div className="button-wrapper">
                                        <div className="button-icon">
                                            <Icons.Bell />
                                        </div>
                                        <div className="button-content">
                                            {notifyButtonText}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        {monthlySubmissionError}
                    </div>

                    <div id="reviewDataNotifyModalHolder">
                        <ReviewDataNotifyModal
                            {...this.props}
                            closeModal={this.closeModal.bind(this, 'Notify')}
                            isOpen={this.state.openNotify} />
                    </div>
                    <div id="reviewDataCertifyModalHolder">
                        <ReviewDataCertifyModal
                            {...this.props}
                            closeModal={this.closeModal.bind(this, 'Certify')}
                            isOpen={this.state.openCertify}
                            warnings={this.state.totalWarnings} />
                    </div>
                    <div id="revalidateDataModalHolder">
                        <RevalidateDataModal
                            {...this.props}
                            closeModal={this.closeModal.bind(this, 'Revalidate')}
                            isOpen={this.state.openRevalidate} />
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataContent.propTypes = propTypes;
ReviewDataContent.defaultProps = defaultProps;
