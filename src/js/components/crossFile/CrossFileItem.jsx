/**
  * CrossFileItem.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import FileComponent from './components/FileComponent.jsx';
import ComparisonComponent from './components/ComparisonComponent.jsx';
import ErrorBox from './components/ErrorBox.jsx';

export default class CrossFileItem extends React.Component {
	render() {
		return (
			<div className="usa-da-cross-file-group">
				<div className="row">
					<div className="usa-da-cross-file-item">
						<div className="file-left">
							<FileComponent type="A" name="Appropriations Account" />
						</div>
						<div className="file-compare">
							<ComparisonComponent />
						</div>
						<div className="file-right">
							<FileComponent type="B" name="Program Activity and Object Class" />
						</div>
					</div>
				</div>
				<div className="row">
					<ErrorBox />
				</div>
			</div>
		)
	}
}