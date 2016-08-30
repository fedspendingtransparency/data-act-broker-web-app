/**
 * RegistrationTokenLoadingPage.jsx
 * Created by Kevin Li 4/18/2016
 **/

import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';


export default class RegistrationTokenLoadingPage extends React.Component {
    render() {
        return (
            <div className="usa-da-registration-form-page">
                <Navbar logoOnly={true} />
                <div className="usa-da-content">
                    <div className="container usa-da-registration">
                        <div className="display-2">Verifying registration link...</div>
                    </div>
                </div>
            </div>
        );
    }
}

