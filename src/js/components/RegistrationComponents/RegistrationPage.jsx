/**
 * RegistrationPage.jsx
 * Created by Kyle Fox 12/11/15
 **/

import React, { PropTypes } from 'react';
import Navbar from '../NavigationComponents.jsx';
import EmailComponent from './RegistrationEmailComponent.jsx';
import ConfirmCode from './ConfirmCodeComponent.jsx';

const propTypes = {
    componentToRender: PropTypes.string.isRequired,
};

const defaultProps = {
    componentToRender: 'EmailComponent'
};

export default class RegistrationPage extends React.Component {

    constructor(props) {
        super(props);

        // Set initial component
        this.state = {
            currentComponent: <EmailComponent onClick={this.handleChildClick.bind(this)}/>
        };
    }

    handleChildClick(e) {
        //console.log("Clicked parent");
        this.setComponentTo('ConfirmCode');
    }

    setComponentTo(componentToRender) {
        var currentComponent;

        if (componentToRender === 'EmailComponent') {
            currentComponent = <EmailComponent onClick={this.handleChildClick.bind(this)}/>;
            console.log(self.currentComponent);
        } else if (componentToRender === 'ConfirmCode') {
            currentComponent = <ConfirmCode />;
            console.log(self.currentComponent);
        }

        this.setState({
            currentComponent: currentComponent
        });
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
