/**
 * SubmissionGuideContainer.jsx
 * Created by Mike Bray 5/23/16
 **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import SubmissionGuidePage from '../../components/addData/SubmissionGuidePage.jsx';
import * as sessionActions from '../../redux/actions/sessionActions.js';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper.js';

class SubmissionGuideContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let forceDisplay = false;
        if (this.props.location.query.hasOwnProperty('force') && this.props.location.query.force === 'true') {
            forceDisplay = true;
        }

        if (this.props.session.skipGuide === true && forceDisplay !== true) {
            this.sendToAddData();
        }
    }

    saveSkipGuide(skip_guide) {
        SubmissionGuideHelper.setSkipGuide(skip_guide)
            .then(() => {
                // update the Redux state
                this.props.setSkipGuide(skip_guide);
                this.sendToAddData();
            })
            .catch((err) => {
                // TODO: Figure out how to handle errors
            });
    }

    sendToAddData() {
        hashHistory.push('/addData/');
    }

    render() {
        return (
            <SubmissionGuidePage {...this.props} saveSkipGuide={this.saveSkipGuide.bind(this)} />
        );
    }
}

export default connect(
    state => ({ session: state.session }),
    dispatch => bindActionCreators(sessionActions, dispatch)
)(SubmissionGuideContainer);
