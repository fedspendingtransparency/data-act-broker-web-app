/**
* RegisterEmailBanner.jsx
* Created by Kevin Li 4/14/2016
**/

import React, { PropTypes } from 'react';
import RegistrationEmailInput from './RegistrationEmailInput.jsx';
import LoginIntro from '../login/LoginIntro.jsx';
import SignInButton from '../login/SignInButton.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';

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
            text: '',
            success: false,
            error: false
        }
    }

    componentDidMount() {
        this.checkForErrorMessage(this.props.errors);
    }

    componentWillReceiveProps(nextProps) {
        this.checkForErrorMessage(nextProps.errors);
    }

    checkForErrorMessage(error) {
        if (error.hasOwnProperty('errorCode')) {
            if (error.errorCode == 3 || error.errorCode == 2) {
                this.setState({
                    text: 'The registration link provided has already been used or has expired. You can provide your email address again if you need to complete your account registration.',
                    error: true,
                    success: false
                });
            }
            else if (error.errorCode == 1) {
                this.setState({
                    text: 'The registration link you entered is not a valid registration link. You can register for a new account here by providing a .gov or .mil email address.',
                    error: true,
                    success: false
                });
            }
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
                    text: 'An email has been sent to this address. Please follow the link within this email to verify your email address. Check your spam folder for messages from the DATA Act Broker if you don\'t receive an email shortly.',
                    buttonText: 'Submitted!',
                    success: true,
                    error: false
                });
            })
            .catch(() => {
                this.setState({
                    disabled: false,
                    buttonText: 'Submit',
                    text: 'There was an error. If you already have an account, please login or reset your password.',
                    error: true,
                    success: false
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
        if (e.charCode === enterKey && !this.state.disabled) {
            e.preventDefault();
            this.submitEmail();
        }
    }

    render() {

        let messageComponent = '';
        if (this.state.success) {
            messageComponent = <SuccessMessage message={this.state.text} />;
        }
        else if (this.state.error) {
            messageComponent = <ErrorMessage message={this.state.text} />
        }

        let hideButton = '';
        if (this.state.success) {
            hideButton = 'hide';
        }

        return (
            <div className="login-banner-wrap">
                <div className="usa-da-login-wrap">
                    <div className="container">
                        <div className="row">
                            <LoginIntro />
                            <div className="col-md-5 usa-da-login-container">
                                <div className="row">
                                    <div className="col-xs-12">
                                        <p className="msg">A .gov or .mil email address is preferred when registering for access to the DATA Act Broker. If you do not have a .gov or .mil email address, you may be required to provide an appropriate agency point of contact to verify your registration.</p>
                                    </div>
                                </div>
                                <form onKeyPress={this.handleKeyPress.bind(this)}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <RegistrationEmailInput setButtonDisabled={this.setButtonDisabled.bind(this)} onChange={this.emailChanged.bind(this)} value={this.state.email} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 usa-da-registration-links mt-20">
                                            <a href="#/login" className="forgot-back">Back to login page</a>
                                        </div>
                                        <div className="col-xs-6 usa-da-login-button-holder">
                                            <div className={hideButton}>
                                                <SignInButton disabled={this.state.disabled} onClick={this.submitEmail.bind(this)} buttonText={this.state.buttonText} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            {messageComponent}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterEmailBanner.propTypes = propTypes;
