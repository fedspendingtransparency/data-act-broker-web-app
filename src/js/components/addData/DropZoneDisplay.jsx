import React from 'react';
import FileProgress from '../SharedComponents/FileProgress.jsx';

const defaultProps = {
	showFile: false,
	string: ''
}

export default class DropZoneDisplay extends React.Component {
	render() {

		let showFile = " hide";
		let isCaption = "";
		if (this.props.displayMode == 'file') {
			showFile = "";
			isCaption = " is-caption";
		}

		let showFailure = " hide";
		if (this.props.displayMode == 'failure') {
			showFailure = "";
			isCaption = " is-caption";
		}

		let showSuccess = " hide";
		if (this.props.displayMode == 'success') {
			showSuccess = "";
			isCaption = " is-caption";
		}

		let progress = "";
		if (this.props.displayMode == 'uploading') {
			progress = <FileProgress fileStatus={this.props.progress} />;
		}

		return (
			<div className="center-block usa-da-dropzone">
				<div className={"text-center usa-da-icon-cloud-upload" + showFile}></div>
				<div className={"text-center usa-da-dropzone-fail glyphicon glyphicon-remove" + showFailure}></div>
				<div className={"text-center usa-da-dropzone-success glyphicon glyphicon-ok" + showSuccess}></div>
				<div className={isCaption} dangerouslySetInnerHTML={{__html:this.props.string}}></div>
				{progress}
			</div>
		);
	}
}
DropZoneDisplay.defaultProps = defaultProps;