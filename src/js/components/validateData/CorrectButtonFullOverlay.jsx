/**
 * CorrectButtonFullOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ValidateDataUploadButton from './ValidateDataUploadButton';

import { createOnKeyDownHandler } from '../../helpers/util';

const propTypes = {
    buttonClicked: PropTypes.func,
    onDrop: PropTypes.func,
    text: PropTypes.string,
    optional: PropTypes.bool
};

const CorrectButtonFullOverlay = ({ buttonClicked = () => {}, onDrop = () => {}, text = '', optional = true }) => {
    const onKeyDownHandler = createOnKeyDownHandler(buttonClicked);
    return (
        <div className="usa-da-validate-corrected-file-holder full-width">
            <div className="full-overlay">
                <div
                    role="button"
                    tabIndex={0}
                    className="usa-da-icon"
                    onKeyDown={onKeyDownHandler}
                    onClick={buttonClicked}
                    aria-label="close">
                    <FontAwesomeIcon icon="xmark" />
                </div>
                <div className="buttonHolder">
                    <div className="col-md-12">
                        <ValidateDataUploadButton
                            text={text}
                            optional={optional}
                            onDrop={onDrop} />
                    </div>
                </div>
            </div>
        </div>
    );
};

CorrectButtonFullOverlay.propTypes = propTypes;
export default CorrectButtonFullOverlay;
