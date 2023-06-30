import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as LoginHelper from '../../helpers/loginHelper';
import * as sessionActions from '../../redux/actions/sessionActions';

const propTypes = {
    children: PropTypes.node,
    session: PropTypes.shape({
        login: PropTypes.string,
        user: PropTypes.shape({
            affiliations: PropTypes.arrayOf(PropTypes.shape({
                permission: PropTypes.string
            }))
        })
    }),
    authFn: PropTypes.func,
    location: PropTypes.shape({
        key: PropTypes.string, // 'ac3df4', ** not with HashHistory!
        pathname: PropTypes.string, // '/somewhere'
        search: PropTypes.string, // '?some=search-string',
        hash: PropTypes.string, // '#howdy',
        state: PropTypes.shape({}) // user defined based on calls to history.push()
    }),
    history: PropTypes.shape({
        length: PropTypes.number, // The number of entries in the history stack
        action: PropTypes.string, // The current action (PUSH, REPLACE, or POP)
        location: PropTypes.shape({}), // The current location. May have the following properties:
        pathname: PropTypes.string, // The path of the URL
        search: PropTypes.string, // The URL query string
        hash: PropTypes.string, // The URL hash fragment
        state: PropTypes.shape({}), // location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
        push: PropTypes.func, // Pushes a new entry onto the history stack
        replace: PropTypes.func, // Replaces the current entry on the history stack
        go: PropTypes.func, // Moves the pointer in the history stack by n entries
        goBack: PropTypes.func, // Equivalent to go(-1)
        goForward: PropTypes.func, // Equivalent to go(1)
        block: PropTypes.func // Prevents navigation
    })
};

export class ProtectedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.sessionChecker = null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.session.login !== prevProps.session.login) {
            if (this.props.session.login === "loggedIn") {
                // we've switched from either a logged out state to logged in or
                // we've received session data back from the backend
                // so we should auto-relogin
                this.performAutoLogin();
                this.monitorSession();
            }
        }
    }

    componentWillUnmount() {
        window.clearImmediate(this.sessionChecker);
    }

    performAutoLogin() {
        const isAuthorized = this.props.authFn(this.props.session);
        const path = LoginHelper.getPath(this.props.location, isAuthorized);
        this.props.history.push(path);
    }

    monitorSession() {
        // start a timer to periodically check the user's session state every 15 minutes
        this.sessionChecker = setInterval(() => {
            LoginHelper.checkSession()
                .catch(() => {
                    // session expired, stop checking if it's active any more
                    clearInterval(this.sessionChecker);
                });
        }, 15 * 60 * 1000);
    }

    render() {
        if (!this.props.authFn(this.props.session)) {
            const search = `redirect=${this.props.location.pathname}`;
            return (
                <Redirect to={{
                    pathname: '/login/',
                    search
                }} />
            );
        }
        const redirectPath = LoginHelper.getRedirectPath(this.props.location, true);
        if (redirectPath !== null && this.props.location.pathname === '/login' &&
            this.props.session.login === 'loggedIn') {
            return <Redirect to={redirectPath} />;
        }
        return this.props.children;
    }
}

ProtectedComponent.propTypes = propTypes;

const ProtectedComponentContainer = connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(ProtectedComponent);

export const withAuth = (Component, props) => () => (
    <ProtectedComponentContainer {...props}>
        <Component {...props} />
    </ProtectedComponentContainer>
);

export default ProtectedComponentContainer;
