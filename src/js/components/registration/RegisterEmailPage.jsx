/**
* RegisterEmailPage.jsx
* Created by Kevin Li 4/14/2016
**/

import React, { PropTypes } from 'react';
import RegisterEmailBanner from './RegisterEmailBanner.jsx';
import LoginTopBar from '../login/LoginTopBar.jsx';
import LoginWarningTxt from '../login/LoginWarningTxt.jsx';

const propTypes = {
    errorCode: PropTypes.number,
    message: PropTypes.string,
    email: PropTypes.string
};

const defaultProps = {
    message: ''
};

export default class RegisterEmailPage extends React.Component {
    render() {
        return (
            <div className="usa-da-login container-fluid">
                <LoginTopBar/>
                <RegisterEmailBanner message={this.props.message} />
                <LoginWarningTxt/>
            </div>
        );
    }
}

RegisterEmailPage.propTypes = propTypes;
RegisterEmailPage.defaultProps = defaultProps;