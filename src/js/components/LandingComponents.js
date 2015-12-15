/**
* LandingComponents.js
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import NavigationComponents from './NavigationComponents.js';

 class LandingContent extends React.Component {
 	  render() {
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
}

 class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationComponents.Navbar/>
                <LandingContent/>
            </div>
        );
    }
}

module.exports.LandingPage = LandingPage;
