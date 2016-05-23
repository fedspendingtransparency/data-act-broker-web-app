/**
  * SubmissionComponent.jsx
  * Created by Kevin Li 5/20/16
  **/

import React from 'react';
import SubmitButton from '../../SharedComponents/SubmitButton.jsx';

const defaultProps = {
	disabled: false
};

export default class SubmitComponent extends React.Component {
	render() {
		return (
			<div className="row">
				<div className="col-sm-8 text-left mt-20">
					{this.props.message}
				</div>
                <div className="col-sm-4 text-right mt-20" data-testid="submitbutton">
                    <SubmitButton onClick={this.props.onSubmit} className="usa-da-button btn-primary btn-lg" buttonText="Submit" buttonDisabled={this.props.disabled} />
                </div>
            </div>
		);
	}
}

SubmitComponent.defaultProps = defaultProps;