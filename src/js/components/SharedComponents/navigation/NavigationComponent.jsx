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

const defaultProps = {
    logoOnly: false
};

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
            'Submission Dashboard': 'dashboard',
            'Help': 'help'
        };

        let headerTabs = [];
        const context = this;
        const userText = this.props.session.user === '' ? '' : this.props.session.user.name;

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

        if (this.props.logoOnly) {
            headerTabs = null;
            userButton = null;
        }

        return (
            <nav className="navbar navbar-default usa-da-header">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 usa-da-top-head">
                        <div className="container">
                            {userButton}
                        </div>
                    </div>
                </div>
                </div>
                <div className="container-fluid">
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
                        </ul>
                    </div>
                </div>
                </div>
            </nav>
        );
    }
}

Navbar.defaultProps = defaultProps;

export default connect(
  state => ({ session: state.session }),
  dispatch => bindActionCreators(sessionActions, dispatch)
)(Navbar)
