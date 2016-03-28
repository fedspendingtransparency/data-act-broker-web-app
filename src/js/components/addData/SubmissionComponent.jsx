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
    constructor(props) {
        super(props);
    }
    render() {
        let submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];
            
            submissionItems.push(
                <FileComponent key={i}
                                fileTitle={fileVars.fileTitle}
                                fileTemplateName={fileVars.fileTemplateName}
                                requestName={fileVars.requestName}
                />);
        }

        return (
            <div>
                <div className="container">
                    <div className="row text-center usa-da-submission-instructions">
                        <div className="col-md-6 col-md-offset-3">
                            Please choose the four files that you would like to upload to the Data Broker. Once all four files are chosen, a button will appear at the bottom of the page allowing you to begin the upload and validation process.
                        </div>
                    </div>
                    <div className="row center-block usa-da-submission-items">{submissionItems}</div>
                </div>
            </div>
        );
    }
}

SubmissionComponent.propTypes = propTypes;
SubmissionComponent.defaultProps = defaultProps;
