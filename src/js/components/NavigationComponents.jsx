/**
* NavigationComponents.jsx
* Created by Katie Rose 12/8/15
**/

import React from 'react';

class Navbar extends React.Component {
    render() {
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
}

module.exports.Navbar = Navbar;

