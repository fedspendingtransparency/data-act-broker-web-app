/**
  * ErrorBox.jsx
  * Created by Kevin Li 6/15/16
  **/

import React from 'react';
import ComparisonTable from './ComparisonTable.jsx';

export default class ErrorBox extends React.Component {
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

							<div className="upload-buttons">
								<div className="upload-title">
									Upload Corrected Files
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}