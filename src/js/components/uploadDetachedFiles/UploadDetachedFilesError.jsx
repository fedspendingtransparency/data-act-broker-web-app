/**
* UploadDetachedFileError.jsx
* Created by Minahm Kim
**/
import React from 'react';
import moment from 'moment';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class UploadDetachedFileError extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			header: '',
			message: ''
		}
	}

	componentDidMount() {
		this.loadContent();
	}

	loadContent(){
		let header ='';
		let message ='';

		if(this.props.error){
			header = this.props.error.header;
			message = this.props.error.description
		}else{
			switch(this.props.errorCode){
				case 1:
					header = 'This submission has already been published'
					break;
				case 2:
					header = 'This file has already been submitted';
					break;
				case 3:
					header = 'This file has already been submitted in another submission';
					break;
				default:
					header = 'There was an error with your submission. Please contact an administrator';
					break;
			}
		}

		this.setState({
					header: header,
					message: message
				})
	}

	render() {
		return( <div className="alert alert-error text-left" role="alert">
					<span className="usa-da-icon error-icon"><Icons.ExclamationCircle /></span>
					<div className="alert-header-text">{this.state.header}</div>
					<p>{this.state.message}</p>
				</div>
		);
	}
}