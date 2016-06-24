/**
  * ValidateDataUploadButton.jsx
  * Created by Kevin Li 4/1/2016
  */

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
	onDrop: PropTypes.func,
	optional: PropTypes.bool,
	text: PropTypes.string
};

const defaultProps = {
	optional: false,
	text: 'Upload Corrected File'
};

export default class ValidateDataUploadButton extends React.Component {

	addedFile(files) {
		this.props.onDrop(files[0]);
	}

	render() {

		let optionalUpload = '';
		if (this.props.optional) {
			optionalUpload = ' optional-upload';
		}

		return (
			<div>
				<Dropzone onDrop={this.addedFile.bind(this)} multiple={false} className={"usa-da-validate-upload-button" + optionalUpload}>
					{this.props.text}
				</Dropzone>
			</div>
		);
	}
}

ValidateDataUploadButton.propTypes = propTypes;
ValidateDataUploadButton.defaultProps = defaultProps;