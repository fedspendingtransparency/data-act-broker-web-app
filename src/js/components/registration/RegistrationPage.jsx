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
    message: PropTypes.string,
    email: PropTypes.string
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
                currentComponent = <ConfirmCode email={this.props.email}/>;
            }
            
        }

        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <div className="container usa-da-registration">
                        <h1>Registration</h1>
                        <div className="row">
                            {currentComponent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;
RegistrationPage.defaultProps = defaultProps;
