/**
 * ReviewDataContainer.jsx
 * Created by Mike Bray 3/31/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as uploadActions from '../../redux/actions/reviewActions.js';

import ReviewDataContent from '../../components/reviewData/ReviewDataContent.jsx';

import Moment from 'moment';

class ReviewDataContainer extends React.Component {
    componentDidMount() {
        this.props.resetSubmission();
    }
    render() {

        return (
            <ReviewDataContent {...this.props} submissionID={this.props.submissionID} />
        );
    }
}

export default connect(
        state => ({ submission: state.submission }),
        dispatch => bindActionCreators(uploadActions, dispatch)
)(ReviewDataContainer)
