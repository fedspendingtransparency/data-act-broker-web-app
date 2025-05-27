/**
* NavigationComponent.jsx
* Created by Katie Rose 12/8/15
*/

import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from 'redux/actions/sessionActions';
import { clearSettings } from 'redux/actions/settingsActions';
import * as PermissionHelper from 'helpers/permissionsHelper';
import UserButton from 'components/SharedComponents/navigation/UserButton';
import SettingsModal from 'components/settings/SettingsModal';
import { kGlobalConstants } from '../../../GlobalConstants';
import NavbarTab from './NavbarTab';
import * as LoginHelper from '../../../helpers/loginHelper';
import SkipNavigationLink from './SkipNavigationLink';
import TestEnvironmentBanner from '../banners/TestEnvironmentBanner';

const combinedActions = {
    ...sessionActions,
    clearSettings
};

const propTypes = {
    session: PropTypes.object,
    type: PropTypes.string,
    logoOnly: PropTypes.bool,
    clearSettings: PropTypes.func
};

const defaultProps = {
    session: null,
    type: '',
    logoOnly: false
};

export class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.logout = this.logout.bind(this);
        this.openSettingsModal = this.openSettingsModal.bind(this);
        this.closeSettingsModal = this.closeSettingsModal.bind(this);
    }

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
                'DABS Dashboard': 'dashboard',
                'Submission Table': 'submissionTable',
                Help: 'help'
            };
        }
        return tabNames;
    }

    logout() {
        LoginHelper.performLogout().then((res, err) => {
            if (!err) {
                this.props.setLoggedOut();

                // unset the login state cookie
                Cookies.remove('brokerLogin');
                Cookies.remove('session');
            }
        });
    }

    openSettingsModal() {
        this.setState({
            showModal: true
        });
    }

    closeSettingsModal() {
        this.setState({
            showModal: false
        });
        this.props.clearSettings();
    }

    render() {
        const tabNames = this.getTabs();

        const context = this;
        const userText = this.props.session.user === '' ? '' : this.props.session.user.name;

        let userButton = null;
        if (this.props.session.login === "loggedIn") {
            const isSubmitter = PermissionHelper.checkSubmitterAffiliations(this.props.session);
            userButton = (<UserButton
                buttonText={userText}
                logout={this.logout}
                openSettings={this.openSettingsModal}
                isSubmitter={isSubmitter} />);
        }

        let modal = null;
        if (this.state.showModal) {
            modal = (
                <SettingsModal
                    closeModal={this.closeSettingsModal}
                    isOpen={this.state.showModal} />);
        }

        const headerTabs = Object.keys(tabNames).map((key) => (
            <NavbarTab
                key={tabNames[key]}
                name={key}
                tabClass={tabNames[key]}
                activeTabClassName={context.props.activeTab} />
        ));

        // if we have multiple header tabs, we want to stack them when the screen gets small
        let stackedSmall = '';
        if (headerTabs.length > 1) {
            stackedSmall = ' stacked';
        }

        let testBanner = null;
        if (!kGlobalConstants.PROD) {
            testBanner = <TestEnvironmentBanner />;
        }

        return (
            <nav className="navbar navbar-default usa-da-header">
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
                    <div className={`container usa-da-header-container${stackedSmall}`}>
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
                            <Link className="navbar-brand usa-da-header-brand" to="/">Data Broker</Link>
                        </div>

                        <div className="collapse navbar-collapse usa-da-header-links" id="bs-example-navbar-collapse-1">
                            <ul id="usa-da-header-link-holder" className="nav navbar-nav">
                                {headerTabs}
                            </ul>
                        </div>
                    </div>
                </div>
                {modal}
            </nav>
        );
    }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(combinedActions, dispatch)
)(Navbar);
