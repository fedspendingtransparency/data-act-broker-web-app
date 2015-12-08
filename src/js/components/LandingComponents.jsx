/**
* LandingComponents.jsx
* Created by Kyle Fox 12/4/15
**/

var React = require('react');


var LandingHeader = React.createClass({
    render: function() {
        return (
            <header className="usa-site-header usa-color-gray">
                <div className="usa-site-navbar usa-da-navbar usa-grid-full">
                    <div className="usa-width-one-sixth usa-color-text-white">
                        <h1>Data Portal</h1>
                    </div>
                    <div className="usa-width-two-thirds">
                        <ul className="usa-button-list usa-unstyled-list">
                            <li><a className="usa-button usa-button-active usa-button-primary-alt" href="#">Home</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#">Add New Data</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#">Performance Dashboard</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#">Documentation</a></li>
                        </ul>
                    </div>
                    <div className="usa-color-text-gray-dark usa-width-one-sixth align-right">
                    <span className="align-right">Logged in as:<br/> <strong>Agency Name</strong></span>
                    </div>
                </div>
            </header>
        );
    }
});

var LandingContent = React.createClass({
    render: function() {
        return (
            <div className="usa-da-content">
                <h1>Welcome to the Data Broker</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis</p>
                <div className="usa-grid">
                    <div className="usa-width-one-half">
                        <a className="usa-button usa-da-button-biggest usa-button-primary-alt" href="#">Add & Validate New Data</a>
                    </div>
                    <div className="usa-width-one-half">
                        <a className="usa-button usa-da-button-biggest usa-button-primary-alt" href="#">Performance Dashboard</a>
                    </div>
                </div>
            </div>
        );
    }
});

var LandingPage = React.createClass({
    render: function() {
        return (
            <div>
            <LandingHeader/>
            <LandingContent/>
            </div>
		);
    }
});


module.exports.LandingPage = LandingPage;
