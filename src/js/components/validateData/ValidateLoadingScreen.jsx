/**
  * ValidateLoadingScreen.jsx
  * Created by Kevin Li 04/13/16
  */

import React from 'react';
import ValidateDataFilePlaceholder from './ValidateDataFilePlaceholder.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class ValidateLoadingScreen extends React.Component {
	render() {
		const placeholders = [];

		for (let i = 0; i < 3; i++) {
			placeholders.push(<ValidateDataFilePlaceholder key={i} />);
		}

		return (
			<div className="container">
				<div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
	                    <ReactCSSTransitionGroup transitionName="usa-da-validate-fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
		                	<div>
		                		{placeholders}
		                	</div>
                    	</ReactCSSTransitionGroup>
                    </div>
                </div>
                <ReactCSSTransitionGroup transitionName="usa-da-validate-fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					<div className="center-block usa-da-validation-overlay" data-testid="validate-value-overlay">
						<div className="container">
							<div className="row">
								<div className="col-md-12 usa-da-overlay-content-wrap">
									<div className="overlay-loading">
										<h6>Gathering data...</h6>
									</div>
								</div>
							</div>
						</div>
		            </div>
	            </ReactCSSTransitionGroup>
			</div>
		);
	}
}