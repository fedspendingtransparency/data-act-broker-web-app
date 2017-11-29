/**
* RouterContainer.jsx
* Created by Kevin Li 3/16/15
*/

import React, { PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { kGlobalConstants } from '../../GlobalConstants';
import * as sessionActions from '../../redux/actions/sessionActions';
import * as LoginHelper from '../../helpers/loginHelper';
import RouterRoutes from './RouterRoutes';

const ga = require('react-ga');

const GA_OPTIONS = { debug: false };

const propTypes = {
    session: PropTypes.object
};

const Routes = new RouterRoutes();

let sessionChecker;

class RouterContainer extends React.Component {
    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
    }

    componentDidUpdate(prevProps) {
        if (this.props.session.login !== prevProps.session.login) {
            if (this.props.session.login === "loggedIn") {
                // we've switched from either a logged out state to logged in or
                // we've received session data back from the backend
                // so we should auto-relogin
                Routes.autoLogin(this.refs.router.state.location);
                this.monitorSession();
            }
            else if (this.props.session.login === "loggedOut" && prevProps.session.login === "loggedIn") {
                this.logout();
            }
        }
    }

    logout() {
        LoginHelper.performLogout()
            .then(() => {
                hashHistory.push('/login');
            });
    }

    handleRouteChange() {
        this.logPageView(window.location.hash);
    }

    logPageView(path) {
        ga.pageview(path);
    }

    monitorSession() {
        // start a timer to periodically check the user's session state every 15 minutes
        sessionChecker = setInterval(() => {
            LoginHelper.checkSession()
                .catch(() => {
                    // session expired, stop checking if it's active any more
                    clearInterval(sessionChecker);
                });
        }, 15 * 60 * 1000);
    }

    render() {
        return (
            <Router
                routes={Routes.routes()}
                history={hashHistory}
                onUpdate={this.handleRouteChange.bind(this)}
                ref="router" />
        );
    }
}

RouterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(RouterContainer);
