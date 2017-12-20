/**
  * GeneratedFileModal.jsx
  * Created by Kevin Li 7/28/16
  */

import React, { PropTypes } from 'react';
import Modal from 'react-aria-modal';
import CrossFileGenerateModalContainer from '../../../containers/crossFile/CrossFileGenerateModalContainer';
import * as Icons from '../../SharedComponents/icons/Icons';

const propTypes = {
    closeModal: PropTypes.func,
    finishedGenerating: PropTypes.func,
    file: PropTypes.object,
    submissionID: PropTypes.string,
    showModal: PropTypes.bool
};

const defaultProps = {
    closeModal: null,
    finishedGenerating: null,
    file: null,
    submissionID: '',
    showModal: false
};

export default class GeneratedFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledButton: true,
            buttonText: 'Generate File',
            message: ''
        };
    }

    setMessage(text) {
        this.setState({
            message: text
        });
    }

    setButtonText(text) {
        this.setState({
            buttonText: text
        });
    }

    disableButton() {
        this.setState({
            disabledButton: true
        });
    }

    enableButton() {
        this.setState({
            disabledButton: false
        });
    }

    generateFile() {
        this.refs.container.generateFile();
    }

    render() {
        let buttonClass = '';
        let buttonDisabled = true;

        if (!this.state.disabledButton) {
            buttonClass = '';
            buttonDisabled = false;
        }

        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;

        return (
            <Modal
                mounted={this.props.showModal}
                onExit={this.props.closeModal}
                underlayClickExists={false}
                verticallyCenter={trueProps}
                titleId="usa-da-generate-file-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-generate-file-modal" className="usa-da-generate-file-modal">
                        <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                            <a href="#" onClick={this.props.closeModal}>
                                <Icons.Times />
                            </a>
                        </div>
                        <CrossFileGenerateModalContainer
                            type={this.props.file.letter.toUpperCase()}
                            label={"File " + this.props.file.letter + ": " + this.props.file.name}
                            ref="container"
                            submissionID={this.props.submissionID}
                            disableButton={this.disableButton.bind(this)}
                            enableButton={this.enableButton.bind(this)}
                            setButtonText={this.setButtonText.bind(this)}
                            setMessage={this.setMessage.bind(this)}
                            closeModal={this.props.closeModal}
                            finishedGenerating={this.props.finishedGenerating} />

                        <div className="text-right mb-20">
                            {this.state.message}
                        </div>

                        <button
                            className={"usa-da-button btn-primary pull-right" + buttonClass}
                            disabled={buttonDisabled}
                            onClick={this.generateFile.bind(this)}>
                            {this.state.buttonText}
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

GeneratedFileModal.propTypes = propTypes;
GeneratedFileModal.defaultProps = defaultProps;
