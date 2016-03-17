/**
* RouterContainer.jsx
* Created by Kevin Li 3/16/15
**/

import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from '../GlobalConstants.js';
import { Router, Route, Link, hashHistory } from 'react-router';
import Request from 'superagent';
import LoginPage from '../components/login/LoginPage.jsx';
import RegistrationPage from '../components/registration/RegistrationPage.jsx';
import RegisterTokenPage from '../components/registration/RegisterTokenPage.jsx';
import ResetPasswordTokenPage from '../components/forgotPassword/ResetPasswordTokenPage.jsx';
import CompleteRegistrationComponent from '../components/registration/ConfirmCodeComponent.jsx';
import ForgotPasswordPage from '../components/forgotPassword/ForgotPasswordPage.jsx';
import LandingPage from '../components/landing/LandingPage.jsx';
import AddDataPage from '../components/addData/AddDataPage.jsx';
import ReviewDataPage from '../components/addData/ReviewDataPage.jsx';
import AdminPage from '../components/admin/AdminPage.jsx';

const ga = require('react-ga');
const GA_OPTIONS = { debug: true };


export default class RouterContainer extends React.Component {
    componentDidMount() {
        ga.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
    }
    checkAdminPermissions(nextState, replace) {
        //TODO Add check For Permissions
    }
    checkUserPermissions(nextState, replace) {
        //TODO Add check For User Permissions
    }
    redirectIfLogin(nextState, replace) {
        //TODO Add check For User Permissions
    }
    debugRoute(nextState, replace) {

    }
    logPageView() {
        ga.pageview(this.state.location.pathname);
    }
    render() {

        return (
            <Router history={hashHistory} onUpdate={this.logPageView}>
                <Route path="login" component={LoginPage} onEnter={this.checkAdminPermissions.bind(this)}/>
                <Route path="admin" component={AdminPage} onEnter={this.checkAdminPermissions.bind(this)}/>
                <Route path="landing" component={LandingPage} />
                <Route path="addData" component={AddDataPage} onEnter={this.checkUserPermissions.bind(this)} />
                <Route path="reviewData" component={ReviewDataPage} />
                <Route path="reviewData/:subID" component={ReviewDataPage} />
                <Route path="forgotpassword" component={ForgotPasswordPage} />
                <Route path="forgotpassword/:token" component={ResetPasswordTokenPage} />
                <Route path="registration" component={RegistrationPage} />
                <Route path="registration/:token" component={RegisterTokenPage} />
                <Route path="*" component={LoginPage} onEnter={this.debugRoute.bind(this)}/>
            </Router>
        );

    }
}