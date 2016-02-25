/**
* CompleteRegistrationComponent.jsx
* Created by Katie Rose on 2/25/16
**/

import React from 'react';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';
import PasswordInputComponent from '../SharedComponents/PasswordInputComponent.jsx';
import Progress from '../SharedComponents/ProgressComponent.jsx';

export default class ConfirmCode extends React.Component {
    render() {
        return (
                <div className="row">
                    <Progress totalSteps="4" currentStep="3"/>
                    <h1>Your email has been verified!</h1>
                    <p>Please continue the registration process by providing the following information.</p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="First Name" inputName="regFirstName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Last Name" inputName="regLastName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Phone Number" inputName="regPhoneNumber" /></p>
                    <p><PasswordInputComponent inputClass="" inputPlaceholder="Password" inputName="regPassword" /></p>
                    <p><PasswordInputComponent inputClass="" inputPlaceholder="Confirm Password" inputName="regConfirmPassword" /></p>
                </div>
        );
    }
}
