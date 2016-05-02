/**
 * ReviewDataContent.jsx
 * Created by Mike Bray 3/28/16
 **/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import SubmitButton from '../SharedComponents/SubmitButton.jsx';
import ReviewDataContentRow from './ReviewDataContentRow.jsx';
import ReviewDataButton from './ReviewDataButton.jsx';
import moment from 'moment';
import Request from 'superagent';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: null,
            agency_name: null,
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_errors: null,
            number_of_rows: null,
            created_on: null,
            ready: false
        };
    }

    getSubmissionData() {
        ReviewHelper.fetchStatus(this.props.submissionID)
            .then((data) => {
                data.ready = true;
                this.setState(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getSubmissionData();
    }

    render() {
        if (this.state.ready) {
            // The first parameter in each of these arrays is the corresponding class for the SVG icon
            const buttonContent = [[<Icons.CheckCircle />,'Publish this data to USAspending.gov'],
                                    [<Icons.ShareSquare />,'Send this data to another Data Broker user'],
                                    [<Icons.CloudDownload />,'Download this data to your computer'],
                                    [<Icons.Trash />,'Delete this data from the Data Broker']];

            let buttons = [];
            for (let i = 0; i < buttonContent.length; i++){
                buttons.push(<ReviewDataButton key={i} icon={buttonContent[i][0]} label={buttonContent[i][1]} />);
            }

            const reportName = this.state.agency_name.replace(/ /g,'_') + '_' + moment(this.state.created_on, 'MM/DD/YYYY').format('DDMMYYYY')  + '_' + this.props.submissionID;
            let fileSize = 0;

            for (let k = 0; k < this.state.jobs.length; k++){
                fileSize += this.state.jobs[k].file_size;
            }

            const reportLabels = ['Report Name:', 'Period Start Date:', 'Period End Date:', 'Total File Size:', 'Created On:', 'Total Critical Errors:', 'Total Warnings:', 'Total Rows:', 'Incurred Obligations:', 'Financial Assistance Obligations:', 'Procurement Obligations:'];

            const reportData = [reportName,
                this.state.reporting_period_start_date,
                this.state.reporting_period_end_date,
                fileSize,
                this.state.created_on,
                this.state.number_of_errors,
                0,
                this.state.number_of_rows,
                'Coming Soon',
                'Coming Soon',
                'Coming Soon'
            ];

            let reportRows = [];

            for (let j = 0; j < reportLabels.length; j++){
                reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={reportData[j]} />);
            }

            return (
                <div className="container">
                    <div className="row center-block mt-60">
                        <div className="col-md-12 text-center mb-30">
                            <h5 className="text-success">Congratulations your data has been successfully validated! Now, what would you like to do with it?</h5>
                        </div>
                    </div>
                    <div className="row center-block usa-da-review-data-content-holder">
                        <div className="col-md-5 mt-15">
                            {buttons}
                        </div>
                        <div className="col-md-7 usa-da-review-data-alternating-rows">
                            {reportRows}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h4>Gathering data...</h4>
                </div>
            );
        }
    }
}

ReviewDataContent.propTypes = propTypes;
