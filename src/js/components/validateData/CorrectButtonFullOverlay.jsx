/**
 * CorrectButtonFullOverlay.jsx
 * Created by Mike Bray 6/21/16
 */

import React, { PropTypes } from 'react';

import ValidateDataUploadButton from './ValidateDataUploadButton';

import * as Icons from '../SharedComponents/icons/Icons';

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
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usa-da-validate-corrected-file-holder full-width">
                <div className="full-overlay">
                    <div
                        className="usa-da-icon"
                        onClick={this.props.buttonClicked.bind(this)}>
                        <Icons.Times />
                    </div>
                    <div className="buttonHolder">
                        <div className="col-md-12">
                            <ValidateDataUploadButton
                                text={this.props.text}
                                optional={this.props.optional}
                                onDrop={this.props.onDrop.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CorrectButtonFullOverlay.propTypes = propTypes;
CorrectButtonFullOverlay.defaultProps = defaultProps;
