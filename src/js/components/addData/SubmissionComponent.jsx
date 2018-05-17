/**
* SubmissionComponent.jsx
* Created by Katie Rose 12/8/15
*/

import React, { PropTypes } from 'react';
import FileComponent from './FileComponent';

const propTypes = {
    files: PropTypes.array.isRequired,
    data: PropTypes.array,
    headers: PropTypes.array
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
        const submissionItems = [];

        for (let i = 0; i < this.props.files.length; i++) {
            const fileVars = this.props.files[i];

            submissionItems.push(
                <FileComponent
                    key={i}
                    fileTitle={fileVars.fileTitle}
                    requestName={fileVars.requestName} />);
        }

        return (
            <div className="usa-da-add-data-upload-section">
                <div className="container">
                    <div className="row usa-da-submission-instructions">
                        <div className="col-md-12">
                            <p>
                                Please choose the three files that you want to upload to the DATA Act Broker. Once all
                                three files are chosen, a button will appear at the bottom of the page allowing you to
                                begin the upload and validation process.
                            </p>
                        </div>
                    </div>
                    <div className="row center-block usa-da-submission-items">
                        {submissionItems}
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionComponent.propTypes = propTypes;
SubmissionComponent.defaultProps = defaultProps;
