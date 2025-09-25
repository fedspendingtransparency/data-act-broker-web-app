/**
 * SelectSubmissionButton.jsx
 * Created by Lizzie Salita 3/18/20
 */

import PropTypes from 'prop-types';

const propTypes = {
    clickedSubmission: PropTypes.func,
    submissionID: PropTypes.string
};

const SelectSubmissionButton = ({ clickedSubmission, submissionID }) => (
    <button
        className="select-submission-table__button"
        onClick={() => clickedSubmission(submissionID)}>
        {submissionID}
    </button>
);

SelectSubmissionButton.propTypes = propTypes;
export default SelectSubmissionButton;
