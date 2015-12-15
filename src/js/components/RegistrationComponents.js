/**
* RegistrationComponents.js
* Created by Kyle Fox 12/11/15
**/

var React = require('react');
var NavigationComponents  = require('./NavigationComponents.js');

// A standard button for submission that we can further turn into a sharable component
class SubmitEmailButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttonClass: 'usa-button-disabled'
        };
    }

    componentWillReceiveProps(props) {
        var newButtonClass;

        if (props.buttonDisabled) {
            newButtonClass = 'usa-button-disabled';
        } else {
            newButtonClass = 'usa-button';
        }

        this.setState({
            buttonClass: newButtonClass
        });
    }

    emailSubmitted(e) {
        console.log("Clicked!");
    }

    render() {
        return (
            <button className={this.state.buttonClass} onClick={this.emailSubmitted.bind(this)} disabled={this.props.buttonDisabled}>Verify this email address</button>
        );
    }
}

// An email input field that does basic validation for .mil and .gov emails 
class EmailComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buttonDisabled: true
        };
    }

    handleChange(e) {
        var inputText = e.target.value;
        // Regex for matching foo@bar.mil or foo@bar.gov
        var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(?:gov|mil)$/;
        var newButtonDisabled;

        // Activate submit button if input is either .mil or .gov email address
        if (inputText.match(emailRegex)) {
            newButtonDisabled = false;
        } else {
            newButtonDisabled = true;
        }

        this.setState({
            buttonDisabled: newButtonDisabled
        });
    }

    render() {
        return (
            <div>
                <label for="input-registration-email">Registration Email</label>
                <input id="input-registration-email" name="input-registration-email" placeholder="Please enter your .gov or .mil email address" type="text" onChange={this.handleChange.bind(this)} />
                <SubmitEmailButton buttonDisabled={this.state.buttonDisabled}/>
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
