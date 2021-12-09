/**
* LoginContainer.jsx
* Created by Kevin Li 3/17/16
*/

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoginPanel from 'components/login/LoginPanel';
import LoginMax from 'components/login/LoginMax';
import LoginBannerMessage from 'components/login/LoginBannerMessage';
import * as LoginHelper from 'helpers/loginHelper';
import * as sessionActions from 'redux/actions/sessionActions';
import { kGlobalConstants } from '../../GlobalConstants';
import * as ReviewHelper from '../../helpers/reviewHelper';

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
            errorMessage: '',
            bannerMessage: null
        };
    }

    componentDidMount() {
        this.getBanners();
    }

    getBanners() {
        ReviewHelper.listBanners(true)
            .then((res) => {
                if (!res.data) {
                    return;
                }
                this.setState({ bannerMessage: res.data[0] });
            })
            .catch((err) => {
                console.error(err);
            });
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
                        errorMessage: 'Your browser does not support cookies, which the DATA Act Broker requires ' +
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
        let login = <LoginMax {...this.props} />;

        if (kGlobalConstants.LOCAL) {
            login = (<LoginPanel
                {...this.props}
                performLogin={this.performLogin.bind(this)}
                loading={this.state.loading}
                errorMessage={this.state.errorMessage} />);
        }

        let loginBannerMessage = '';
        if (this.state.bannerMessage) {
            loginBannerMessage = <LoginBannerMessage {...this.state.bannerMessage} />;
        }

        return (
            <div className="login-right usa-da-login-container">
                {loginBannerMessage}
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
