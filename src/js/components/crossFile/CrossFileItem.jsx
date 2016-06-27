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
	firstFile: null,
	secondFile: null,
	meta: {
		firstKey: '',
		firstName: '',
		firstType: '',
		secondKey: '',
		secondName: '',
		secondType: ''
	}
};

export default class CrossFileItem extends React.Component {
	render() {
		let error = null;
		let middle = <ComparisonComponent type={this.props.status} />;
		if (this.props.status == 'error') {
			error = <ErrorBox {...this.props} />;
		}

		if (this.props.status == 'loading') {
			middle = <LoadingComponent />;
		}

		return (
			<div className="usa-da-cross-file-group">
				<div className="row">
					<div className="usa-da-cross-file-item">
						<div className="file-left">
							<FileComponent fileType={this.props.meta.firstType} name={this.props.meta.firstName} fileKey={this.props.meta.firstKey} {...this.props} />
						</div>
						<div className="file-compare">
							{middle}
						</div>
						<div className="file-right">
							<FileComponent fileType={this.props.meta.secondType} name={this.props.meta.secondName} fileKey={this.props.meta.secondKey} {...this.props} />
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