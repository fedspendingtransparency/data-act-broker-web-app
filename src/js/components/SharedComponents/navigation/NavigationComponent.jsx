/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../../GlobalConstants.js';
import Request from 'superagent';
import NavbarTab from './NavbarTab.jsx';
import UserButton from './UserButton.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../../redux/actions/sessionActions.js';

export class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    logout(e) {
        e.preventDefault();
        this.props.setSession({
            login: 'loggedOut',
            user: {},
            admin: false
        });
    }

    render() {
        let tabNames = {
            'Home': 'landing',
            'Add New Data': 'addData',
            'Performance Dashboard': 'dashboard',
            'Help': 'help'
        };

        const headerTabs = [];
        const context = this;
        const userText = this.props.session.user === '' ? '' : 'Welcome, ' + this.props.session.user.name;

        if (this.props.session.admin) {
            tabNames['Admin'] = 'admin';
        }

        let userButton = "";
        if (this.props.session.login == "loggedIn") {
            userButton = <UserButton buttonText={userText} logout={this.logout.bind(this)} />;
        }


        // TODO: Remove admin once redux is in place
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
                        <a className="navbar-brand usa-da-header-brand" href="#/landing">DATA Act Broker</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul id="usa-da-header-link-holder" className="nav navbar-nav navbar-right">
                            {headerTabs}
                            {userButton}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default connect(
  state => ({ session: state.session }),
  dispatch => bindActionCreators(sessionActions, dispatch)
)(Navbar)
