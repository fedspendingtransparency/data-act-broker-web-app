/**
* LoginPanel.jsx
* Created by Kyle Fox 2/19/16
*/

import React, { PropTypes } from 'react';
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

const defaultProps = {
    performLogin: null,
    session: null,
    errorMessage: '',
    loading: false
};

export default class LoginPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    loginClicked() {
        this.props.performLogin(this.state.username, this.state.password);
    }

    handleKeyPress(e) {
        const enterKey = 13;
        if (e.charCode === enterKey) {
            this.loginClicked();
            e.preventDefault();
        }
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        let errorMessageComponent = null;

        if (this.props.session.login === "failed") {
            errorMessageComponent = <ErrorMessage message={this.props.errorMessage} />;
        }

        return (
            <div className="login-form-wrap">
                <form>
                    <div className="row">
                        <div className="col-md-12">
                            <Username handleChange={this.handleUsernameChange.bind(this)} tabIndex="0" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Password handleChange={this.handlePasswordChange.bind(this)} tabIndex="0" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-offset-4 col-md-8">
                            <SignInButton
                                onClick={this.loginClicked.bind(this)}
                                buttonText="Sign In"
                                disabled={this.props.loading} />
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
    }
}

LoginPanel.propTypes = propTypes;
LoginPanel.defaultProps = defaultProps;
