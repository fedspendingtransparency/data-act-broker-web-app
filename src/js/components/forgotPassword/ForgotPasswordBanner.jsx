/**
* ForgotPasswordBanner.jsx
* Created by Kyle Fox 2/23/16
**/

import React, { PropTypes } from 'react';
import LoginIntro from '../login/LoginIntro.jsx';
import ForgotPasswordPanel from './ForgotPasswordPanel.jsx';

const propTypes = {
    token: PropTypes.string
};

export default class ForgotPasswordBanner extends React.Component {
    render() {
        return (
            <div className="usa-da-color-gray-light-eighth-tone">
                <div className="container">
                    <div className="row">
                        <LoginIntro/>
                        <ForgotPasswordPanel token={this.props.token}/>
                    </div>
                </div>
            </div>
        );
    }
}

ForgotPasswordBanner.propTypes = propTypes;
