/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import ReplacementButton from './ReplacementButton.jsx';

const defaultProps = {
	fileType: '',
	name: '',
	fileKey: ''
};

export default class FileComponent extends React.Component {
	render() {

		let replaceButton = null;

		if (this.props.status == 'success') {
			replaceButton = <ReplacementButton buttonClicked={this.props.toggleUploadBox} {...this.props} />;
		}

		return (
			<div className="file-box">
				<div className="file-type">
					<div>File {this.props.fileType}</div>
				</div>
				<div className="file-name">
					{this.props.name}
				</div>
				{replaceButton}
			</div>
		)
	}
}

FileComponent.defaultProps = defaultProps;