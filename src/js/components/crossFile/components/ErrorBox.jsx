/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';
import UploadButton from '../../validateData/ValidateDataUploadButton.jsx';

export default class ErrorBox extends React.Component {
	droppedFile(type, file) {
		console.log(file);
		console.log(type);
	}

	render() {

		return (
			<div className="error-box">
				<div className="vertical-line" />
				<h6>Cross-File Validation Errors</h6>
				<div className="error-content">
					<div className="table-wrapper">
						<ComparisonTable />
					</div>
					<div className="button-wrapper">
						<div className="button-list">
							<div className="download-button">
								<button className="usa-button-primary">Download Error File</button>
							</div>

							<div className="upload-buttons-wrap">
								<div className="upload-title">
									Upload Corrected Files
								</div>
								<div className="upload-buttons">
									<UploadButton text="File A: Appropriations Account" onDrop={this.droppedFile.bind(this, 'left')} />
									<UploadButton text="File B: Program Activity and Object Class" onDrop={this.droppedFile.bind(this, 'right')} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}