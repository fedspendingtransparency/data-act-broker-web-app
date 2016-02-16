import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'director';
import LoginPage from './components/LoginComponents.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';
import LandingPage from './components/LandingComponents.jsx';
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

const reviewDataPageRoute  = (subID) => {
    ReactDOM.render(
        <ReviewDataPage  subID={subID} />,
        documentLocation
    );
};

// Define the route URL patterns

const routes = {
    '/': loginPageRoute,
    '/registration/:stepName': registrationPageRoute,
    '/landing': landingPageRoute,
    '/addData': addDataPageRoute,
    '/reviewData': reviewDataPageRoute,
    '/reviewData/:subID': reviewDataPageRoute
};

// Start the routes
Router(routes).init('/');
