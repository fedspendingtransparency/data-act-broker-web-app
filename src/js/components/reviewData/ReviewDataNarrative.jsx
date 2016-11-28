/**
 * ReviewDataNarrative.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';
import ReviewDataNarrativeDropdown from './ReviewDataNarrativeDropdown.jsx'
import ReviewDataNarrativeTextfield from './ReviewDataNarrativeTextfield.jsx'

import * as ReviewHelper from '../../helpers/reviewHelper.js';

export default class ReviewDataNarrative extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: "A",
            fileNarrative: props.narrative,
            saveState: ""
        };
    }

    changeFile(newFile) {
        var fileNarrative = document.getElementById("submission-review-narrative").value.trim();
        var tempNarrative = this.state.fileNarrative;
        tempNarrative[this.state.currentFile] = fileNarrative;

        this.setState({
            fileNarrative: tempNarrative,
            currentFile: newFile,
        });
    }

    saveNarrative() {
        this.setState({saveState: "Saving"});
        var fileNarrative = document.getElementById("submission-review-narrative").value.trim();
        var tempNarrative = this.state.fileNarrative;
        tempNarrative[this.state.currentFile] = fileNarrative;

        ReviewHelper.saveNarrative(this.props.submissionID, tempNarrative)
            .then(() => {
                this.setState({saveState: "Saved"});
            })
            .catch((error) => {
                this.setState({saveState: "Error"});
            });
    }

    render() {
        return (
            <div className="narrative-wrapper col-md-8">
                <h4>Add comments to files</h4>
                <div className="row">
                    <ReviewDataNarrativeDropdown changeFile={this.changeFile.bind(this)} />
                    <ReviewDataNarrativeTextfield currentContent={this.state.fileNarrative[this.state.currentFile]} />
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <button onClick={this.saveNarrative.bind(this)} className="usa-da-button btn-default">Save Changes</button>
                        <p className={"save-state "+this.state.saveState}>{this.state.saveState}</p>
                    </div>
                </div>
            </div>
        );
    }
}