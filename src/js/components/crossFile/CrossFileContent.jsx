/**
  * CrossFileContent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import CrossFileItem from './CrossFileItem.jsx';

export default class CrossFileContent extends React.Component {

	crossFileItems() {
		const items = [];

		for (let i = 0; i < 4; i++) {
			items.push(<CrossFileItem key={i} />);
		}

		return items;
	}

	render() {
		const overlay = null;

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
				{overlay}
			</div>
		)
	}
}