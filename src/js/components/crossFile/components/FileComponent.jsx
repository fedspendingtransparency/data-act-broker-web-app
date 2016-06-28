/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	fileType: '',
	name: '',
	fileKey: ''
};

export default class FileComponent extends React.Component {

	fileStatus() {
		let status = 'none';
		if (this.props.submission.files.hasOwnProperty(this.props.fileKey)) {
			const file = this.props.submission.files[this.props.fileKey];
			if (file.state == 'success') {
				status = 'success';
			}
			else if (file.state == 'failed') {
				status = 'failed';
			}
			else {
				status = 'pending';
			}
		}

		return status;
	}

	render() {

		let iconHide = ' hide';
		let iconClass = '';
		let icon = null;

		const status = this.fileStatus();
		if (status == 'pending') {
			iconHide = '';
			icon = <Icons.CloudUpload />;
		}
		else if (status == 'success') {
			iconHide = '';
			iconClass = ' success';
			icon = <Icons.CheckCircle />;
		}
		else if (status == 'failed') {
			iconHide = '';
			iconClass = ' error';
			icon = <Icons.ExclamationCircle />;
		}

		return (
			<div className="file-box">
				<div className="file-type">
					<div>File {this.props.fileType}</div>
				</div>
				<div className="file-name">
					{this.props.name}
				</div>
				<div className={"file-icon" + iconHide}>
					<div className={"usa-da-icon" + iconClass}>
						{icon}
					</div>
				</div>
			</div>
		)
	}
}

FileComponent.defaultProps = defaultProps;