/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 3/31/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as reviewActions from '../../redux/actions/reviewActions.js';

import ReviewDataContent from '../../components/reviewData/ReviewDataContent.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

class ReviewDataContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    getSubmissionData() {
        ReviewHelper.fetchStatus(this.props.submissionID)
            .then((data) => {
                // TODO: Remove this when this is eventually tied to user accounts
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidMount() {
        this.getSubmissionData();
    }

    render() {
        return (
            <ReviewDataContent {...this.props} submissionID={this.props.submissionID} />
        );
    }
}

export default connect(
        state => ({ submission: state.submissionID }),
        dispatch => bindActionCreators(reviewActions, dispatch)
)(ReviewDataContainer)
