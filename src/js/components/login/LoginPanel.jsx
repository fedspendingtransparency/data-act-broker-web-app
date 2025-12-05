/**
* LoginPanel.jsx
* Created by Kyle Fox 2/19/16
*/

import { useState } from 'react';
import PropTypes from 'prop-types';
import Username from './Username';
import Password from './Password';
import SignInButton from './SignInButton';
import ErrorMessage from '../SharedComponents/ErrorMessage';

const propTypes = {
    performLogin: PropTypes.func,
    session: PropTypes.object,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool
};

const LoginPanel = ({performLogin = null, session = null, errorMessage = '', loading = false}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginClicked = () => {
        performLogin(username, password);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    let errorMessageComponent = null;

    if (session.login === "failed") {
        errorMessageComponent = <ErrorMessage message={errorMessage} />;
    }

    return (
        <div className="login-form-wrap">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <Username handleChange={handleUsernameChange} tabIndex="0" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Password handleChange={handlePasswordChange} tabIndex="0" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-offset-4 col-md-8">
                        <SignInButton
                            onClick={loginClicked}
                            buttonText="Sign In"
                            disabled={loading} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {errorMessageComponent}
                    </div>
                </div>
            </form>
        </div>
    );
};

LoginPanel.propTypes = propTypes;
export default LoginPanel;
