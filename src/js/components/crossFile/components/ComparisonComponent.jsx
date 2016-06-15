/**
  * ComparisonComponent.jsx
  * Created by Kevin Li 6/14/16
  **/

import React from 'react';
import * as Icons from '../../SharedComponents/icons/Icons.jsx';

const defaultProps = {
	type: 'error'
};

export default class ComparisonComponent extends React.Component {
	render() {

		let icon = <Icons.ExclamationCircle />;
		if (this.props.type == 'success') {
			icon = <Icons.Check />
		}

		return (
			<div className="usa-da-item-comparison">
				<div className="under-layer">
					<div className="line" />
				</div>

				<div className="center-item">
					<div className="circle">
						<div className={"usa-da-icon " + this.props.type}>
							{icon}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

ComparisonComponent.defaultProps = defaultProps;