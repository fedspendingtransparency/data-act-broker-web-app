/**
* RegistrationComponents.js
* Created by Kyle Fox 12/11/15
**/

var React = require('react');
var NavigationComponents  = require('./NavigationComponents.js');

class EmailComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonClass: 'usa-button-disabled'
        };
    }

    handleChange(e) {
        var inputText = e.target.value;
        var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;
        var newButtonClass;

        // Activate submit button if input is either .mil or .gov email address
        if (inputText.match(emailRegex)) {
            newButtonClass = 'usa-button';
        } else {
            newButtonClass = 'usa-button-disabled';
        }

        this.setState({
            buttonClass: newButtonClass
        });
    }

    render() {
        return (
            <div>
                <label for="input-registration-email">Registration Email</label>
                <input id="input-registration-email" name="input-registration-email" placeholder="Please enter your .gov or .mil email address" type="text" onChange={this.handleChange.bind(this)} />
                <button className={this.state.buttonClass}>Verify this email address</button>
            </div>
        );
    }
}

class RegistrationContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content">
                <h1>Registration</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                <EmailComponent />
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
