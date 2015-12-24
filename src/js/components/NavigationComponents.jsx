/**
* NavigationComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React from 'react';

export default class Navbar extends React.Component {
    render() {
        return (
            <header className="usa-site-header usa-da-header">
                <div className="usa-site-navbar usa-grid-full usa-da-header-navbar">
                    <div className="usa-width-one-sixth usa-color-text-white usa-da-header-title">
                        <h1>Data Broker</h1>
                    </div>
                    <div className="usa-width-two-thirds usa-da-header-link-holder">
                        <ul className="usa-button-list usa-unstyled-list usa-da-navbar-links">
                            <li><a className="usa-button usa-button-active usa-button-primary-alt" href="#">Home</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#/addData">Add New Data</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#">Performance Dashboard</a></li>
                            <li><a className="usa-button usa-button-primary-alt" href="#">Documentation</a></li>
                            <li><a className="usa-button usa-button-primary-alt usa-da-navbar-user-info" href="#">John Doe</a></li>
                        </ul>
                    </div>
                    <div className="usa-color-text-gray-dark usa-width-one-sixth align-right">
                    <span className="align-right">Logged in as:<br/> <strong>Agency Name</strong></span>
                    </div>
                </div>
            </header>
        );
    }
}
