/**
 * CorrectButtonFullOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import React from 'react';
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

const defaultProps = {
    buttonClicked: () => {},
    onDrop: () => {},
    text: '',
    optional: true
};

export default class CorrectButtonFullOverlay extends React.Component {
    render() {
        const onKeyDownHandler = createOnKeyDownHandler(this.props.buttonClicked);
        return (
            <div className="usa-da-validate-corrected-file-holder full-width">
                <div className="full-overlay">
                    <div
                        role="button"
                        tabIndex={0}
                        className="usa-da-icon"
                        onKeyDown={onKeyDownHandler}
                        onClick={this.props.buttonClicked}
                        aria-label="close">
                        <FontAwesomeIcon icon="xmark" />
                    </div>
                    <div className="buttonHolder">
                        <div className="col-md-12">
                            <ValidateDataUploadButton
                                text={this.props.text}
                                optional={this.props.optional}
                                onDrop={this.props.onDrop} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CorrectButtonFullOverlay.propTypes = propTypes;
CorrectButtonFullOverlay.defaultProps = defaultProps;
