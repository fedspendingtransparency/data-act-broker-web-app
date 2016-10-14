/**
  * LoginMaxLoading.jsx
  * Createdd by Kevin Li 10/14/16
  **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

export default class LoginMaxLoading extends React.Component {
	render() {
		let errorMessageComponent = null;

        if (this.props.errorMessage && this.props.errorMessage != "") {
            errorMessageComponent = <ErrorMessage message={this.props.errorMessage} />;
        }

		return (
			<div className="login-right usa-da-login-container">
                    <div className="row">
                    	<div className="col-md-12 login-loading">
                    		<div className="loading-animation">
		                        <LoadingBauble />
		                    </div>
		                    <div className="loading-text">
		                    	Logging into the DATA Act Broker...
		                    </div>
	                    </div>
	                        
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {errorMessageComponent}
                        </div>
                    </div>
            </div>
		)
	}
}