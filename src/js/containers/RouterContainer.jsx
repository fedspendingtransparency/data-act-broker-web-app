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
                }
            });
    }

    handleRouteChange() {
        var path = this.refs.router.state.location.pathname;
        if (path != "/login" && path != "/") {
            // check the authentication state, except for the login page
            
        }
        else {
            
            // if the user is logged in, bounce them to the landing page instead of the login page
            hashHistory.push('/landing');
        }

        this.logPageView(path);
    
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