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
                <div className="usa-da-content usa-da-content-dark">
                    <div className="usa-grid">
                        <div className="usa-width-one-half">
                            <h1>Welcome to the Data Broker</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                                Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                                tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                Nam fermentum, nulla luctus pharetra vulputate, felis</p>
                        </div>
                    </div>
                </div>
                <div className="usa-da-content">
                    <div className="usa-grid">
                        <div className="usa-width-one-half">
                            <a className="usa-da-button-landing" href="/#/addData">Add & Validate New Data</a>
                        </div>
                        <div className="usa-width-one-half">
                            <a className="usa-da-button-landing" href="#">Performance Dashboard</a>
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
