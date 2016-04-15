/**
* RegisterEmailBanner.jsx
* Created by Kevin Li 4/14/2016
**/

import React, { PropTypes } from 'react';
import RegistrationEmailInput from './RegistrationEmailInput.jsx';
import LoginIntro from '../login/LoginIntro.jsx';
import SignInButton from '../login/SignInButton.jsx';

import * as LoginHelper from '../../helpers/loginHelper.js';

import { hashHistory } from 'react-router';


const propTypes = {
    errorCode: PropTypes.number,
    message: PropTypes.string,
    email: PropTypes.string
};

export default class RegisterEmailBanner extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            buttonText: 'Submit',
            email: '',
            text: 'A .gov or .mil email address is preferred when registering for access to the data broker.  If you do not have a .gov or .mil email address, please contact your agency administrator.'
        }
    }

    setButtonDisabled(disabled) {
        // TODO: Restore validation for production
        // this.setState({
        //     disabled: disabled
        // });
    }

    submitEmail() {
        this.setState({
            disabled: true,
            buttonText: 'Submitting...'
        });
        LoginHelper.registerEmail(this.state.email)
            .then(() => {
                this.setState({
                    text: 'An email has been sent to this address. Please follow the link within this email to verify your email address.',
                    buttonText: 'Submitted!'
                });
            })
            .catch(() => {
                this.setState({
                    disabled: false,
                    buttonText: 'Submit',
                    text: 'There was an error. If you already have an account, please login or reset your password.'
                });
            });
    }

    emailChanged(value) {
        let disabled = false;
        if (value == '') {
            disabled = true;
        }

        this.setState({
            email: value,
            disabled: disabled
        });
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            e.preventDefault();
            this.submitEmail();
        }
    }

    render() {

        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <LoginIntro />
                    <div className="col-md-5 usa-da-login-container">
                        <div className="col-xs-12">
                            <p className="msg">{this.state.text}</p>
                        </div>
                        <form onKeyPress={this.handleKeyPress.bind(this)}>
                            <div className='row'>
                                <RegistrationEmailInput setButtonDisabled={this.setButtonDisabled.bind(this)} onChange={this.emailChanged.bind(this)} value={this.state.email} />
                            </div>
                            <div className='row'>
                                <div className="col-xs-6 usa-da-registration-links mt-10">
                                    <a href="#/login" className="forgot-back">Back to login page</a>
                                </div>
                                <div className="col-xs-6 usa-da-login-button-holder">
                                    <SignInButton disabled={this.state.disabled} onClick={this.submitEmail.bind(this)} buttonText={this.state.buttonText} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterEmailBanner.propTypes = propTypes;
