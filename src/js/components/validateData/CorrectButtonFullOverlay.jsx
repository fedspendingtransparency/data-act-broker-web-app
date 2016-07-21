/**
 * CorrectButtonFullOverlay.jsx
 * Created by Mike Bray 6/21/16
 **/

import React from 'react';

import ValidateDataUploadButton from './ValidateDataUploadButton.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class CorrectButtonFullOverlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="usa-da-validate-corrected-file-holder full-width">
                <div className="full-overlay">
                    <div className="usa-da-icon" onClick={this.props.buttonClicked.bind(this)}><Icons.Times /></div>
                    <div className="buttonHolder">
                        <div className="col-md-12">
                            <ValidateDataUploadButton text={this.props.text} optional={this.props.optional} onDrop={this.props.onDrop.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}