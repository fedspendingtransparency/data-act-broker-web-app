/**
* FileContainer.jsx
* Created by Kyle Fox 2/19/16
**/

import React, { PropTypes } from 'react';
import DropZone from './DropZone.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';

const propTypes = {
    addFile: PropTypes.func.isRequired,
    fileTitle: PropTypes.string.isRequired,
    fileTemplateName: PropTypes.string.isRequired
};

export default class FileContainer extends React.Component {

    render() {
        const ruleLink = kGlobalConstants.GITHUB + '/tests/' + this.props.requestName + 'Fields.csv';

        return (
            <div className="col-md-3 text-center usa-da-submission-item">
                <h4>{this.props.fileTitle}</h4>

                <div className="center-block">
                   <DropZone addFileToHolder={this.props.addFile} requestName={this.props.requestName} />
                </div>
            </div>
        );
    }
}

FileContainer.propTypes = propTypes;
