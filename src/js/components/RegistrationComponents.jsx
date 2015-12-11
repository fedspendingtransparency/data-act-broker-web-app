/**
* RegistrationComponents.jsx
* Created by Kyle Fox 12/11/15
**/

var React = require('react');
var NavigationComponents  = require('./NavigationComponents');

class RegistrationContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content">
                <h1>Registration</h1>
            </div>
        );
    }
}

class RegistrationPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationComponents.Navbar />
                <RegistrationContent />
            </div>
        );
    }
}

module.exports.RegistrationPage = RegistrationPage;
