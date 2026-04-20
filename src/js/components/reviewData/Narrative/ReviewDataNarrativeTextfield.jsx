/**
 * ReviewDataNarrativeTextfield.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    textChanged: PropTypes.func,
    currentContent: PropTypes.string,
    fileType: PropTypes.string
};

const asciiRegex = /^[ -~\t\n\r]+$/;

const ReviewDataNarrativeTextfield = ({textChanged = null, currentContent = '', fileType = ''}) => {
    const [validAscii, setValidAscii] = useState(asciiRegex.test(currentContent) || currentContent === '');

    useEffect(() => {
        validateAscii();
    }, [currentContent]);

    const validateAscii = () => {
        setValidAscii(asciiRegex.test(currentContent) || currentContent === '');
    };

    const textUpdated = (e) => {
        textChanged(e.target.value, fileType);
    };

    const placeholderType = fileType === 'submission_comment' ? 'submission' : 'file';
    const warningMessage = validAscii ? null :
        (
            <React.Fragment>
                <FontAwesomeIcon icon="triangle-exclamation" className="exclamation-triangle-icon" />
                Your comment contains non-standard characters that may not display properly.
            </React.Fragment>
        );
    return (
        <div className="narrative-box">
            <textarea
                rows="1"
                id={`submission-review-narrative-${fileType}`}
                value={currentContent}
                onChange={textUpdated}
                placeholder={`Enter a comment to describe this ${placeholderType}...`}
                className={validAscii ? '' : 'invalid-ascii'} />
            {warningMessage}
        </div>
    );
};

ReviewDataNarrativeTextfield.propTypes = propTypes;
export default ReviewDataNarrativeTextfield;
