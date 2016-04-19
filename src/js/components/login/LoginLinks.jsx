/**
* LoginLinks.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class LoginLinks extends React.Component {
    render() {
        return (
            <div className="col-xs-12 col-sm-8 col-sm-pull-4 usa-da-registration-links">
            	<ul>
            		<li><a href="#/registration">Register</a></li>
            		<li><a href="#/forgotpassword">Help, I forgot my password.</a></li>
            	</ul>
            </div>
        );
    }
}
