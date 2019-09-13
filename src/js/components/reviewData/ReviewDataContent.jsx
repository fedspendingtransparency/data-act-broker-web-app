/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReviewDataContentRow from './ReviewDataContentRow';
import ReviewDataButton from './ReviewDataButton';
import ReviewDataNotifyModal from './ReviewDataNotifyModal';
import ReviewDataCertifyModal from './CertificationModal/ReviewDataCertifyModal';
import RevalidateDataModal from './CertificationModal/RevalidateDataModal';
import ReviewDataNarrative from './ReviewDataNarrative';
import * as Icons from '../SharedComponents/icons/Icons';

import * as UtilHelper from '../../helpers/util';

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
            openRevalidate: false
        };
    }

    openModal(type, e) {
        e.preventDefault();

        this.setState({
            [`open${type}`]: true
        });
    }

    closeModal(type, e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            [`open${type}`]: false
        });
    }


    disabledLink(e) {
        e.preventDefault();
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
            dollars = `${dollars.slice(0, i)},${dollars.slice(i)}`;
        }
        let formattedCurrencyString = `$${dollars}.${cents}`;
        // add negative sign for formatting
        if (negative) {
            formattedCurrencyString = `-${formattedCurrencyString}`;
        }
        return formattedCurrencyString;
    }

    checkAffiliations(affil) {
        const affiliations = this.props.session.user.affiliations;
        for (let i = 0; i < affiliations.length; i++) {
            if (affiliations[i].agency_name === this.props.data.agency_name) {
                if (affiliations[i].permission === affil) {
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
            this.props.data.reporting_period,
            this.props.data.reporting_period,
            this.formatCurrency(this.props.data.total_obligations),
            this.formatCurrency(this.props.data.total_assistance_obligations),
            this.formatCurrency(this.props.data.total_procurement_obligations)
        ];

        const reportRows = [];

        for (let j = 0; j < reportLabels.length; j++) {
            reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
        }

        let certifyButtonText = "You do not have permissions to certify";
        let revalidateButtonText = "You do not have permission to revalidate";
        let buttonClass = " btn-disabled";
        let certifyButtonAction = "";
        let revalidateButtonAction = "";
        let monthlySubmissionError = null;
        // TODO: I don't think we ever actually have window data to gather, we should look into this
        const blockedWindow = this.windowBlocked();

        if (this.props.data.publish_status === "published") {
            certifyButtonText = "Submission has already been certified";
        }
        else if (!this.props.data.quarterly_submission) {
            certifyButtonText = "Monthly submissions cannot be certified";
            monthlySubmissionError = (
                <div
                    className="alert alert-danger text-center monthly-submission-error"
                    role="alert">
                    Monthly submissions cannot be certified
                </div>);
        }
        else if (blockedWindow) {
            certifyButtonText = `You cannot certify until ${
                moment(blockedWindow.end_date).format("dddd, MMMM D, YYYY")}`;
        }
        else if (this.checkAffiliations('submitter') || this.props.session.admin) {
            certifyButtonText = "Certify & Publish";
            buttonClass = "";
            certifyButtonAction = this.openModal.bind(this, 'Certify');
        }

        if (this.checkAffiliations('writer') || this.props.session.admin) {
            revalidateButtonText = "Revalidate";
            revalidateButtonAction = this.openModal.bind(this, 'Revalidate');
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
                                        <li>Total File Size:
                                            <strong> {UtilHelper.formatSize(this.props.data.total_size)}</strong>
                                        </li>
                                        <li>Total Data Rows (excludes headers):
                                            <strong> {this.props.data.number_of_rows}</strong>
                                        </li>
                                        <li>Created on: <strong>{this.props.data.created_on}</strong></li>
                                        <li>Total Warnings: <strong>{this.props.data.number_of_warnings}</strong></li>
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
                    <div className="mt-20 row">
                        <div className="col-md-4" />
                        <div className="submission-wrapper col-md-8">
                            <div className="left-link">
                                <button
                                    onClick={revalidateButtonAction}
                                    className="usa-da-button btn-primary btn-lg btn-full">
                                    <div className="button-wrapper">
                                        <div className="button-icon">
                                            <Icons.Revalidate />
                                        </div>
                                        <div className="button-content">
                                            {revalidateButtonText}
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="left-link">
                                <button
                                    onClick={certifyButtonAction}
                                    className={`usa-da-button btn-primary btn-lg btn-full ${buttonClass}`}>
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
                                            Notify Another User
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
                            warnings={this.props.data.number_of_warnings} />
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
