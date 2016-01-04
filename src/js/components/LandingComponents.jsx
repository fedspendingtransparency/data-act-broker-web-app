/**
* LandingComponents.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from './SharedComponents/NavigationComponent.jsx';
import Footer from './SharedComponents/FooterComponent.jsx';

class LandingContent extends React.Component {
    render() {
        return (
            <div>
                <div className="usa-da-content-dark">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Welcome to the Data Broker</h1>
                                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                    Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                    tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Nam fermentum, nulla luctus pharetra vulputate, felis</h3>
                            </div>
                            <div className="col-md-6">

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="container">
                        <div className="row usa-da-button-landing-holder">
                            <div className="col-md-6">
                                <a className="usa-da-button-landing" href="/#/addData">Add & Validate New Data</a>
                            </div>
                            <div className="col-md-6">
                                <a className="usa-da-button-landing" href="#">Performance Dashboard</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default class LandingPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab='landing'/>
                <LandingContent/>
                <Footer/>
            </div>
        );
    }
}
