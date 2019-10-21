/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { kGlobalConstants } from '../../../GlobalConstants';
import NavbarTab from './NavbarTab';
import UserButton from './UserButton';
import SkipNavigationLink from './SkipNavigationLink';
import TestEnvironmentBanner from '../banners/TestEnvironmentBanner';
import * as sessionActions from '../../../redux/actions/sessionActions';
import * as PermissionHelper from '../../../helpers/permissionsHelper';

const propTypes = {
    setSession: PropTypes.func,
    session: PropTypes.object,
    type: PropTypes.string,
    logoOnly: PropTypes.bool
};

const defaultProps = {
    setSession: () => {},
    session: null,
    type: '',
    logoOnly: false
};

export class Navbar extends React.Component {
    getTabs() {
        // default access: only Help page
        let tabNames = {
            Help: 'help'
        };

        if (this.props.logoOnly) {
            tabNames = {};
        }
        else if (this.props.type === 'fabs') {
            // user has FABS permissions
            const fabsWrite = this.props.session.admin || PermissionHelper.checkFabsPermissions(this.props.session);
            tabNames = {
                Home: 'FABSlanding',
                'Upload & Validate New Submission': fabsWrite ? 'FABSaddData' : 'disabled',
                'Submission Table': 'FABSsubmissionTable',
                Help: 'FABShelp'
            };
        }
        else if (this.props.type === 'dabs') {
            // user has DABS permissions
            const dabsWrite = this.props.session.admin || PermissionHelper.checkPermissions(this.props.session);
            tabNames = {
                Home: 'landing',
                'Upload & Validate New Submission': dabsWrite ? 'submissionGuide' : 'disabled',
                'Submission Table': 'submissionTable',
                Help: 'help'
            };
        }
        return tabNames;
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

    render() {
        const tabNames = this.getTabs();

        const context = this;
        const userText = this.props.session.user === '' ? '' : this.props.session.user.name;

        let userButton = null;
        if (this.props.session.login === "loggedIn") {
            userButton = <UserButton buttonText={userText} logout={this.logout.bind(this)} />;
        }

        const headerTabs = Object.keys(tabNames).map((key) => (
            <NavbarTab
                key={tabNames[key]}
                name={key}
                tabClass={tabNames[key]}
                activeTabClassName={context.props.activeTab} />
        ));

        let navClass = "";
        let testBanner = null;
        if (!kGlobalConstants.PROD) {
            navClass = " tall";
            testBanner = <TestEnvironmentBanner />;
        }

        return (
            <nav className={`navbar navbar-default usa-da-header${navClass}`}>
                <SkipNavigationLink />
                <button className="hidden-screen-reader" href="#">Home</button>
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
                            <button
                                type="button"
                                className="navbar-toggle collapsed"
                                data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand usa-da-header-brand" href="#/">DATA Act Broker</a>
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

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(Navbar);
