/**
* LoginComponents.jsx
* Created by Kyle Fox 12/4/15
**/

var React = require('react');
var Username = React.createClass({
    render: function() {
        return (
        	<div className="usa-da-input-container">
    			<label className="usa-sr-only" for="username">Username or email address</label>
  				<input id="username" name="username" type="text" placeholder="Username" autocapitalize="off" autocorrect="off"/>
  		        <div className="usa-da-icon usa-da-icon-user"></div>
            </div>
      	);
    }
});

var Password = React.createClass({
    render: function() {
        return (
        	<div className="usa-da-input-container">
    			<label className="usa-sr-only" for="password">Password</label>
  				<input id="password" name="password" type="password" placeholder="Password"/>
                <div className="usa-da-icon usa-da-icon-lock"></div>      
			</div>
		);
    }
});

var LoginLinks = React.createClass({
    render: function() {
        return (
        	<div className="usa-width-one-half">
        		<p>
        			<a href="#">Register</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Help</a>
    			</p>
			</div>
		);
    }
});

var SignInButton = React.createClass({
    render: function() {
        return (
        	<div className="usa-width-one-half">
                <div className="align-right">
    				<button className="usa-button-big" type="button">Sign in</button>
                </div>
			</div>
		);
    }
});

var LoginPanel = React.createClass({
    render: function() {
        return (
    		<div className="usa-width-one-half usa-color-gray-dark usa-color-text-gray-dark usa-background-dark usa-da-login-container">
                <form>
        			<Username/>
        			<Password/>
        			<LoginLinks/>
        			<SignInButton/>
                </form>
			</div>
		);
    }
});

var LoginIntro = React.createClass({
    render: function() {
        return (
            <div className="usa-width-one-half usa-color-text-white">
                <h1>Data Broker</h1>
                <h3>
                	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan eleifend nunc. Donec blandit accumsan lacus, ut feugiat diam bibendum vitae. Fusce sit amet elit dolor. Praesent malesuada sem id tortor scelerisque, a pretium purus sagittis.
            	</h3>
            </div>
        );
    }
});

var LoginBanner = React.createClass({
    render: function() {
        return (
            <div className="usa-da-color-gray-light-half-tone usa-da-login-container">
                <div className="usa-grid">
                    <LoginIntro/>
                   <LoginPanel/>
                </div>
            </div>
        );
    }
});

var LoginPage = React.createClass({
    render: function() {
        return (
        	<div className="usa-da-login">
                <LoginBanner/>
			</div>
		);
    }
});


module.exports.LoginPage = LoginPage;
