import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'director';
import LoginPage from './components/login/LoginPage.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';
import ForgotPasswordPage from './components/forgotPassword/ForgotPasswordPage.jsx';
import LandingPage from './components/landing/LandingPage.jsx';
import AddDataPage from './components/addData/AddDataPage.jsx';
import ReviewDataPage from './components/addData/ReviewDataPage.jsx';

const documentLocation = document.getElementById('app');

const loginPageRoute = () => {
    ReactDOM.render(
        <LoginPage />,
        documentLocation
    );
};

const registrationPageRoute = (stepName) => {
    ReactDOM.render(
        <RegistrationPage stepName={stepName} />,
        documentLocation
    );
};

const forgotPasswordPageRoute = (stepName) => {
    ReactDOM.render(
        <ForgotPasswordPage stepName={stepName} />,
        documentLocation
    );
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

// Define the route URL patterns

const routes = {
    '/': loginPageRoute,
    '/registration/:stepName': registrationPageRoute,
    '/forgotpassword': forgotPasswordPageRoute,
    '/landing': landingPageRoute,
    '/addData': addDataPageRoute,
    '/reviewData': reviewDataPageRoute,
    '/reviewData/:subID': reviewDataPageRoute
};

// Start the routes
Router(routes).init('/');
