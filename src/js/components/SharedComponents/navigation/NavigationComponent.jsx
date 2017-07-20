/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../../GlobalConstants.js';
import NavbarTab from './NavbarTab.jsx';
import UserButton from './UserButton.jsx';
import SkipNavigationLink from './SkipNavigationLink.jsx';
import TestEnvironmentBanner from '../banners/TestEnvironmentBanner.jsx';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as sessionActions from '../../../redux/actions/sessionActions.js';
import * as PermissionHelper from '../../../helpers/permissionsHelper.js';

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
            admin: false,
            skipGuide: false
        });
    }

    getTabs() {
        let tabNames = {};
        if (this.props.session.user.helpOnly) {
            tabNames = {
                'Help': 'help'
            };
        }
        else if (this.props.session.admin || PermissionHelper.checkPermissions(this.props.session)){
            tabNames = {
                'Home': 'landing',
                'Upload & Validate New Submission': 'submissionGuide',
                'Submission Dashboard': 'dashboard',
                'Help': 'help'
            };
        } else {
            tabNames = {
                'Home': 'landing',
                'Upload & Validate New Submission': 'disabled',
                'Submission Dashboard': 'dashboard',
                'Help': 'help'
            };
        }
        return tabNames;
    }

    render() {
        let tabNames = this.getTabs();
        

        let headerTabs = [];
        const context = this;
        const userText = this.props.session.user === '' ? '' : this.props.session.user.name;

        let userButton = null;
        if (this.props.session.login == "loggedIn") {
            userButton = <UserButton buttonText={userText} logout={this.logout.bind(this)} />;
        }

        Object.keys(tabNames).map((key) => {
            headerTabs.push(<NavbarTab key={tabNames[key]} name={key} tabClass={tabNames[key]} activeTabClassName={context.props.activeTab} />);
        });

        if (this.props.logoOnly) {
            headerTabs = null;
        }

        let testBanner = null;
        let navClass = "";
        if (kGlobalConstants.STAGING) {
            navClass = " tall";
            testBanner = <TestEnvironmentBanner />
        }

        return (
            <nav className={"navbar navbar-default usa-da-header" + navClass}>
                <SkipNavigationLink />
                <a className="hidden-screen-reader" href="#">Home</a>
                {testBanner}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 usa-da-top-head">
                            <div className="container">
                                <ul className="usa-da-top-head-menu mr-15">
                                    {userButton}
                                </ul>
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
