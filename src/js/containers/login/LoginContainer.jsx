/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPanel from 'components/login/LoginPanel';
import LoginCaia from 'components/login/LoginCaia';
import Banner from 'components/SharedComponents/Banner';
import * as LoginHelper from 'helpers/loginHelper';
import * as sessionActions from 'redux/actions/sessionActions';
import { kGlobalConstants } from '../../GlobalConstants';

const propTypes = {
    location: PropTypes.object
};

const defaultProps = {
    location: {}
};

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errorMessage: ''
        };
    }

    performLogin(username, password) {
        this.setState({
            loading: true
        });

        LoginHelper.performLogin(username, password)
            .catch((err) => {
                if (err === "cookie") {
                    this.setState({
                        loading: false,
                        errorMessage: 'Your browser does not support cookies, which Data Broker requires ' +
                            'to function correctly. Try changing your browser settings to enable cookies or use a ' +
                            'different browser.'
                    });
                }
                else {
                    this.setState({
                        loading: false,
                        errorMessage: err
                    });
                }
            });
    }

    render() {
        let login = <LoginCaia {...this.props} />;

        if (kGlobalConstants.LOCAL) {
            login = (<LoginPanel
                {...this.props}
                performLogin={this.performLogin.bind(this)}
                loading={this.state.loading}
                errorMessage={this.state.errorMessage} />);
        }

        return (
            <div className="login-right usa-da-login-container">
                <Banner type="login" />
                {login}
            </div>
        );
    }
}

LoginContainer.propTypes = propTypes;
LoginContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({ session: state.session }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(LoginContainer);
