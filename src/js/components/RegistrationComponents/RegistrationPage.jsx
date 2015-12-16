/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import Navbar from '../NavigationComponents.jsx';
import EmailComponent from './RegistrationEmailComponent.jsx';

export default class RegistrationPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <h1>Registration</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                    <EmailComponent />
                </div>
            </div>
        );
    }
}
