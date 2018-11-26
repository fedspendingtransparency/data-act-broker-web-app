/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from '../../helpers/submissionGuideHelper';
import LoadingPage from '../../components/submission/SubmissionPage';

const propTypes = {
    params: PropTypes.object
};

const defaultProps = {
    params: {}
};

class SubmissionContainer extends React.Component {
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
            <LoadingPage {...this.props} submissionID={this.props.params.submissionID} />
        );
    }
}

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session })
)(SubmissionContainer);
