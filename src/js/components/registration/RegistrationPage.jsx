/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
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
                <div className="usa-da-content-dark mb-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mt-50 mb-30">
                                <div className="display-2">Registration</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-offset-2 col-md-8">
                            <ConfirmCode email={this.props.email} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;
RegistrationPage.defaultProps = defaultProps;
