/**
* ConfirmCodeComponent.jsx
* Created by Kyle Fox 12/11/15
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../login/SignInButton.jsx';
import PasswordComponent from '../login/Password.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import ErrorMessageList from '../SharedComponents/ErrorMessageList.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';
import SubmitRegButton from './SubmitButton.jsx';


const propTypes = {
    email: PropTypes.string
};

export default class ConfirmCode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            agency: '',
            title: '',
            requestSent: false,
            resetFailed: false,
            password1: '',
            password2: '',
            passwordsMatch: true,
            fieldsComplete: null,
            buttonDisabled: true,
            passwordErrors: []
        };
    }

    requestReset() {
        if ((this.state.password1 === this.state.password2) && this.state.name && this.state.agency && this.state.title && this.state.password1) {
            Request.post(kGlobalConstants.API + 'register/')
                   .withCredentials()
                   .send({ 'name': this.state.name,
                        'agency': this.state.agency,
                        'title': this.state.title,
                        'email': this.props.email,
                        'password': this.state.password1
                         })
                   .end((err) => {
                       if (err) {
                           this.setState({
                               requestSent: true,
                               resetFailed: true
                           });
                       } else {
                           this.setState({
                               requestSent: true,
                               resetFailed: false
                           });
                       }
                   });
        } else {
            this.fieldValidation();
        }
    }

    fieldValidation() {
        let fieldEmpty= !this.state.name || !this.state.agency || !this.state.title || !this.state.password1 || !this.state.password2;
        let passMatch = this.state.password1 === this.state.password2;


        let errorMessages = []
        if(this.state.password1.length < 8) {
            errorMessages.push("Password must be at least 8 characters in length.");
        }
        if (!this.state.password1.match(/[a-z]/)) {
            errorMessages.push("Password must contain at least one lowercase letter.");
        }
        if (!this.state.password1.match(/[A-Z]/)) {
            errorMessages.push("Password must contain at least one uppercase letter.");
        }
        if (!this.state.password1.match(/\d/i)) {
            errorMessages.push("Password must contain at least one number.");
        }
        if (!this.state.password1.match(/[\[\]\{\}~!@#$%^,.?;<>]/i)) {
            errorMessages.push("Password must contain at least one of the following characters [ ] { } ~ ! @ # $ % ^, . ? ;");
        }
        this.setState({passwordErrors:errorMessages});


        if (fieldEmpty && !passMatch) {
            this.setState({
                fieldsComplete: false,
                passwordsMatch: false,
                buttonDisabled: true
            });
        } else if (fieldEmpty && passMatch) {
            this.setState({
                fieldsComplete: false,
                passwordsMatch: true,
                buttonDisabled: true
            });
        } else if (!fieldEmpty && !passMatch) {
            this.setState({
                fieldsComplete: true,
                passwordsMatch: false,
                buttonDisabled: true
            });
        } else {
            this.setState({
                fieldsComplete: true,
                passwordsMatch: true,
                buttonDisabled: errorMessages.length > 0
            });
        }
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.requestReset();
            e.preventDefault();
        }
    }

    handleFieldChange(e) {
        switch(e.target.name) {
            case "regName":
                this.setState({name: e.target.value}, function() {
                    this.fieldValidation()
                });
            break;
            case "regTitle":
                this.setState({title: e.target.value}, function() {
                    this.fieldValidation()
                });
            break;
            case "regAgency":
                this.setState({agency: e.target.value}, function() {
                    this.fieldValidation()
                });
            break;
            case "regPassword1":
                this.setState({password1: e.target.value}, function() {
                    this.fieldValidation()
                });
            break;
            case "regPassword2":
                this.setState({password2: e.target.value}, function() {
                    this.fieldValidation()
                });
            break;
        }
    }

    render() {
        let messageComponent = null;
        let passMessageComponent = null;
        let actionComponent = null;
        let actionButton =  <SubmitRegButton
                                onClick={this.requestReset.bind(this)}
                                buttonText="Complete Registration"
                                buttonDisabled={this.state.buttonDisabled}
                              />

        if (!this.state.fieldsComplete) {
            messageComponent = <ErrorMessage message={"All fields are required."} />;
        }
        if(this.state.passwordErrors.length == 1) {
            passMessageComponent = <ErrorMessage message={this.state.passwordErrors[0]}/>;
        }
        else if(this.state.passwordErrors.length > 1) {
            passMessageComponent = <ErrorMessageList errorMessages={this.state.passwordErrors}/>;
        }
        else if (!this.state.passwordsMatch) {
            passMessageComponent = <ErrorMessage message={"Your passwords do not match."} />;

        }
        if  (this.state.passwordsMatch && this.state.fieldsComplete==true) {
            passMessageComponent = <div></div>;
            actionComponent = actionButton;
            if (this.state.requestSent) {
                if (this.state.resetFailed) {
                    messageComponent = <ErrorMessage message={"We could not register your account at this time."} />;
                } else {
                    messageComponent = <SuccessMessage message={"Account successfully created."} />;
                    actionComponent = <div></div>;
                }
            }
        }
        return (
                <div className="row">
                    <h2>Your email has been verified!</h2>
                    <p>Please continue the registration process by providing the following information.</p>
                    <TextInputComponent inputClass="" inputPlaceholder="Name" inputName="regName" handleChange={this.handleFieldChange.bind(this)}/>
                    <TextInputComponent inputClass="" inputPlaceholder="Agency" inputName="regAgency" handleChange={this.handleFieldChange.bind(this)} />
                    <TextInputComponent inputClass="" inputPlaceholder="Title" inputName="regTitle" handleChange={this.handleFieldChange.bind(this)} />
                    <PasswordComponent fieldID="regPassword1" handleChange={this.handleFieldChange.bind(this)}/>
                    <PasswordComponent fieldID="regPassword2" handleChange={this.handleFieldChange.bind(this)}/>
                    {passMessageComponent}
                    {messageComponent}
                    {actionComponent}
                </div>
        );
    }
}
