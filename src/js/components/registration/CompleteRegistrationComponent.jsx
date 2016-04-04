/**
* CompleteRegistrationComponent.jsx
* Created by Katie Rose on 2/25/16
**/

import React from 'react';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';
import PasswordInputComponent from '../SharedComponents/PasswordInputComponent.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';
import SubmitButton from '../login/SignInButton.jsx';

export default class ConfirmCode extends React.Component {
    render() {
        return (
                <div className="row">
                    <Progress totalSteps="4" currentStep="3"/>
                    <div className="display2">Your email has been verified!</div>
                    <p>Please continue the registration process by providing the following information.</p>
                    <TextInputComponent inputClass="" inputPlaceholder="First Name" inputName="regFirstName" />
                    <TextInputComponent inputClass="" inputPlaceholder="Last Name" inputName="regLastName" />
                    <TextInputComponent inputClass="" inputPlaceholder="Agency" inputName="regAgency" />
                    <TextInputComponent inputClass="" inputPlaceholder="Title" inputName="regTitle" />
                    <PasswordInputComponent inputClass="" inputPlaceholder="Set Password" inputName="regPassword" />
                    <PasswordInputComponent inputClass="" inputPlaceholder="Confirm Password" inputName="regConfirmPassword" />

                </div>
        );
    }
}
