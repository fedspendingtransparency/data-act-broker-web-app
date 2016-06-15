/**
  * FileComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	type: '',
	name: ''
};

export default class FileComponent extends React.Component {
	render() {
		return (
			<div className="file-box">
				<div className="file-type">
					File {this.props.type}
				</div>
				<div className="file-name">
					{this.props.name}
				</div>
				<div className="file-icon hide">
					<div className="usa-da-icon">
						<Icons.CloudUpload />
					</div>
				</div>
			</div>
		)
	}
}

FileComponent.defaultProps = defaultProps;