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
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_rows: null,
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
        let submission_data = {};

        ReviewHelper.fetchSubmissionMetadata(this.props.params.submissionID)
            .then((data) => {
                submission_data = data;
                submission_data.ready = true;

                return ReviewHelper.fetchSubmissionNarrative(this.props.params.submissionID);
            })
            .then((narrative) => {
                submission_data.file_narrative = narrative;
                return ReviewHelper.fetchObligations(this.props.params.submissionID);
            })
            .then((data) => {
                submission_data.total_obligations = data.total_obligations;
                submission_data.total_assistance_obligations = data.total_assistance_obligations;
                submission_data.total_procurement_obligations = data.total_procurement_obligations;
                return ReviewHelper.revalidationThreshold();
            })
            .then((data) => {
                submission_data.revalidation_threshold = data.revalidation_threshold;
                this.setState({
                    jobs: submission_data.jobs,
                    cgac_code: submission_data.cgac_code,
                    frec_code: submission_data.frec_code,
                    agency_name: submission_data.agency_name,
                    reporting_period_start_date: submission_data.reporting_period_start_date,
                    reporting_period_end_date: submission_data.reporting_period_end_date,
                    number_of_rows: submission_data.number_of_rows,
                    number_of_warnings: submission_data.number_of_warnings,
                    created_on: submission_data.created_on,
                    ready: submission_data.ready,
                    total_obligations: submission_data.total_obligations,
                    total_assistance_obligations: submission_data.total_assistance_obligations,
                    total_procurement_obligations: submission_data.total_procurement_obligations,
                    file_narrative: submission_data.file_narrative,
                    quarterly_submission: submission_data.quarterly_submission,
                    revalidation_threshold: submission_data.revalidation_threshold,
                    last_validated: submission_data.last_validated
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
