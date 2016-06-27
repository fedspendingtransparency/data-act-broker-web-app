/**
  * CrossFileContent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import _ from 'lodash';
import CrossFileItem from './CrossFileItem.jsx';
import CrossFileOverlay from './CrossFileOverlay.jsx';

export default class CrossFileContent extends React.Component {

	constructor(props) {
		super(props);

		this.allowableStates = ['crossFile', 'uploading', 'prepare', 'failed'];
	}

	crossFileItems() {
		const items = [];

		const crossFileKeys = this.props.submission.crossFileOrder;
		let i = 0;
		crossFileKeys.forEach((pairMeta) => {

			let status = 'loading';
			if (this.props.submission.crossFile.hasOwnProperty(pairMeta.key)) {
				status = 'error';
			}
			else if (_.indexOf(this.allowableStates, this.props.submission.state) > -1) {
				status = 'success';
			}

			items.push(<CrossFileItem key={i} status={status} meta={pairMeta} {...this.props} />);
			i++;
		});

		// for (let i = 0; i < 4; i++) {
		// 	let type = "success";
		// 	if (i % 2 == 0) {
		// 		type = "error";
		// 	}

		// 	if (_.indexOf(this.allowableStates, this.props.submission.state) == -1) {
		// 		type = 'loading';
		// 	}

		// 	items.push(<CrossFileItem key={i} type={type} leftFileName="appropriations" rightFileName="program_activity" {...this.props} />);
		// }

		return items;
	}

	render() {

		const items = this.crossFileItems();

		const isLoading = _.indexOf(this.allowableStates, this.props.submission.state) == -1;

		return (
			<div>
				<div className="container center-block with-overlay">
					<div className="usa-da-cross-file">
						<div className="row usa-da-submission-instructions">
							<div className="col-md-12">
								<p>Cross-file validation will now be performed on some of your files. As before, if any errors are found they will be displayed below.</p>
							</div>
						</div>

						{items}

					</div>
				</div>
				<CrossFileOverlay {...this.props} loading={isLoading} uploadFiles={this.props.uploadFiles} />
			</div>
		)
	}
}