/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/NavigationComponents.jsx';
import EmailComponent from './RegistrationEmailComponent.jsx';
import ConfirmCode from './ConfirmCodeComponent.jsx';

const propTypes = {
    stepName: PropTypes.string.isRequired,
};

// Default to showing email input page
const defaultProps = {
    stepName: 'email'
};

export default class RegistrationPage extends React.Component {

    constructor(props) {
        super(props);
        var currentComponent = this.setComponentTo(props.stepName);
        // Set initial component
        this.state = {
            currentComponent: currentComponent
        };
    }

    componentWillReceiveProps(props) {
        var currentComponent = this.setComponentTo(props.stepName);
        this.setState({
            currentComponent: currentComponent
        });
    }

    setComponentTo(componentToRender) {
        var currentComponent;

        if (componentToRender === 'email') {
            currentComponent = <EmailComponent />;
        } else if (componentToRender === 'code') {
            currentComponent = <ConfirmCode />;
        }

        return currentComponent;
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="usa-da-content">
                    <h1>Registration</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.</p>
                    {this.state.currentComponent}
                </div>
            </div>
        );
    }
}

RegistrationPage.propTypes = propTypes;
RegistrationPage.defaultProps = defaultProps;
