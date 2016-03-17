/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../../GlobalConstants.js';
import Request from 'superagent';
import NavbarTab from './NavbarTab.jsx';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestSent: false,
            resetFailed: false,
            user: this.requestReset(),
            // TODO: Remove admin once redux is in place
            admin: false
        };
    }

    requestReset() {
        Request.get(kGlobalConstants.API + 'current_user/')
               .withCredentials()
               .end((err,res) => {
                   if (err) {
                       this.setState({
                           requestSent: true,
                           resetFailed: true,
                           user: ''
                       });
                   // TODO: Remove admin once redux is in place
                   } else {
                       this.setState({
                           requestSent: true,
                           resetFailed: false,
                           user: res.body.name,
                           admin: res.body.permissions[0] > 0
                       });
                   }
               });
    }

    render() {
        const tabNames = {
            'Home': 'landing',
            'Add New Data': 'addData',
            'Performance Dashboard': 'dashboard',
            'Help': 'help',
            'Admin': 'admin'
        };

        const headerTabs = [];
        const context = this;
        const userText = this.state.user === '' ? '' : 'Welcome, ' + this.state.user;

        // TODO: Remove admin once redux is in place
        const admin = this.state.admin;

        // TODO: Remove admin once redux is in place
        Object.keys(tabNames).map((key) => {
            headerTabs.push(<NavbarTab key={tabNames[key]} name={key} class={tabNames[key]} activeTabClassName={context.props.activeTab} admin={admin} />);
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
                        <a className="navbar-brand usa-da-header-brand" href="#/landing">USA Spending Data Broker</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul id="usa-da-header-link-holder" className="nav navbar-nav navbar-right">
                            {headerTabs}
                            <li>
                                <a className="usa-da-header-link usa-da-user-info" href="#">{userText}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
