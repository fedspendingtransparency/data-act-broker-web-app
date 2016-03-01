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
            firstName: '',
            lastName: '',
            name: '',
            agency: '',
            title: '',
            requestSent: false,
            resetFailed: false,
            password1: '',
            password2: '',
            passwordsMatch: true
        };
    }

    requestReset() {
        if (this.state.password1 === this.state.password2) {
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
            this.setState({
                passwordsMatch: false
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

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleAgencyChange(e) {
        this.setState({
            agency: e.target.value
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handlePassword1Change(e) {
        console.log('password1');
        this.setState({
            password1: e.target.value
        });
    }

    handlePassword2Change(e) {
        console.log('password2');
        this.setState({
            password2: e.target.value
        });
    }
    render() {
        let messageComponent = null;

        if (!this.state.passwordsMatch) {
            messageComponent = <ErrorMessage message={"Your passwords do not match."} />;
        } else if (this.state.requestSent) {
            if (this.state.resetFailed) {
                messageComponent = <ErrorMessage message={"We could not register your account at this time."} />;
            } else {
                messageComponent = <SuccessMessage message={"Account successfully created."} />;
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
                    <SubmitButton
                      onClick={this.requestReset.bind(this)}
                      buttonText={"Submit"}
                    />
                    {messageComponent}
                </div>
        );
    }
}
