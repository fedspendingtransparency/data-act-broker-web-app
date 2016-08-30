/**
  * GenerateFilesError.jsx
  * Created by Kevin Li 8/19/2016
  */

import React from 'react';

export default class GenerateFilesError extends React.Component {
	render() {
		return (
			<div className="alert alert-danger text-center" role="alert">
				<b>Error:</b> {this.props.message}
			</div>
		);
	}
}