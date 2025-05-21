/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as uploadActions from 'redux/actions/uploadActions';
import * as ReviewHelper from 'helpers/reviewHelper';
import ReviewDataPage from 'components/reviewData/ReviewDataPage';

const propTypes = {
    submissionID: PropTypes.string,
    errorFromStep: PropTypes.func,
    testSubmission: PropTypes.bool,
    setInfo: PropTypes.func
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
            publish_status: 'unpublished',
            certified: false,
            certification_deadline: '',
            total_obligations: null,
            total_assistance_obligations: null,
            total_procurement_obligations: null,
            file_narrative: {}
        };

        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.submissionID !== prevProps.submissionID) {
            // URL submission ID changed, reload
            this.loadData();
        }
    }

    loadData() {
        let submissionData = {};
        const { submissionID } = this.props;
        ReviewHelper.fetchSubmissionMetadata(submissionID)
            .then((res) => {
                // Update meta data (submission.info) in redux
                this.props.setSubmissionPublishStatus(res.data.publish_status);
                this.props.setInfo(res.data);
                submissionData = res.data;

                return ReviewHelper.fetchSubmissionNarrative(submissionID);
            })
            .then((narrRes) => {
                submissionData.file_narrative = narrRes.data;
                return ReviewHelper.fetchObligations(submissionID);
            })
            .then((obRes) => {
                submissionData.total_obligations = obRes.data.total_obligations;
                submissionData.total_assistance_obligations = obRes.data.total_assistance_obligations;
                submissionData.total_procurement_obligations = obRes.data.total_procurement_obligations;
                const createdDate = moment.utc(submissionData.created_on).local().format('MM/DD/YYYY');
                this.setState({
                    jobs: submissionData.jobs,
                    cgac_code: submissionData.cgac_code,
                    frec_code: submissionData.frec_code,
                    agency_name: submissionData.agency_name,
                    reporting_period: submissionData.reporting_period,
                    number_of_rows: submissionData.number_of_rows,
                    number_of_warnings: submissionData.number_of_warnings,
                    total_size: submissionData.total_size,
                    created_on: createdDate,
                    ready: true,
                    total_obligations: submissionData.total_obligations,
                    total_assistance_obligations: submissionData.total_assistance_obligations,
                    total_procurement_obligations: submissionData.total_procurement_obligations,
                    file_narrative: submissionData.file_narrative,
                    quarterly_submission: submissionData.quarterly_submission,
                    last_validated: submissionData.last_validated,
                    publish_status: submissionData.publish_status,
                    certified: submissionData.certified,
                    certification_deadline: submissionData.certification_deadline
                });
            })
            .catch((error) => {
                console.error(error);
                this.props.errorFromStep(error.response.data.message);
            });
    }

    render() {
        return (
            <ReviewDataPage {...this.props} data={this.state} loadData={this.loadData} />
        );
    }
}

ReviewDataContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
    submission: state.submission,
    session: state.session
});

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(uploadActions, dispatch)
)(ReviewDataContainer);
