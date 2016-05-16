import React from 'react';
import FileProgress from '../SharedComponents/FileProgress.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	showFile: false,
	string: ''
}

export default class DropZoneDisplay extends React.Component {
	render() {

		let uploadIcon = <Icons.CloudUpload />;
		let iconClass = "";
		if (this.props.displayMode == 'failure') {
			iconClass = 'fail';
		}
		if (this.props.displayMode == 'success') {
			iconClass = 'success';
		}

		let progress = "";
		if (this.props.displayMode == 'uploading') {
			progress = <FileProgress fileStatus={this.props.progress} />;
		}

		return (
			<div className="center-block">
				<div className={"text-center " + "usa-da-icon " + iconClass}>{uploadIcon}</div>
				<div dangerouslySetInnerHTML={{__html:this.props.string}}></div>
				{progress}
			</div>
		);
	}
}
DropZoneDisplay.defaultProps = defaultProps;