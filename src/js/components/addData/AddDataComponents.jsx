/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import FileContainer from './FileContainer.jsx';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};

export default class SubmissionContainer extends React.Component {
    render() {
        const submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];
            submissionItems.push(
                <FileContainer key={i}
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

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;
