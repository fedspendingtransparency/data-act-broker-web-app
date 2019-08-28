/**
  * SubmissionLink.jsx
  * Created by Kevin Li 05/16/16
  */

import React from 'react'; 
import PropTypes from 'prop-types';

const propTypes = {
    submissionId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    disabled: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.string
};

const defaultProps = {
    disabled: false,
    type: 'dabs',
    value: '',
    submissionId: ''
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

        let content = <a href={`#/submission/${this.props.submissionId}`} className="date-link">{link}</a>;
        if (this.props.type === 'fabs') {
            content = <a href={`#/FABSAddData/${this.props.submissionId}`} className="date-link">{link}</a>;
        }

        if (this.props.disabled) {
            content = <div className="date-link">{link}</div>;
        }
        return (
            <div className="usa-da-recent-activity-link">
                {content}
            </div>
        );
    }
}

SubmissionLink.propTypes = propTypes;
SubmissionLink.defaultProps = defaultProps;
