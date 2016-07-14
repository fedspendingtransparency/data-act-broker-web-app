/**
  * ValidateDataUploadButton.jsx
  * Created by Kevin Li 4/1/2016
  */

import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const propTypes = {
	onDrop: PropTypes.func,
	optional: PropTypes.bool,
	text: PropTypes.string,
	additionalClasses: PropTypes.string
};

const defaultProps = {
	optional: false,
	text: 'Upload Corrected File',
	additionalClasses: ''
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
			<div className="col-md-12">
				<Dropzone onDrop={this.addedFile.bind(this)} multiple={false} className={"usa-da-button btn-default btn-full" + optionalUpload + this.props.additionalClasses}>
					{this.props.text}
				</Dropzone>
			</div>
		);
	}
}

ValidateDataUploadButton.propTypes = propTypes;
ValidateDataUploadButton.defaultProps = defaultProps;