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
            // if (this.props.message === 'Link already used') {
                // currentComponent = <RegisterEmailPanel resend={true} />
            // }
            // else if (this.props.message == 'success') {
                currentComponent = <ConfirmCode email="kevin@email.com"/>;
            // }
        }

        return (
            <div>
                <Navbar logoOnly={true} />
                <div className="usa-da-content">
                    <div className="container usa-da-registration">
                        <div className="display-2">Registration</div>
                        <div className="row text-center">
                            <div className="col-sm-12 col-md-offset-3 col-md-6">
                                {currentComponent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;
RegistrationPage.defaultProps = defaultProps;
