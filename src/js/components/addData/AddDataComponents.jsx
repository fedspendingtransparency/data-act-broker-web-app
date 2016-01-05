/**
* AddDataComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Request from 'superagent';

const propTypes = {
    files: PropTypes.array.isRequired
};

const defaultProps = {
    data: [['Error']],
    headers: ['Submission Data Missing']
};


class DropZone extends React.Component {

   onDrop(files) {
        this.setState({
            fileCount: files.length
        });

        var req = Request.post('/addData');

        files.forEach((file) => {
            req.attach('uploadFile', file);
        });

        req.end(function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('SUCCESS');
            }
        });
    }

    render () {

        return (
                <Dropzone className="text-center" multiple="false" onDrop={this.onDrop.bind(this)}>
                    <div className="center-block usa-da-dropzone">Drop your file here, or click to select file to upload.</div>
                </Dropzone>
            )
    }
}

class FileProgress extends React.Component {

    render () {
        var style= {
            width: this.props.fileStatus + '%'
        }

        return (
                <div>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={this.props.fileStatus} aria-valuemin="0" aria-valuemax="100" style={style}></div>
                    </div>
                    <div>
                        <span>{this.props.fileStatus}%</span>
                    </div>
                </div>
            )
    }
}

class FileContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileCount: 0
        };
    }

 

    render() {

        var icon;
        if (this.props.fileStatus > 0) {
            icon = <FileProgress fileStatus={this.props.fileStatus} />;
        } else {
            icon = <DropZone />;
        }

        return (
            <div>
                <div className="col-md-3 text-center usa-da-submission-item">
                    <div>
                        <h4>{this.props.fileTitle}</h4>
                        <img src="/graphics/file_icon.png"/>
                        <p>{this.props.fileTemplateName}</p>
                        <div className="center-block">
                            {icon}
                        </div>

                        {this.state.fileCount > 0 ? <h3>Uploading {this.state.fileCount} files...</h3> : null}
                    </div>
                </div>
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
