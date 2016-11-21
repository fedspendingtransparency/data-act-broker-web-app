/**
 * ReviewDataComments.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';
import ReviewDataCommentsDropdown from './ReviewDataCommentsDropdown.jsx'
import ReviewDataCommentsTextfield from './ReviewDataCommentsTextfield.jsx'

export default class ReviewDataComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: "A",
            fileComments: {
                A: "",
                B: "",
                C: "",
                D1: "",
                D2: "",
                E: "",
                F: ""
            }
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
        var fileComment = document.getElementById("submission-review-comments").value.trim();
        var tempComments = this.state.fileComments;
        tempComments[this.state.currentFile] = fileComment;

        console.log(tempComments);
    }

    render() {
        return (
            <div className="comment-wrapper">
                <h2>Add comments to files</h2>
                <div className="row">
                    <ReviewDataCommentsDropdown changeFile={this.changeFile.bind(this)} />
                    <ReviewDataCommentsTextfield currentContent={this.state.fileComments[this.state.currentFile]} />
                </div>
                <button onClick={this.saveComments.bind(this)}>Save</button>
            </div>
        );
    }
}