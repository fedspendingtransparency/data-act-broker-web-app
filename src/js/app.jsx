import React            from 'react';
import ReactDOM         from 'react-dom';
import {Router}         from 'director';
import LoginPage        from './components/LoginComponents.jsx';
import RegistrationPage from './components/RegistrationComponents/RegistrationPage.jsx';
import LandingPage      from './components/LandingComponents.jsx';
import SubmissionPage   from './components/SubmissionPage.jsx';

var loginPageRoute = function() {
    ReactDOM.render(
        <LoginPage />,
        document.getElementById('app')
    );
};

var registrationPageRoute = function(stepName) {
    ReactDOM.render(
        <RegistrationPage stepName={stepName} />,
        document.getElementById('app')
    );
};

var landingPageRoute = function() {
    ReactDOM.render(
        <LandingPage />,
        document.getElementById('app')
    );
};

var submissionPageRoute = function() {
    ReactDOM.render(
        <SubmissionPage />,
        document.getElementById('app')
    );
};

// Define the route URL patterns

var routes = {
    '/': loginPageRoute,
    '/registration/:stepName' : registrationPageRoute,
    '/landing': landingPageRoute,
    '/submit': submissionPageRoute
};

// Start the routes
var router = Router(routes);
router.init('/');
