/**
  * LoginMax.jsx
  * Createdd by Kevin Li 10/13/16
  **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';

export default class LoginMax extends React.Component {
	render() {
		return (
                <div className="row">
                    <div className="col-xs-12">
                    	<p className="instructions">Sign in or register for the DATA Act Broker using your MAX ID.</p>
                        <a href={kGlobalConstants.CAS_ROOT + '/cas/login?service=' + encodeURIComponent(kGlobalConstants.AUTH_CALLBACK)} className="usa-da-button btn-primary btn-lg btn-full">Sign In Using MAX</a>
                    </div>
                </div>
		)
	}
}