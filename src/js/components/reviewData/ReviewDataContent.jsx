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

const propTypes = {
    submissionID: PropTypes.string
};

export default class ReviewDataContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        // TODO: Check if data exists and replace logic
        if (1 > 0) {
            const buttonContent = [['globe','Publish this data to USASpending.gov'],
                                    ['share','Send this data to another Data Broker user'],
                                    ['save','Download this data to your computer'],
                                    ['trash','Delete this data from the Data Broker']];

            let buttons = [];

            for (let i = 0; i < buttonContent.length; i++){
                buttons.push(<ReviewDataButton key={i} icon={buttonContent[i][0]} label={buttonContent[i][1]} />);
            }

            // agency_name
            // reporting_period_start_date
            // reporting_period_end_date
            // loop through jobs[file_size]
            // now()
            // number_of_errors
            // 0
            // number_of_rows

            const reportLabels = ['Report Name:', 'Period Start Date:', 'Period End Date:', 'Total File Size:', 'Created On:', 'Total Critical Errors:', 'Total Warnings:', 'Total Rows:'];
            const data = ['AgencyName', '03/31/2016', '03/31/2016', 1234, moment(Date.now()).format('DD/MM/YYYY'), 54, 0, 446];

            let reportRows = [];

            for (let j = 0; j < reportLabels.length; j++){
                reportRows.push(<ReviewDataContentRow key={j} label={reportLabels[j]} data={data[j]} />);
            }

            return (
                <div className="container">
                    <div className="row center-block">
                        <div className="col-md-12 text-center">
                            <h3>Congratulations your data has been successfully validated! Now, what would you like to do with it?</h3>
                        </div>
                    </div>
                    <div className="row center-block usa-da-review-data-content-holder">
                        <div className="col-md-5">
                            {buttons}
                        </div>
                        <div className="col-md-offset-1 col-md-6 usa-da-review-data-alternating-rows">
                            {reportRows}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Gathering data...</h4>
                </div>
            );
        }
    }
}

ReviewDataContent.propTypes = propTypes;
