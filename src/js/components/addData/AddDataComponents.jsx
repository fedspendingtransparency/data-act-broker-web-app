/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};

class FileContainer extends React.Component {
    render() {
        return (
            <div className="usa-width-one-fourth">
                <h3>{this.props.fileTitle}</h3>
                <img src="/graphics/file_icon.png"/>
                <p>{this.props.fileTemplateName}</p>
                <input type="file"/>
            </div>
        );
    }
}

export default class SubmissionContainer extends React.Component {
    render() {
        var submissionItems = [];

        for (var i = 0; i < this.props.files.length; i++){
            var fileVars = this.props.files[i];
            submissionItems.push(<FileContainer key={i} fileTitle={fileVars[0]} fileTemplateName={fileVars[1]} fileStatus={fileVars[2]} />);
        }

        return (
            <div className="usa-grid-full">{submissionItems}</div>
        );
    }
}

SubmissionContainer.propTypes = propTypes;
SubmissionContainer.defaultProps = defaultProps;