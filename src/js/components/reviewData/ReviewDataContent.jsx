/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import ReviewDataContentRow from './ReviewDataContentRow.jsx';
import ReviewDataButton from './ReviewDataButton.jsx';
import ReviewDataNotifyModal from './ReviewDataNotifyModal.jsx';
import ReviewDataCertifyModal from './CertificationModal/ReviewDataCertifyModal.jsx';
import moment from 'moment';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openNotify: false,
            openCertify: false,
            calculatedData: {
                totalSize: '0 KB',
                totalWarnings: 0
            }
        };
    }

    componentDidMount() {
        this.calculateFields();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.submissionID != this.props.submissionID) {
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
                totalWarnings += parseInt(warning.occurrences);
            });
        });

        let displaySize = totalSize + ' bytes';
        if (totalSize >= 750000) {
            displaySize = (Math.round((totalSize/ 100000000) * 100) / 100) + ' MB';
        }
        else if (totalSize >= 750) {
            displaySize = (Math.round((totalSize / 1000) * 100) / 100) + ' KB';
        }

        this.setState({
            totalSize: displaySize,
            totalWarnings: totalWarnings
        });
    }

    formatCurrency(currencyNumber) {
        let negative = currencyNumber < 0;
        let currencyString = currencyNumber.toFixed(2);
        // remove negative sign for formatting
        if(negative) {
            currencyString = currencyString.substr(1);
        }
        let cents = currencyString.split(".")[1];
        let dollars = currencyString.split(".")[0];
        // start at the end and every 3 numbers add a comma to the string
        for(var i = dollars.length - 3; i > 0; i = i-3) {
            dollars = dollars.slice(0, i) + "," + dollars.slice(i);
        }
        let formattedCurrencyString = "$" + dollars + "." + cents;
        // add negative sign for formatting
        if(negative) {
            formattedCurrencyString = "-" + formattedCurrencyString;
        }
        return formattedCurrencyString;
    }

    render() {
        
        // The first parameter in each of these arrays is the corresponding class for the SVG icon
        const buttonContent = [[<Icons.CheckCircle />,'Publish this data to USAspending.gov'],
                                [<Icons.ShareSquare />,'Send this data to another Data Broker user'],
                                [<Icons.CloudDownload />,'Download this data to your computer'],
                                [<Icons.Trash />,'Delete this data from the Data Broker']];

        let buttons = [];
        for (let i = 0; i < buttonContent.length; i++){
            buttons.push(<ReviewDataButton key={i} icon={buttonContent[i][0]} label={buttonContent[i][1]} />);
        }

        const reportName = this.props.data.cgac_code.replace(/ /g,'_') + '_' + moment(this.props.data.created_on, 'MM/DD/YYYY').format('DDMMYYYY')  + '_' + this.props.submissionID;
        let fileSize = 0;

        for (let k = 0; k < this.props.data.jobs.length; k++){
            fileSize += this.props.data.jobs[k].file_size;
        }

        const reportLabels = ['Agency Name:', 'Report Start Date:', 'Report End Date:', 'Total Obligations Incurred:', 'Total Financial Assistance Obligations:', 'Total Procurement Obligations:'];

        const reportData = [
            this.props.data.agency_name,
            this.props.data.reporting_period_start_date,
            this.props.data.reporting_period_end_date,
            this.formatCurrency(this.props.data.total_obligations),
            this.formatCurrency(this.props.data.total_assistance_obligations),
            this.formatCurrency(this.props.data.total_procurement_obligations)
        ];

        let reportRows = [];

        for (let j = 0; j < reportLabels.length; j++){
            reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
        }

        return (
            <div className="container">
                <div className="row center-block mt-60">
                    <div className="col-md-12 text-center">
                        <h5 data-testid="review-header">Congratulations your data has been successfully validated! Now, what would you like to do with it?</h5>
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
                                    <ul className="usa-da-submission-bottom-links no-bullet">
                                        <li><a href="#" onClick={this.disabledLink.bind(this)}><span className="usa-da-icon usa-da-icon-CloudDownload"><Icons.CloudDownload /></span>Download</a></li>
                                        <li><a href="#" onClick={this.disabledLink.bind(this)}><span className="usa-da-icon usa-da-icon-Trash"><Icons.Trash /></span>Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 usa-da-review-data-alternating-rows">
                            {reportRows}
                        </div>
                    </div>
                    <div className="mt-20">
                        <div className="submission-wrapper">
                            <div className="left-link">
                                <button onClick={this.openModal.bind(this, 'Certify')} className="usa-da-button btn-primary btn-lg btn-full">
                                    <div className="button-wrapper">
                                        <div className="button-icon">
                                            <Icons.Globe />
                                        </div>
                                        <div className="button-content">
                                            Certify & Publish the Submission to USAspending.gov
                                        </div>
                                    </div>
                                </button>
                            </div>
                            <div className="right-link">
                                <button onClick={this.openModal.bind(this, 'Notify')} className="usa-da-button btn-primary btn-lg btn-full last">
                                    <div className="button-wrapper">
                                        <div className="button-icon">
                                            <Icons.Bell />
                                        </div>
                                        <div className="button-content">
                                            Notify Another User that the Submission is Ready for Certification
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div id="reviewDataNotifyModalHolder">
                        <ReviewDataNotifyModal {...this.props} closeModal={this.closeModal.bind(this, 'Notify')} isOpen={this.state.openNotify} />
                    </div>
                    <div id="reviewDataCertifyModalHolder">
                        <ReviewDataCertifyModal {...this.props} closeModal={this.closeModal.bind(this, 'Certify')} isOpen={this.state.openCertify} warnings={this.state.totalWarnings} />
                    </div>
                </div>
            </div>
        );
    }
}

ReviewDataContent.propTypes = propTypes;
