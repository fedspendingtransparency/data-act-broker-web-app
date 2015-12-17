/**
 * RegConfirmationPage.jsx
 * Created by Katie Rose 12/17/15
 **/

import React, { PropTypes } from 'react';
import Navbar from '../NavigationComponents.jsx';
import TextInputComponent from './TextInputComponent.jsx';
import DiscreteProgressBarComponent from './DiscreteProgressBarComponent.jsx';


export default class RegistrationPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <DiscreteProgressBarComponent />
                    <h1>Your email has been verified!</h1>
                    <p>Please continue the registration process by providing the following information.</p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="First Name" inputName="regFirstName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Last Name" inputName="regLastName" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Phone Number" inputName="regPhoneNumber" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Password" inputName="regPassword" /></p>
                    <p><TextInputComponent inputClass="" inputPlaceholder="Confirm Password" inputName="regConfirmPassword" /></p>
                </div>
            </div>
        );
    }
}
