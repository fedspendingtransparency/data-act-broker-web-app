/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as ReviewHelper from '../../helpers/reviewHelper';

import ReviewDataPage from '../../components/reviewData/ReviewDataPage';

const propTypes = {
    params: PropTypes.object
};

const defaultProps = {
    params: {}
};

class ReviewDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: null,
            cgac_code: null,
            frec_code: null,
            agency_name: '--',
            reporting_period: null,
            number_of_rows: null,
            number_of_warnings: null,
            total_size: null,
            created_on: null,
            ready: false,
            total_obligations: null,
            total_assistance_obligations: null,
            total_procurement_obligations: null,
            file_narrative: {}
        };
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.submissionID !== prevProps.params.submissionID) {
            // URL submission ID changed, reload
            this.loadData();
        }
    }

    loadData() {
        let submissionData = {};

        ReviewHelper.fetchSubmissionMetadata(this.props.params.submissionID)
            .then((data) => {
                submissionData = data;
                submissionData.ready = true;

                return ReviewHelper.fetchSubmissionNarrative(this.props.params.submissionID);
            })
            .then((narrative) => {
                submissionData.file_narrative = narrative;
                return ReviewHelper.fetchObligations(this.props.params.submissionID);
            })
            .then((data) => {
                submissionData.total_obligations = data.total_obligations;
                submissionData.total_assistance_obligations = data.total_assistance_obligations;
                submissionData.total_procurement_obligations = data.total_procurement_obligations;
                this.setState({
                    jobs: submissionData.jobs,
                    cgac_code: submissionData.cgac_code,
                    frec_code: submissionData.frec_code,
                    agency_name: submissionData.agency_name,
                    reporting_period: submissionData.reporting_period,
                    number_of_rows: submissionData.number_of_rows,
                    number_of_warnings: submissionData.number_of_warnings,
                    total_size: submissionData.total_size,
                    created_on: submissionData.created_on,
                    ready: submissionData.ready,
                    total_obligations: submissionData.total_obligations,
                    total_assistance_obligations: submissionData.total_assistance_obligations,
                    total_procurement_obligations: submissionData.total_procurement_obligations,
                    file_narrative: submissionData.file_narrative,
                    quarterly_submission: submissionData.quarterly_submission,
                    last_validated: submissionData.last_validated
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ReviewDataPage {...this.props} data={this.state} />
        );
    }
}

ReviewDataContainer.propTypes = propTypes;
ReviewDataContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        submission: state.submission,
        session: state.session
    })
)(ReviewDataContainer);
