/**
  * SubmissionLink.jsx
  * Created by Kevin Li 05/16/16
  */

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const propTypes = {
    submissionId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string,
    testSubmission: PropTypes.bool
};

const defaultProps = {
    disabled: false,
    type: 'dabs',
    value: '',
    submissionId: '',
    testSubmission: false
};

export default class SubmissionLink extends React.Component {
    render() {
        let link = `ID: ${this.props.submissionId}`;
        if (this.props.value && this.props.type !== 'fabs') {
            link = `${this.props.value}\nID: ${this.props.submissionId}`;
        }
        else if (this.props.disabled) {
            link = 'N/A';
        }

        let content = <Link to={`submission/${this.props.submissionId}`} className="date-link">{link}</Link>;
        if (this.props.type === 'fabs') {
            content = <Link to={`FABSAddData/${this.props.submissionId}`} className="date-link">{link}</Link>;
        }

        if (this.props.disabled) {
            content = <div className="date-link">{link}</div>;
        }

        const testSubmission = this.props.testSubmission ? <span className="test-submission-label">TEST</span> : '';
        return (
            <div className="usa-da-recent-activity-link">
                {content}
                {testSubmission}
            </div>
        );
    }
}

SubmissionLink.propTypes = propTypes;
SubmissionLink.defaultProps = defaultProps;
