import React from 'react';
import ReactDOM from 'react-dom';
import { kGlobalConstants } from './GlobalConstants.js';
import { Router } from 'director';
import Request from 'superagent';
import LoginPage from './components/login/LoginPage.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';
import CompleteRegistrationComponent from './components/registration/ConfirmCodeComponent.jsx';
import ForgotPasswordPage from './components/forgotPassword/ForgotPasswordPage.jsx';
import LandingPage from './components/landing/LandingPage.jsx';
import AddDataPage from './components/addData/AddDataPage.jsx';
import ReviewDataPage from './components/addData/ReviewDataPage.jsx';
import AdminPage from './components/admin/AdminPage.jsx';

const documentLocation = document.getElementById('app');

const loginPageRoute = () => {
    ReactDOM.render(
        <LoginPage />,
        documentLocation
    );
};

const registrationPageRoute = (token) => {
    if (token) {
        Request.post(kGlobalConstants.API + 'confirm_email_token/')
               .withCredentials()
               .send({ 'token': token })
               .end((err, res) => {
                   if (err) {
                       console.log(err);
                   } else {
                       ReactDOM.render(
                            <RegistrationPage stepName='code' email={res.body.email} message={res.body.message} />,
                            documentLocation
                        );
                   }
               });
    } else {
        ReactDOM.render(
            <RegistrationPage stepName='email' />,
            documentLocation
        );
    }

};

const forgotPasswordPageRoute = (token) => {
    if (token) {
        Request.post(kGlobalConstants.API + 'confirm_password_token/')
               .withCredentials()
               .send({ 'token': token })
               .end((err, res) => {
                   if (err) {
                       console.log(err);
                   } else {
                       ReactDOM.render(
                            <ForgotPasswordPage errorCode={res.body.errorCode} message={res.body.message} email={res.body.email} />,
                            documentLocation
                        );
                   }
               });
    } else {
        ReactDOM.render(
            <ForgotPasswordPage />,
            documentLocation
        );
    }

};

const landingPageRoute = () => {
    ReactDOM.render(
        <LandingPage />,
        documentLocation
    );
};

const addDataPageRoute = () => {
    ReactDOM.render(
        <AddDataPage />,
        documentLocation
    );
};

const reviewDataPageRoute = (subID) => {
    ReactDOM.render(
        <ReviewDataPage subID={subID} />,
        documentLocation
    );
};

const adminPageRoute = () => {
    ReactDOM.render(
        <AdminPage />,
        documentLocation
    );
};

// Define the route URL patterns

const routes = {
    '/': loginPageRoute,
    '/registration': {
        '/:token': {
            on: registrationPageRoute
        },
        on: registrationPageRoute
    },
    // '/registration/:stepName': registrationPageRoute,
    '/forgotpassword': {
        '/:token': {
            on: forgotPasswordPageRoute
        },
        on: forgotPasswordPageRoute
    },
    '/landing': landingPageRoute,
    '/addData': addDataPageRoute,
    '/reviewData': reviewDataPageRoute,
    '/reviewData/:subID': reviewDataPageRoute,
    '/admin': adminPageRoute
};

// Start the routes
Router(routes).init('/');
