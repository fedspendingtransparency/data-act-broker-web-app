/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 6/8/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

import ReviewDataPage from '../../components/reviewData/ReviewDataPage.jsx';

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
            file_narrative: {},
            gtas: null
        }
    }

    componentDidMount() {
    	this.loadData();
        this.isGtas();
    }

    componentDidUpdate(prevProps, prevState) {
    	if (this.props.params.submissionID != prevProps.params.submissionID) {
    		// URL submission ID changed, reload
    		this.loadData();
    	}
    }

    isGtas() {
        ReviewHelper.isGtasWindow()
            .then((res) => {
                this.setState({gtas: res.data})
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    loadData() {

        let submission = {};

    	ReviewHelper.fetchStatus(this.props.params.submissionID)
            .then((data) => {
                data.ready = true;
                submission = data;

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
                this.setState(submission);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <ReviewDataPage {...this.props} data={this.state} />
        );
    }
}

export default connect(
    state => ({ submission: state.submission,
                session: state.session })
)(ReviewDataContainer)
