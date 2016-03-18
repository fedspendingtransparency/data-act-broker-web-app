/**
* RouterContainer.jsx
* Created by Kevin Li 3/16/15
**/

import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from '../GlobalConstants.js';
import { Router, Route, Link, hashHistory } from 'react-router';

import Request from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../redux/actions/sessionActions.js';

import { routes } from './RouterRoutes.jsx';

const ga = require('react-ga');
const GA_OPTIONS = { debug: true };

export default class RouterContainer extends React.Component {
    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
        routes.setStore(this.props.store);
        this.loadActiveUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.session.login == "loggedIn" && prevProps.session.login != "loggedIn") {
            this.autoLogin(this.refs.router.state.location);
        }
    }

    loadActiveUser() {
        Request.get(kGlobalConstants.API + 'current_user/')
            .withCredentials()
            .send()
            .end((err, res) => {
                if (err) {
                    this.props.setLoginState("loggedOut");
                }
                else {
                    this.props.setLoginState("loggedIn");
                    this.props.setActiveUser(res.body);

                    this.autoLogin(this.refs.router.state.location);
                }
            });
    }

    autoLogin(location) {
        let path = location.pathname;
        let search = location.search;
        // check if the user is going to the login page
        if (path == "/login") {
            if (this.props.session.login == "loggedIn") {
                // user is logged in, go to landing page
                if (search != "" && location.query.hasOwnProperty('redirect')) {
                    // a redirect option was provided
                    hashHistory.push(location.query.redirect);
                }
                else {
                    hashHistory.push('/');
                }
            }
        }
        else {
            if (this.props.session.login != "loggedIn") {

                if (path == "/login") {
                    hashHistory.push('/login');
                }
                else {
                    hashHistory.push('/login?redirect=' + path);
                }
            }
        }
    }

    handleRouteChange() {
        let path = this.refs.router.state.location.pathname;
        

        this.logPageView(path);

        this.autoLogin(this.refs.router.state.location);
    
    }

    logPageView(path) {
        
        ga.pageview(path);
    }

    render() {

        return (
            <Router routes={routes.routes()} history={hashHistory} onUpdate={this.handleRouteChange.bind(this)} ref="router" />
        );

    }
}


export default connect(
    state => ({
        session: state.session
    }),
    dispatch => bindActionCreators(sessionActions, dispatch)
)(RouterContainer)