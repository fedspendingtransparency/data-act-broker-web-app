/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import * as ReviewHelper from 'helpers/reviewHelper';
import SubmissionPage from 'components/submission/SubmissionPage';

const propTypes = {
    computedMatch: PropTypes.object
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
        this.getSubmission();
        this.getOriginalStep();
    }

    componentDidUpdate(prevProps) {
        // check for ID change
        if (prevProps.computedMatch.params.submissionID !== this.props.computedMatch.params.submissionID) {
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
                console.log('original step', res.step);
            })
            .catch((err) => {
                const { message } = err.body;
                console.error(message);
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
    (state) => ({ session: state.session })
)(SubmissionContainer);
