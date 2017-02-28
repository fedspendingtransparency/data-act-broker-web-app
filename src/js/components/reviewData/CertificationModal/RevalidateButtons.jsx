/**
  * RevalidateButtons.jsx
  * Created by Kevin Li 9/7/16
  **/

import React from 'react';

export default class RevalidateButtons extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
	            	<div className="col-md-12 certify-check">
	            		This submission was created prior to 02/22/2017. Please revalidate this submission before certifying it.
	            	</div>
	            </div>
				<div className="row">
		            <div className="col-md-6 mb-10">
		                <button onClick={this.props.clickedRevalidateButton} className={"usa-da-button btn-full btn-primary"}>
		                	Revalidate Submission
		                </button>
		            </div>
		            <div className="col-md-6 mb-10">
		                <button onClick={this.props.closeModal} className="usa-da-button btn-full decline-button">
		                	Don't Revalidate
		                </button>
		            </div>
		        </div>
		    </div>
		)
	}
}