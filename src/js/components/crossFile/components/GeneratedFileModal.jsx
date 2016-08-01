/**
  * GeneratedFileModal.jsx
  * Created by Kevin Li 7/28/16
  **/

import React from 'react';
import Modal from 'react-aria-modal';
import CrossFileGenerateModalContainer from '../../../containers/crossFile/CrossFileGenerateModalContainer.jsx';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

export default class GeneratedFileModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabledButton: false,
			buttonText: 'Generate File',
			message: ''
		};
	}


	generateFile() {
		this.refs.container.generateFile();
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

	setButtonText(text) {
		this.setState({
			buttonText: text
		});
	}

	setMessage(text) {
		this.setState({
			message: text
		});
	}

	render() {
		let buttonClass = '';
		let buttonDisabled = true;

		if (!this.state.disabledButton) {
			buttonClass = '';
			buttonDisabled = false;
		}

		return (
			<Modal mounted={this.props.showModal} onExit={this.props.closeModal} underlayClickExists={false}
					verticallyCenter={true} titleId="usa-da-generate-file-modal">
				<div id="usa-da-generate-file-modal" className="usa-da-generate-file-modal">

					<div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
						<a href="#" onClick={this.props.closeModal}>
							<Icons.Times />
						</a>
					</div>
					
					<CrossFileGenerateModalContainer 
						type={this.props.file.letter.toLowerCase()}
						label={"File " + this.props.file.letter + ": " + this.props.file.name}
						ref="container"
						submissionID={this.props.submissionID}
						disableButton={this.disableButton.bind(this)}
						enableButton={this.enableButton.bind(this)}
						setButtonText={this.setButtonText.bind(this)}
						setMessage={this.setMessage.bind(this)}
						closeModal={this.props.closeModal}
						finishedGenerating={this.props.finishedGenerating}
					/>

					<div className="text-right mb-20">
						{this.state.message}
					</div>

					<button className={"usa-da-button btn-primary pull-right" + buttonClass} disabled={buttonDisabled} onClick={this.generateFile.bind(this)}>
						{this.state.buttonText}
					</button>

				</div>
			</Modal>
		)
	}
}