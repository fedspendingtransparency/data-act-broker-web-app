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
            currentNarrative: props.narrative["A"],
            saveState: ""
        };
    }

    changeFile(newFile) {
        let tempNarrative = this.getNewNarrative();

        this.setState({
            fileNarrative: tempNarrative,
            currentFile: newFile,
            currentNarrative: tempNarrative[newFile]
        });
    }

    saveNarrative() {
        this.setState({saveState: "Saving"});
        let tempNarrative = this.getNewNarrative();

        ReviewHelper.saveNarrative(this.props.submissionID, tempNarrative)
            .then(() => {
                this.setState({saveState: "Saved"});
            })
            .catch((error) => {
                this.setState({saveState: "Error"});
            });
    }

    getNewNarrative() {
        let tempNarrative = this.state.fileNarrative;
        tempNarrative[this.state.currentFile] = this.state.currentNarrative;
        return tempNarrative
    }

    textChanged(newNarrative) {
        this.setState({currentNarrative: newNarrative});
    }

    render() {
        return (
            <div className="narrative-wrapper col-md-8">
                <h4>Add comments to files</h4>
                <div className="row">
                    <ReviewDataNarrativeDropdown changeFile={this.changeFile.bind(this)} />
                    <ReviewDataNarrativeTextfield currentContent={this.state.currentNarrative} textChanged={this.textChanged.bind(this)}/>
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