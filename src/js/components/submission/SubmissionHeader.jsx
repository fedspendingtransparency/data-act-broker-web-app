/**
* SubmissionHeader.jsx
* Created by Lizzie Salita 2/20/20
*/

import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
    last_updated: PropTypes.string,
    agency_name: PropTypes.string,
    reporting_period: PropTypes.string
};

const SubmissionHeader = ({last_updated='', agency_name='', reporting_period=''}) => {
    const formattedTime = moment.utc(last_updated).local().format('MM/DD/YYYY h:mm a');
    const submissionContext = last_updated || agency_name || reporting_period ? (
        <div className="last-updated">
            Last Saved: {formattedTime}
            <br />
            {agency_name}
            <br />
            Reporting Period (FY): {reporting_period}
        </div>
    ) : null;

    return (
        <div className="usa-da-content-dark">
            <div className="container">
                <div className="row usa-da-content-add-data usa-da-page-title flex-center-content-only-height">
                    <div className="col-md-10 mt-40 mb-20">
                        <h1 className="display-2" data-contentstart="start">
                            Upload & Validate a New Submission
                        </h1>
                    </div>
                    <div className="col-md-2">
                        {submissionContext}
                    </div>
                </div>
            </div>
        </div>
    );
};

SubmissionHeader.propTypes = propTypes;
export default SubmissionHeader;
