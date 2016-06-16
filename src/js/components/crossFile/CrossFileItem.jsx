/**
  * CrossFileItem.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import FileComponent from './components/FileComponent.jsx';
import ComparisonComponent from './components/ComparisonComponent.jsx';
import LoadingComponent from './components/LoadingComponent.jsx';
import ErrorBox from './components/ErrorBox.jsx';

const defaultProps = {
	type: 'loading',
	pendingFiles: {
		left: null,
		right: null
	}
};

export default class CrossFileItem extends React.Component {
	render() {

		let error = null;
		let middle = <ComparisonComponent type={this.props.type} />;
		if (this.props.type == 'error') {
			error = <ErrorBox pendingFiles={this.props.pendingFiles} />;
		}

		if (this.props.type == 'loading') {
			middle = <LoadingComponent />;
		}


		return (
			<div className="usa-da-cross-file-group">
				<div className="row">
					<div className="usa-da-cross-file-item">
						<div className="file-left">
							<FileComponent type="A" name="Appropriations Account" />
						</div>
						<div className="file-compare">
							{middle}
						</div>
						<div className="file-right">
							<FileComponent type="B" name="Program Activity and Object Class" />
						</div>
					</div>
				</div>
				<div className="row">
					{error}
				</div>
			</div>
		)
	}
}

CrossFileItem.defaultProps = defaultProps;