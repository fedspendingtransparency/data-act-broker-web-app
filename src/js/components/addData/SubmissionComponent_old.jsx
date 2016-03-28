/**
* SubmissionComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import FileComponent from './FileComponent.jsx';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};

export default class SubmissionComponent extends React.Component {
    render() {
        const submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];
            submissionItems.push(
                <FileComponent key={i}
                                fileTitle={fileVars.fileTitle}
                                fileTemplateName={fileVars.fileTemplateName}
                                requestName={fileVars.requestName}
                                addFile={this.props.addFile}
                />);
        }

        return (
            <div>
                <div className="container">
                    <div className="row center-block usa-da-submission-items">{submissionItems}</div>
                </div>
            </div>
        );
    }
}

SubmissionComponent.propTypes = propTypes;
SubmissionComponent.defaultProps = defaultProps;
