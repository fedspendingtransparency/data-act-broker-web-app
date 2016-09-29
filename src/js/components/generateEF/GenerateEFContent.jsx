/**
  * GenerateEFContent.jsx
  * Created by Kevin Li 8/24/16
  **/

import React from 'react';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

import GenerateEFOverlay from './GenerateEFOverlay.jsx';
import GenerateEFItem from './generateItem/GenerateEFItem.jsx';

export default class GenerateFilesContent extends React.Component {


	render() {
		return (
			<div>
				<div className="container center-block with-overlay">
					<div className="row usa-da-submission-instructions">
						<div className="col-md-12">
							<p>Please wait while your File E: Executive Compensation Data and F: Sub-award Data files are generated. These files do not undergo any additional validations.</p>
						</div>
					</div>

					 <div className="alert alert-warning">
                            <span className="usa-da-icon"><Icons.ExclamationCircle /></span>
                            <p>Download functionality related to <b>File E</b> is not yet available.</p>
                    </div>

					<GenerateEFItem {...this.props}
						comingSoon={true}
						type="E"
						title="Executive Compensation Data"
						description="Executive Compensation data is generated from the System for Award Management and includes data for the receiving entities of the awards in file C." />
					<GenerateEFItem {...this.props}
						type="F"
						title="Sub-Award Data"
						description="Sub-award data is generated from the Federal Subaward Reporting System and includes the subawards for the prime awards in file C." />

				</div>

				<GenerateEFOverlay {...this.props} />
			</div>
		)
	}
}
