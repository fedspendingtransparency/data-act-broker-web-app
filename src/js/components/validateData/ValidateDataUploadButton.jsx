/**
  * ValidateDataUploadButton.jsx
  * Created by Kevin Li 4/1/2016
  */

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
	onDrop: PropTypes.func
};

export default class ValidateDataUploadButton extends React.Component {

	addedFile(files) {
		this.props.onDrop(files[0]);
	}

	render() {
		return (
			<div>
				<Dropzone onDrop={this.addedFile.bind(this)} multiple={false} className="usa-da-validate-upload-button">
					Choose Corrected File
				</Dropzone>
			</div>
		);
	}
}

ValidateDataUploadButton.propTypes = propTypes;