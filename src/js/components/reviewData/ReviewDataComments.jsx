/**
 * ReviewDataComments.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';
import ReviewDataCommentsDropdown from './ReviewDataCommentsDropdown.jsx'
import ReviewDataCommentsTextfield from './ReviewDataCommentsTextfield.jsx'

import * as ReviewHelper from '../../helpers/reviewHelper.js';

export default class ReviewDataComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: "A",
            fileComments: props.comments,
            saveState: ""
        };
    }

    changeFile(newFile) {
        var fileComment = document.getElementById("submission-review-comments").value.trim();
        var tempComments = this.state.fileComments;
        tempComments[this.state.currentFile] = fileComment;

        this.setState({
            fileComments: tempComments,
            currentFile: newFile,
        });
    }

    saveComments() {
        this.setState({saveState: "Saving"});
        var fileComment = document.getElementById("submission-review-comments").value.trim();
        var tempComments = this.state.fileComments;
        tempComments[this.state.currentFile] = fileComment;

        ReviewHelper.saveComments(this.props.submissionID, tempComments)
            .then(() => {
                this.setState({saveState: "Saved"});
            })
            .catch((error) => {
                this.setState({saveState: "Error"});
            });
    }

    render() {
        return (
            <div className="comment-wrapper col-md-8">
                <h4>Add comments to files</h4>
                <div className="row">
                    <ReviewDataCommentsDropdown changeFile={this.changeFile.bind(this)} />
                    <ReviewDataCommentsTextfield currentContent={this.state.fileComments[this.state.currentFile]} />
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <button onClick={this.saveComments.bind(this)} className="usa-da-button btn-default">Save Changes</button>
                        <p className={"save-state "+this.state.saveState}>{this.state.saveState}</p>
                    </div>
                </div>
            </div>
        );
    }
}