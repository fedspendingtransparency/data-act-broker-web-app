/**
 * SelectSubmissionButton.jsx
 * Created by Lizzie Salita 3/18/20
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    clickedSubmission: PropTypes.func,
    submissionID: PropTypes.string
};

const SelectSubmissionButton = ({ clickedSubmission, submissionID }) => (
    <button
        onClick={() => clickedSubmission(submissionID)}>
        {submissionID}
    </button>
);

SelectSubmissionButton.propTypes = propTypes;
export default SelectSubmissionButton;
