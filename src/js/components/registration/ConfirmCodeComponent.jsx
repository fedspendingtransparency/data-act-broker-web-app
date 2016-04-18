/**
* ConfirmCodeComponent.jsx
* Created by Kyle Fox 12/11/15
**/

import React, { PropTypes } from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import _ from 'lodash';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../login/SignInButton.jsx';
import PasswordComponent from '../login/Password.jsx';
import ErrorMessage from '../SharedComponents/ErrorMessage.jsx';
import ErrorMessageList from '../SharedComponents/ErrorMessageList.jsx';
import SuccessMessage from '../SharedComponents/SuccessMessage.jsx';
import SubmitRegButton from './SubmitButton.jsx';

import * as LoginHelper from '../../helpers/loginHelper.js';

const propTypes = {
    email: PropTypes.string
};

const defaultProps = {
    requiredFields: ['name', 'agency', 'title', 'password1'],
    allFields: ['name', 'agency', 'title', 'password1', 'password2'],
    fieldMappings: {
        name: 'Name',
        agency: 'Agency',
        title: 'Title',
        password1: 'Password'
    }
}

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
            passwordErrors: [],
            passwordsMatch: true,
            fieldsComplete: null,
            buttonDisabled: true,
            buttonText: 'Complete Registration',
            nameTouched: false,
            agencyTouched: false,
            titleTouched: false,
            password1Touched: false,
            password2Touched: false,
            nameError: false,
            agencyError: false,
            titleError: false,
            password1Error: false,
            password2Error: false,
            validationErrors: [],
            ready: false
        };
    }

    requestReset() {
        if (this.state.ready) {

            let account = {
                name: this.state.name,
                agency: this.state.agency,
                title: this.state.title,
                email: this.props.email,
                password: this.state.password1
            };

            this.setState({
                buttonDisabled: true,
                buttonText: 'Submitting...'
            });

            LoginHelper.registerAccount(account)
                .then(() => {
                    this.setState({
                        requestSent: true,
                        resetFailed: false,
                        buttonDisabled: false,
                        buttonText: 'Complete Registration'
                    });
                })
                .catch(() => {
                    this.setState({
                        requestSent: true,
                        resetFailed: true,
                        buttonText: 'Complete Registration'
                    });
                });
        }
        else {
            this.fieldValidation();
        }
    }

    passwordValidation(password) {
        const errors = [];

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters in length.');
        }
        if (!password.match(/[a-z]/)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!password.match(/[A-Z]/)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!password.match(/\d/i)) {
            errors.push('Password must contain at least one number.');
        }
        if (!password.match(/[\[\]\{\}~!@#$%^,.?;<>]/i)) {
            errors.push('Password must contain at least one of the following characters: [ ] { } ~ ! @ # $ % ^, . ? ;');
        }
        return errors;
    }

    fieldValidation() {

        let errorMessages = [];
        let isReady = false;
        let buttonDisabled = true;

        const invalidFields = [];

        let missingCount = 0;
        let untouchedFields = false;

        this.props.requiredFields.forEach((field) => {   
            if (this.state[field] == '' && this.state[field + 'Touched']) {
                // user has focused this field before but not entered a value
                errorMessages.push(this.props.fieldMappings[field] + ' is required.');
                invalidFields.push(field);
                missingCount++;
            }
            else if (!this.state[field + 'Touched']) {
                untouchedFields = true;
            }
        });
        

        if (missingCount == this.props.requiredFields.length) {
            // no field was filled out
            errorMessages = ['All fields are required.'];
        }

        // validate passwords
        if (this.state.password1 != '') {
            const passwordErrors = this.passwordValidation(this.state.password1);
            if (passwordErrors.length > 0) {
                invalidFields.push('password1');
                errorMessages = _.union(errorMessages, passwordErrors);
            }
            else {

                if (!this.state.password2Touched) {
                    invalidFields.push('password2');
                    errorMessages.push('You must verify your password by retyping it.');
                }

                else if (this.state.password2Touched && this.state.password1 != this.state.password2) {
                    invalidFields.push('password2');
                    errorMessages.push('Your passwords do not match.');
                }
            }
        }
        
        if (errorMessages.length == 0) {
            isReady = true;

            if (!untouchedFields) {
                buttonDisabled = false;
            }
        }

        let updatedState = {
            validationErrors: errorMessages,
            ready: isReady,
            buttonDisabled: buttonDisabled
        };

        
        this.props.allFields.forEach((field) => {
            if (_.indexOf(invalidFields, field) > -1) {
                updatedState[field + 'Error'] = true;
            }
            else {
                updatedState[field + 'Error'] = false;
            }
            
        });
        

        this.setState(updatedState);

    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.requestReset();
            e.preventDefault();
        }
    }

    handleFieldChange(name,e) {
        this.setState({
            [name]: e.target.value,
            [name + 'Touched']: true
        }, function() {
            this.fieldValidation();
        });
    }

    render() {
        let messageComponent = null;
        let passMessageComponent = null;
        const actionButton =  <SubmitRegButton
                                onClick={this.requestReset.bind(this)}
                                buttonText={this.state.buttonText}
                                buttonDisabled={this.state.buttonDisabled}
                              />;

        let actionComponent = actionButton;

        if (this.state.requestSent) {
            if (this.state.resetFailed) {
                messageComponent = <ErrorMessage message={"We could not register your account at this time."} />;
            }
            else {
                messageComponent = <SuccessMessage message={"Your account has been requested. You will receive an email once your account is approved. You will not be able to log in until your account is approved."} />;
                actionComponent = '';
            }
        }
        else if (this.state.ready) {
            messageComponent = '';
        }
        else if (this.state.validationErrors.length > 0) {
            messageComponent = <ErrorMessageList errorMessages={this.state.validationErrors} />;
        }

        return (
                <div className="row">
                    <h2>Your email has been verified!</h2>
                    <p>Please continue the registration process by providing the following information.</p>
                    <TextInputComponent inputClass="" error={this.state.nameError} inputPlaceholder="Name" inputName="regName" handleChange={this.handleFieldChange.bind(this, 'name')} />
                    <TextInputComponent inputClass="" error={this.state.agencyError} inputPlaceholder="Agency" inputName="regAgency" handleChange={this.handleFieldChange.bind(this, 'agency')} />
                    <TextInputComponent inputClass="" error={this.state.titleError} inputPlaceholder="Title" inputName="regTitle" handleChange={this.handleFieldChange.bind(this,'title')} />
                    <PasswordComponent fieldID="regPassword1" error={this.state.password1Error} iconClass="usa-da-icon-register" handleChange={this.handleFieldChange.bind(this,'password1')} />
                    <p>Please include an uppercase letter, a lowercase letter, a number, and a special character [ ] { } ~ ! @ # $ % ^, . ? ; in your password.</p>
                    <PasswordComponent fieldID="regPassword2" error={this.state.password2Error} iconClass="usa-da-icon-register" handleChange={this.handleFieldChange.bind(this,'password2')} />
                    {messageComponent}
                    {actionComponent}
                </div>
        );
    }
}

ConfirmCode.defaultProps = defaultProps;
