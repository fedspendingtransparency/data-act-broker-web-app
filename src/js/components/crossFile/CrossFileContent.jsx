/**
  * CrossFileContent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import CrossFileItem from './CrossFileItem.jsx';
import CrossFileOverlay from './CrossFileOverlay.jsx';

export default class CrossFileContent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loading: true
		}
	}

	crossFileItems() {
		const items = [];

		for (let i = 0; i < 4; i++) {
			let type = "success";
			if (i % 2 == 0) {
				type = "error";
			}

			if (this.state.loading) {
				type = 'loading';
			}
			items.push(<CrossFileItem key={i} type={type} />);
		}

		return items;
	}

	componentDidMount() {
		// temporary for demoing
		setTimeout(() => {
			this.setState({
				loading: false
			})
		}, 5000);
	}

	render() {

		const items = this.crossFileItems();

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
				<CrossFileOverlay {...this.props} loading={this.state.loading} />
			</div>
		)
	}
}