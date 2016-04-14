/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import EmailComponent from './RegistrationEmailComponent.jsx';
import RegisterEmailPage from './RegisterEmailPage.jsx';
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
        return (
            <div>
                <Navbar logoOnly={true} />
                <div className="usa-da-content">
                    <div className="container usa-da-registration">
                        <div className="display-2">Registration</div>
                        <div className="row text-center">
                            <div className="col-sm-12 col-md-offset-3 col-md-6">
                                <ConfirmCode email={this.props.email} />
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
