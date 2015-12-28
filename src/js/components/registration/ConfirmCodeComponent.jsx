/**
* ConfirmCodeComponent.jsx
* Created by Kyle Fox 12/11/15
**/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/NavigationComponents.jsx';
import TextInputComponent from '../SharedComponents/TextInputComponent.jsx';
import PasswordInputComponent from '../SharedComponents/PasswordInputComponent.jsx';
import DiscreteProgressBarComponent from '../SharedComponents/DiscreteProgressBarComponent.jsx';


export default class ConfirmCode extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <DiscreteProgressBarComponent progressCurrentStep="3" progressTotalSteps="4" />
                    <h1>Your email has been verified!</h1>
                    <p>Please continue the registration process by providing the following information.</p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="First Name" inputName="regFirstName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Last Name" inputName="regLastName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Phone Number" inputName="regPhoneNumber" /></p>
                    <p><PasswordInputComponent inputClass="" inputPlaceholder="Password" inputName="regPassword" /></p>
                    <p><PasswordInputComponent inputClass="" inputPlaceholder="Confirm Password" inputName="regConfirmPassword" /></p>
                </div>
            </div>
        );
    }
}
