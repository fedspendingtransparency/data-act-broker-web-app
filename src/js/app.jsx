import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from './GlobalConstants.js';
import { Router, Route, Link, hashHistory } from 'react-router'
import Request from 'superagent';
import LoginPage from './components/login/LoginPage.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';
import RegisterTokenPage from './components/registration/RegisterTokenPage.jsx';
import ResetPasswordTokenPage from './components/forgotPassword/ResetPasswordTokenPage.jsx';
import CompleteRegistrationComponent from './components/registration/ConfirmCodeComponent.jsx';
import ForgotPasswordPage from './components/forgotPassword/ForgotPasswordPage.jsx';
import LandingPage from './components/landing/LandingPage.jsx';
import AddDataPage from './components/addData/AddDataPage.jsx';
import ReviewDataPage from './components/addData/ReviewDataPage.jsx';
import AdminPage from './components/admin/AdminPage.jsx';

const documentLocation = document.getElementById('app');


const checkAdminPermissions = (nextState, replace) => {
  //TODO Add check For Permissions
}

const checkUserPermissions = (nextState, replace) => {
  //TODO Add check For User Permissions
}

const redirectIfLogin = (nextState, replace) => {
   //TODO Add check For User Permissions

}

const debugRoute = (nextState,replace) => {

}


ReactDOM.render((
  <Router history={hashHistory}>
      <Route path="login" component={LoginPage} onEnter={checkAdminPermissions}/>
      <Route path="admin" component={AdminPage} onEnter={checkAdminPermissions}/>
      <Route path="landing" component={LandingPage} />
      <Route path="addData" component={AddDataPage} onEnter={checkUserPermissions} />
      <Route path="reviewData" component={ReviewDataPage} />
      <Route path="reviewData/:subID" component={ReviewDataPage} />
      <Route path="forgotpassword" component={ForgotPasswordPage} />
      <Route path="forgotpassword/:token" component={ResetPasswordTokenPage} />
      <Route path="registration" component={RegistrationPage} />
      <Route path="registration/:token" component={RegisterTokenPage} />
      <Route path="*" component={LoginPage} onEnter={debugRoute}/>
  </Router>
), documentLocation)
