/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import * as submissionActions from 'redux/actions/submission/submissionActions';
import SubmissionPage from 'components/submission/SubmissionPage';

const propTypes = {
    computedMatch: PropTypes.object,
    updateStep: PropTypes.func,
    updateOriginalStep: PropTypes.func,
    updateLastCompletedStep: PropTypes.func,
    updatedSubmissionID: PropTypes.func,
    clearSubmission: PropTypes.func,
    submissionSteps: PropTypes.object
};

export class SubmissionContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            errorMessage: '',
            submissionInfo: {}
        };
    }

    componentDidMount() {
        const { submissionID } = this.props.computedMatch.params;
        if (submissionID !== this.props.submissionSteps.submissionID) {
            // If the submission does not match what we already have in Redux
            this.props.clearSubmission();
            this.props.updatedSubmissionID(submissionID);
            this.getSubmission();
            this.getOriginalStep();
        }
    }

    componentDidUpdate(prevProps) {
        const { submissionID } = this.props.computedMatch.params;
        // check for ID change
        if (prevProps.computedMatch.params.submissionID !== submissionID) {
            this.props.clearSubmission();
            this.props.updatedSubmissionID(submissionID);
            this.getSubmission();
            this.getOriginalStep();
        }
    }

    getSubmission() {
        this.setState({ isLoading: true, isError: false, errorMessage: '' });
        const { submissionID } = this.props.computedMatch.params;
        ReviewHelper.fetchSubmissionMetadata(submissionID, 'dabs')
            .then((data) => {
                this.setState({
                    submissionInfo: data
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getOriginalStep() {
        const params = this.props.computedMatch.params;
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                this.setState({
                    loading: false,
                    error: false,
                    errorMessage: ''
                });
                console.log('original step', res.step);
            })
            .catch((err) => {
                const { message } = err.body;
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: message
                });
            });
    }

    render() {
        const { submissionID } = this.props.computedMatch.params;
        return (
            <SubmissionPage
                submissionID={submissionID}
                {...this.state} />
        );
    }
}

SubmissionContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session,
        submissionSteps: state.submissionSteps
    }),
    (dispatch) => bindActionCreators(submissionActions, dispatch),
)(SubmissionContainer);
