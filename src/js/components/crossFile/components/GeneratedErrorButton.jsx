/**
  * GeneratedErrorButton.jsx
  * Created by Kevin Li 7/28/16
  **/

import React from 'react';
import GeneratedFileModal from './GeneratedFileModal.jsx';

export default class GeneratedErrorButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    showModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            showModal: false
        });
    }

    finishedGenerating() {
        this.setState({
            showModal: false
        }, () => {
            this.props.forceUpdate();
        });
    }

    render() {
        // this button will never be staged because page immediately reloads on file generation
        let buttonClass = 'btn-danger-outline';
        if (this.props.type === 'optional') {
            buttonClass = 'btn-optional';
        }

        return (
            <div>
                <div className={"usa-da-button btn-full " + buttonClass} onClick={this.showModal.bind(this)}>
                    File {this.props.file.letter}: {this.props.file.name}
                </div>
                <GeneratedFileModal showModal={this.state.showModal} closeModal={this.closeModal.bind(this)}
                    file={this.props.file} finishedGenerating={this.finishedGenerating.bind(this)}
                    submissionID={this.props.submissionID} />
            </div>

        );
    }
}
