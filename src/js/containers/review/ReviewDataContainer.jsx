/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 */

import React, {PropTypes} from 'react';
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
            number_of_errors: null,
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
        let submission = {};

        ReviewHelper.fetchStatus(this.props.params.submissionID)
            .then((data) => {
                submission = data;
                submission.ready = true;

                return ReviewHelper.fetchSubmissionNarrative(this.props.params.submissionID);
            })
            .then((narrative) => {
                submission.file_narrative = narrative;
                return ReviewHelper.fetchObligations(this.props.params.submissionID);
            })
            .then((data) => {
                submission.total_obligations = data.total_obligations;
                submission.total_assistance_obligations = data.total_assistance_obligations;
                submission.total_procurement_obligations = data.total_procurement_obligations;
                this.setState({
                    jobs: submission.jobs,
                    cgac_code: submission.cgac_code,
                    frec_code: submission.frec_code,
                    agency_name: submission.agency_name,
                    reporting_period_start_date: submission.reporting_period_start_date,
                    reporting_period_end_date: submission.reporting_period_end_date,
                    number_of_errors: submission.number_of_errors,
                    number_of_rows: submission.number_of_rows,
                    created_on: submission.created_on,
                    ready: submission.ready,
                    total_obligations: submission.total_obligations,
                    total_assistance_obligations: submission.total_assistance_obligations,
                    total_procurement_obligations: submission.total_procurement_obligations,
                    file_narrative: submission.file_narrative,
                    quarterly_submission: submission.quarterly_submission
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
