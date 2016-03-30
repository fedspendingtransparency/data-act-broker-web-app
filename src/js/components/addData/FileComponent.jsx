/**
* FileComponent.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import DropZone from './DropZone.jsx';
import DropZoneContainer from '../../containers/addData/DropZoneContainer.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';

const propTypes = {
    fileTitle: PropTypes.string.isRequired,
    fileTemplateName: PropTypes.string.isRequired
};

export default class FileComponent extends React.Component {
    render() {
        const ruleLink = kGlobalConstants.GITHUB + '/tests/' + this.props.requestName + 'Fields.csv';

        return (
            <div className="usa-da-submission-item">
                <div className="center-block">
                    <div className="usa-da-submission-vertical-center">
                        <div className="usa-da-submission-item-title">
                            <h4>{this.props.fileTitle}</h4>
                        </div>

                        <div className="usa-da-submission-item-drop-wrapper">
                           <DropZoneContainer requestName={this.props.requestName} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

FileComponent.propTypes = propTypes;
