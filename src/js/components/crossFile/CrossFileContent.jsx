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

		this.state = {
			crossFileItems: []
		};
	}

	componentDidMount() {
		this.crossFileItems();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.submission, this.props.submission)) {
			this.crossFileItems();
		}
	}

	crossFileItems() {
		const items = [];
		const crossFileKeys = this.props.submission.crossFileOrder;
		let i = 0;
		crossFileKeys.forEach((pairMeta) => {

			let status = 'loading';
			if (this.props.submission.crossFile.errors.hasOwnProperty(pairMeta.key)) {
				status = 'error';
			}
			else if (this.props.submission.crossFile.warnings.hasOwnProperty(pairMeta.key)) {
				status = 'warning';
			}
			else if (_.indexOf(this.allowableStates, this.props.submission.state) > -1) {
				status = 'success';
			}

			items.push(<CrossFileItem key={i} status={status} meta={pairMeta} {...this.props} forceUpdate={this.props.reloadData} />);
			i++;
		});

		this.setState({
			crossFileItems: items
		});
	}

	render() {

		const isLoading = _.indexOf(this.allowableStates, this.props.submission.state) == -1;

		let loadingClass = '';
		if (isLoading) {
			loadingClass = ' usa-dagathering-data';
		}

		return (
			<div>
				<div className="container center-block with-overlay">
					<div className={"usa-da-cross-file" + loadingClass}>
						<div className="row usa-da-submission-instructions">
							<div className="col-md-12">
								<p>Cross-file validation will now be performed on some of your files. As before, if any errors are found they will be displayed below.</p>
							</div>
						</div>

						{this.state.crossFileItems}

					</div>
				</div>
				<CrossFileOverlay {...this.props} loading={isLoading} uploadFiles={this.props.uploadFiles} />
			</div>
		)
	}
}