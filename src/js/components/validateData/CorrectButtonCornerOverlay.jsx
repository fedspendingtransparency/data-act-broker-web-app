/**
 * CorrectButtonCornerOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createOnKeyDownHandler } from '../../helpers/util';

const propTypes = {
    buttonClicked: PropTypes.func
};

const defaultProps = {
    buttonClicked: () => {}
};

export default class CorrectButtonCornerOverlay extends React.Component {
    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.props.buttonClicked);
        return (
            <div className="usa-da-validate-corrected-file-holder">
                <div className="corner-overlay">
                    <div
                        role="button"
                        tabIndex={0}
                        className="usa-da-icon"
                        onKeyDown={onKeyDownHandler}
                        onClick={this.props.buttonClicked}
                        aria-label="Trash Can Icon">
                        <FontAwesomeIcon icon={['far', 'trash-alt']} />
                    </div>
                </div>
            </div>
        );
    }
}

CorrectButtonCornerOverlay.propTypes = propTypes;
CorrectButtonCornerOverlay.defaultProps = defaultProps;
