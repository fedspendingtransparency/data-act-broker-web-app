var React        = require('react');
var ReactDOM     = require('react-dom');
var Router       = require('director').Router;
var Login        = require('./components/LoginComponents.jsx');
var Registration = require('./components/RegistrationComponents.jsx');
var Landing      = require('./components/LandingComponents.jsx');
var Submission   = require('./components/SubmissionPage.jsx');

var loginPageRoute = function() {
    ReactDOM.render(
        <Login.LoginPage />,
        document.getElementById('app')
    );
};

var registrationPageRoute = function() {
    ReactDOM.render(
        <Registration.RegistrationPage />,
        document.getElementById('app')
    );
};

var landingPageRoute = function() {
    ReactDOM.render(
        <Landing.LandingPage />,
        document.getElementById('app')
    );
};

var submissionPageRoute = function() {
    ReactDOM.render(
        <Submission.SubmissionPage />,
        document.getElementById('app')
    );
};

// Define the route URL patterns

var routes = {
    '/': loginPageRoute,
    '/registration' : registrationPageRoute,
    '/landing': landingPageRoute,
    '/submit': submissionPageRoute
};

// Start the routes
var router = Router(routes);
router.init('/');
