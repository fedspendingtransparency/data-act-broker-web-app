/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React from 'react';
import NavbarTab from './NavbarTab.jsx';

export default class Navbar extends React.Component {
    render() {
        const tabNames = {
            'Home': 'landing',
            'Add New Data': 'addData',
            'Review Data': 'reviewData',
            'Performance Dashboard': 'dashboard',
            'Documentation': 'documentation'
        };
        const headerTabs = [];
        const context = this;

        Object.keys(tabNames).map((key) => {
            headerTabs.push(<NavbarTab key={tabNames[key]} name={key} class={tabNames[key]} activeTabClassName={context.props.activeTab} />);
        });

        return (
            <nav className="navbar navbar-default usa-da-header">
            <div className="container usa-da-header-container">
                <div className="navbar-header usa-da-header-navbar">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand usa-da-header-brand" href="#">Data Broker</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul id="usa-da-header-link-holder" className="nav navbar-nav navbar-right">
                    {headerTabs}
                    <li><a className="usa-da-header-link usa-da-user-info" href="#">John Doe</a></li>
                </ul>
                </div>
            </div>
            </nav>
        );
    }
}
