/**
* LandingContent.jsx
* Created by Kyle Fox 2/19/16
**/

import React from 'react';

export default class LandingContent extends React.Component {
    render() {
        return (
            <div>
                <div className="usa-da-content-dark">
                    <div className="container">
                        <div className="row usa-da-content-landing">
                            <div className="col-md-6">
                                <h1>Welcome to the Data Broker</h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                    tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Nam fermentum, nulla luctus pharetra vulputate, felis</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row usa-da-button-landing-holder">
                            <div className="col-md-6">
                                <a className="usa-da-button-landing" href="#/addData">Add & Validate New Data</a>
                            </div>
                            <div className="col-md-6">
                                <a className="usa-da-button-landing disabled" href="#">Performance Dashboard
                                    <div><em>Coming Soon</em></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
