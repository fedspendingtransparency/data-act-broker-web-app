var React     = require('react');
var ReactDOM  = require('react-dom');
var Router    = require('director').Router;
var Login     = require('./components/LoginComponents.jsx');

var loginPageRoute = function() {
    ReactDOM.render(
        <Login.LoginPage />,
        document.getElementById('app')
    );
};

// Define the route URL patterns

var routes = {
    '/': loginPageRoute
};

// Start the routes
var router = Router(routes);
router.init('/');
