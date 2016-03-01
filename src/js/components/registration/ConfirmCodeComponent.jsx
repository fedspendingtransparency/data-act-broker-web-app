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
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';


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
            fieldsComplete: null
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
        if (!this.state.name || !this.state.agency || !this.state.title || !this.state.password1) {
            if (this.state.requestSent) {
                this.setState({
                    fieldsComplete: false
                });
            } else {
                this.setState({
                    fieldsComplete: false
                });                    
            }
        }
        else {
            this.setState({
                fieldsComplete: true
            });                
        }
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.requestReset();
            e.preventDefault();
            this.fieldValidation();
        }
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
        this.fieldValidation();
    }

    handleAgencyChange(e) {
        this.setState({
            agency: e.target.value
        });
        this.fieldValidation();
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
        this.fieldValidation();
    }

    handlePassword1Change(e) {
            if (this.state.password2 === e.target.value) {
                this.setState({
                    password1: e.target.value,
                    passwordsMatch: true
                });                
            } else {
                this.setState({
                    password1: e.target.value,
                    passwordsMatch: false
                });                
            }
            this.fieldValidation();
    }

    handlePassword2Change(e) {
            if (this.state.password1 === e.target.value) {
                this.setState({
                    password2: e.target.value,
                    passwordsMatch: true
                });                
            } else {
                this.setState({
                    password2: e.target.value,
                    passwordsMatch: false
                });                
            }
            this.fieldValidation();

    }
    render() {
        let messageComponent = null;
        let passMessageComponent = null;
        let actionComponent = null;
        let actionButton = <SubmitButton
                    className="usa-da-button"
                    onClick={this.requestReset.bind(this)}
                    buttonText={"Submit"}
                    />;

        if (!this.state.fieldsComplete) {
            actionComponent = <ErrorMessage message={"All fields are required."} />;
        }
        if (!this.state.passwordsMatch) {
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
                }
            }
        }
        return (
                <div className="row">
                    <Progress totalSteps="4" currentStep="3"/>
                    <h1>Your email has been verified!</h1>
                    <p>Please continue the registration process by providing the following information.</p>
                    <TextInputComponent inputClass="" inputPlaceholder="Name" inputName="regName" handleChange={this.handleNameChange.bind(this)}/>
                    <TextInputComponent inputClass="" inputPlaceholder="Agency" inputName="regAgency" handleChange={this.handleAgencyChange.bind(this)} />
                    <TextInputComponent inputClass="" inputPlaceholder="Title" inputName="regTitle" handleChange={this.handleTitleChange.bind(this)} />
                    <PasswordComponent handleChange={this.handlePassword1Change.bind(this)}/>
                    <PasswordComponent handleChange={this.handlePassword2Change.bind(this)}/>
                    {passMessageComponent}
                    {actionComponent}
                    {messageComponent}
                </div>
        );
    }
}
