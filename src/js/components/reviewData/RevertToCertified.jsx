/**
 * RevertToCertified.jsx
 * Created by Lizzie Salita 3/16/20
 */

import React from 'react';
import PropTypes from 'prop-types';

import { revertToCertified } from 'helpers/reviewHelper';

const propTypes = {
    submissionID: PropTypes.string,
    disabled: PropTypes.bool
};

const RevertToCertified = ({ submissionID, disabled }) => (
    <button
        disabled={disabled}
        onClick={() => revertToCertified(submissionID)}
        className={`usa-da-button btn-primary btn-full${disabled ? ' btn-disabled' : ''}`}>
        Revert Submission
    </button>
);

RevertToCertified.propTypes = propTypes;
export default RevertToCertified;
