/**
 * CorrectButtonCornerOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createOnKeyDownHandler } from '../../helpers/util';

const propTypes = {
    buttonClicked: PropTypes.func
};

const CorrectButtonCornerOverlay = ({ buttonClicked = () => {} }) => {
    const onKeyDownHandler = createOnKeyDownHandler(buttonClicked);
    return (
        <div className="usa-da-validate-corrected-file-holder">
            <div className="corner-overlay">
                <div
                    role="button"
                    tabIndex={0}
                    className="usa-da-icon"
                    onKeyDown={onKeyDownHandler}
                    onClick={buttonClicked}
                    aria-label="Trash Can Icon">
                    <FontAwesomeIcon icon={['far', 'trash-can']} className="trash-icon" />
                </div>
            </div>
        </div>
    );
};

CorrectButtonCornerOverlay.propTypes = propTypes;
export default CorrectButtonCornerOverlay;
