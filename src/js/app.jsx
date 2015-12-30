import React            from 'react';
import ReactDOM         from 'react-dom';
import Base64           from './vendor/base64.min.js';
import {Router}         from 'director';
import LoginPage        from './components/LoginComponents.jsx';
import RegistrationPage from './components/registration/RegistrationPage.jsx';
import LandingPage      from './components/LandingComponents.jsx';
import AddDataPage      from './components/addData/AddDataPage.jsx';

var documentLocation = document.getElementById('app');

var loginPageRoute = function() {
    ReactDOM.render(
        <LoginPage />,
        documentLocation
    );
};

var registrationPageRoute = function(stepName) {
    ReactDOM.render(
        <RegistrationPage stepName={stepName} />,
        documentLocation
    );
};

var landingPageRoute = function() {
    ReactDOM.render(
        <LandingPage />,
        documentLocation
    );
};

var addDataPageRoute = function() {
    ReactDOM.render(
        <AddDataPage />,
        documentLocation
    );
};

// Define the route URL patterns

var routes = {
    '/': loginPageRoute,
    '/registration/:stepName' : registrationPageRoute,
    '/landing': landingPageRoute,
    '/addData': addDataPageRoute
};

// Start the routes
var router = Router(routes);
router.init('/');
