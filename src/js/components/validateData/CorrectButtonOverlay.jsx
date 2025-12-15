/**
 * CorrectButtonOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import { useState } from 'react';
import PropTypes from 'prop-types';

import CorrectButtonCornerOverlay from './CorrectButtonCornerOverlay';
import CorrectButtonFullOverlay from './CorrectButtonFullOverlay';

const propTypes = {
    onDrop: PropTypes.func,
    removeFile: PropTypes.func,
    fileName: PropTypes.string,
    isReplacingFile: PropTypes.bool
};

const CorrectButtonOverlay = ({ onDrop = () => {}, removeFile = () => {}, fileName = '', isReplacingFile = false }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    const buttonClicked = () => {
        setShowOverlay(!showOverlay);
    };

    const unstageFile = () => {
        setShowOverlay(!showOverlay);
        removeFile();
    };

    let displayText = 'Choose a New File';

    if (isReplacingFile) {
        displayText = `File: ${fileName}`;
    }

    let chooseFileOverlay = null;
    if (showOverlay) {
        chooseFileOverlay = (<CorrectButtonFullOverlay
            text={displayText}
            onDrop={onDrop}
            buttonClicked={unstageFile} />);
    }

    return (
        <div>
            <CorrectButtonCornerOverlay buttonClicked={buttonClicked} />
            {chooseFileOverlay}
        </div>
    );
};

CorrectButtonOverlay.propTypes = propTypes;
export default CorrectButtonOverlay;
