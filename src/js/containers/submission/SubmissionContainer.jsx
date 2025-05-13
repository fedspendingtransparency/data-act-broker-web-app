/**
 * SubmissionContainer.jsx
 * Created by Minahm Kim 6/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as SubmissionGuideHelper from 'helpers/submissionGuideHelper';
import { routes } from 'dataMapping/dabs/submission';
import { Redirect } from 'react-router-dom';
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
            redirectPath: ''
        };
    }

    componentDidMount() {
        this.getOriginalStep();
    }

    getOriginalStep() {
        const params = this.props.computedMatch.params;
        SubmissionGuideHelper.getSubmissionPage(params.submissionID)
            .then((res) => {
                const originalStep = parseInt(res.data.step, 10);
                if (originalStep === 6) {
                    this.setState({
                        loading: false,
                        error: true,
                        errorMessage: 'This is a FABS ID. Please navigate to FABS.'
                    });
                }
                else {
                    const redirectPath = routes[originalStep - 1];
                    this.setState({
                        loading: false,
                        error: false,
                        errorMessage: '',
                        redirectPath
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: err.response.data.message
                });
            });
    }

    render() {
        const { submissionID } = this.props.computedMatch.params;
        if (this.state.redirectPath) {
            return <Redirect to={`/submission/${submissionID}/${this.state.redirectPath}`} />;
        }
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
        session: state.session
    })
)(SubmissionContainer);
