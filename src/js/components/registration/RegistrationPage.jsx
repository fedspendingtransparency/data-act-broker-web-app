/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import EmailComponent from './RegistrationEmailComponent.jsx';
import RegisterEmailPanel from './RegisterEmailPanel.jsx';
import ConfirmCode from './ConfirmCodeComponent.jsx';

const propTypes = {
    stepName: PropTypes.string.isRequired,
    message: PropTypes.string
};

// Default to showing email input page
const defaultProps = {
    stepName: 'email'
};

export default class RegistrationPage extends React.Component {
    render() {
        let currentComponent;

        if (this.props.stepName === 'email') {
            currentComponent = <RegisterEmailPanel resend={false} />;
        } else if (this.props.stepName === 'code') {
            if (this.props.message === 'Link already used') {
                currentComponent = <RegisterEmailPanel resend={true} />
            }
            else if (this.props.message == 'success') {
                currentComponent = <ConfirmCode />;
            }
            
        }

        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <div className="container">
                        <h1>Registration</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                        {currentComponent}
                    </div>
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;
RegistrationPage.defaultProps = defaultProps;
