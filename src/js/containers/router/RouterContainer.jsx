/**
* RouterContainer.jsx
* Created by Kevin Li 3/16/15
**/

import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from '../../GlobalConstants.js';
import { Router, Route, Link, hashHistory } from 'react-router';

import Request from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../redux/actions/sessionActions.js';

import * as LoginHelper from '../../helpers/loginHelper.js';

import RouterRoutes from './RouterRoutes.jsx';

const ga = require('react-ga');
const GA_OPTIONS = { debug: true };

const Routes = new RouterRoutes();

export default class RouterContainer extends React.Component {
    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
    }

    componentDidUpdate(prevProps) {
        if (this.props.session.login == "loggedIn" && prevProps.session.login != "loggedIn") {
            // we've switched from either a logged out state to logged in or we've received session data back from the backend
            // so we should auto-relogin
            Routes.autoLogin(this.refs.router.state.location);
        }
        else if (this.props.session.login == "loggedOut") {
            if (prevProps.session.login != "loggedOut" && prevProps.session.login != "pending") {
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
        let path = this.refs.router.state.location.pathname;
        this.logPageView(path);
    }

    logPageView(path) {
        ga.pageview(path);
    }

    render() {
        return (
            <Router routes={Routes.routes()} history={hashHistory} onUpdate={this.handleRouteChange.bind(this)} ref="router" />
        );

    }
}


export default connect(
    state => ({
        session: state.session
    }),
    dispatch => bindActionCreators(sessionActions, dispatch)
)(RouterContainer)