/**
  * SubmissionLink.jsx
  * Created by Kevin Li 05/16/16
  */

import PropTypes from 'prop-types';
import { Link } from 'react-router';

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

const SubmissionLink = ({disabled = false, type = 'dabs', value = '', submissionId = '', testSubmission = false}) => {
    let link = `ID: ${submissionId}`;
    if (value && type !== 'fabs') {
        link = `${value}\nID: ${submissionId}`;
    }
    else if (disabled) {
        link = 'N/A';
    }

    let content = <Link to={`/submission/${submissionId}`} className="date-link">{link}</Link>;
    if (type === 'fabs') {
        content = <Link to={`/FABSAddData/${submissionId}`} className="date-link">{link}</Link>;
    }

    if (disabled) {
        content = <div className="date-link">{link}</div>;
    }

    const testSubmissionText = testSubmission ? <span className="test-submission-label">TEST</span> : '';
    return (
        <div className="usa-da-recent-activity-link">
            {content}
            {testSubmissionText}
        </div>
    );
};

SubmissionLink.propTypes = propTypes;
export default SubmissionLink;
