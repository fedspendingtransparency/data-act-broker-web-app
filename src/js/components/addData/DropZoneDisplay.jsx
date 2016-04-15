import React from 'react';
import FileProgress from '../SharedComponents/FileProgress.jsx';

const defaultProps = {
	showFile: false,
	string: ''
}

export default class DropZoneDisplay extends React.Component {
	render() {

		let uploadIcon = 'usa-da-icon-cloud-upload';
		if (this.props.displayMode == 'failure') {
			uploadIcon = 'usa-da-dropzone-fail glyphicon glyphicon-remove'
		}
		if (this.props.displayMode == 'success') {
			uploadIcon = 'usa-da-dropzone-success glyphicon glyphicon-ok';
		}

		let progress = "";
		if (this.props.displayMode == 'uploading') {
			progress = <FileProgress fileStatus={this.props.progress} />;
		}

		return (
			<div className="center-block">
				<div className={"text-center " + uploadIcon}></div>
				<div dangerouslySetInnerHTML={{__html:this.props.string}}></div>
				{progress}
			</div>
		);
	}
}
DropZoneDisplay.defaultProps = defaultProps;