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
            reporting_period_start_date: null,
            reporting_period_end_date: null,
            number_of_errors: null,
            number_of_rows: null,
            created_on: null,
            ready: false
        }
    }

    componentDidMount() {
    	this.loadData();
    }

    componentDidUpdate(prevProps, prevState) {
    	if (this.props.params.submissionID != prevProps.params.submissionID) {
    		// URL submission ID changed, reload
    		this.loadData();
    	}
    }

    loadData() {
    	ReviewHelper.fetchStatus(this.props.params.submissionID)
            .then((data) => {
                data.ready = true;
                this.setState(data);
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
    state => ({ session: state.session })
)(ReviewDataContainer)