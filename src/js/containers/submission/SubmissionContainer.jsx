/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 **/

import React from 'react';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper.js';
import LoadingPage from '../../components/submission/SubmissionPage.jsx';

class SubmissionContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        SubmissionGuideHelper.getSubmissionPage(this.props.params.submissionID)
            .then((res) => {
                hashHistory.replace(res.url);
            })
            .catch((err) => {
                hashHistory.replace(err.url);
            });
    }


    render() {
        return (
            <LoadingPage {...this.props} submissionID={this.props.params.submissionID}/>
        );
    }
}

export default connect(
    state => ({ session: state.session })
)(SubmissionContainer);
