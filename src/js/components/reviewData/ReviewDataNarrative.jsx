/**
 * ReviewDataNarrative.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';
import ReviewDataNarrativeDropdown from './ReviewDataNarrativeDropdown.jsx';
import ReviewDataNarrativeTextfield from './ReviewDataNarrativeTextfield.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';

export default class ReviewDataNarrative extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: "A",
            fileNarrative: {},
            currentNarrative: "",
            saveState: ""
        };
    }

    componentDidMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(props) {
        this.updateState(props);
    }

    getNewNarrative() {
        const tempNarrative = this.state.fileNarrative;
        tempNarrative[this.state.currentFile] = this.state.currentNarrative;
        return tempNarrative;
    }

    saveNarrative() {
        this.setState({ saveState: "Saving" });
        const tempNarrative = this.getNewNarrative();

        ReviewHelper.saveNarrative(this.props.submissionID, tempNarrative)
            .then(() => {
                this.setState({ saveState: "Saved" });
            })
            .catch(() => {
                this.setState({ saveState: "Error" });
            });
    }

    updateState(props) {
        this.setState({
            currentFile: "A",
            fileNarrative: props.narrative,
            currentNarrative: props.narrative["A"],
            saveState: ""
        });
    }

    changeFile(newFile) {
        const tempNarrative = this.getNewNarrative();

        this.setState({
            fileNarrative: tempNarrative,
            currentFile: newFile,
            currentNarrative: tempNarrative[newFile]
        });
    }

    textChanged(newNarrative) {
        this.setState({ currentNarrative: newNarrative });
    }

    render() {
        return (
            <div className="narrative-wrapper col-md-8">
                <h4>Add comments to files</h4>
                <div className="row">
                    <ReviewDataNarrativeDropdown changeFile={this.changeFile.bind(this)} />
                    <ReviewDataNarrativeTextfield currentContent={this.state.currentNarrative}
                        textChanged={this.textChanged.bind(this)}/>
                </div>
                <div className="row">
                    <div className="col-md-10">
                        <button onClick={this.saveNarrative.bind(this)} className="usa-da-button btn-default">
                            Save Changes
                        </button>
                        <p className={"save-state "+this.state.saveState}>{this.state.saveState}</p>
                    </div>
                </div>
            </div>
        );
    }
}
