import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as LoginHelper from '../../helpers/loginHelper';
import * as sessionActions from '../../redux/actions/sessionActions';

const propTypes = {
    permissionsTest: PropTypes.func,
    redirectPath: PropTypes.string,
    children: PropTypes.node,
    session: PropTypes.shape({
        login: PropTypes.string,
        user: PropTypes.shape({
            affiliations: PropTypes.arrayOf(PropTypes.shape({
                permission: PropTypes.string
            }))
        })
    }),
    location: PropTypes.shape({
        key: PropTypes.string, // 'ac3df4', ** not with HashHistory!
        pathname: PropTypes.string, // '/somewhere'
        search: PropTypes.string, // '?some=search-string',
        hash: PropTypes.string, // '#howdy',
        state: PropTypes.shape({}) // user defined based on calls to history.push()
    }),
    // match: PropTypes.shape({
    //     params: PropTypes.shape({}), // Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
    //     isExact: PropTypes.bool, // true if the entire URL was matched (no trailing characters)
    //     path: PropTypes.string, // The path pattern used to match. Useful for building nested <Route>s
    //     url: PropTypes.string // The matched portion of the URL. Useful for building nested <Link>s
    // }),
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

class ProtectedComponent extends React.Component {
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
            else if (this.props.session.login === "loggedOut" && prevProps.session.login === "loggedIn") {
                this.logout();
            }
        }
    }

    performAutoLogin() {
        const { pathname, search } = this.props.location;
        const isAuthorized = (this.props.session.login === 'loggedIn');
        const shouldPerformAutoLogin = (pathname === '/login' && isAuthorized);
        if (!isAuthorized) {
            if (pathname !== '/login') {
                // We should refactor this in the future to use Redirect
                this.props.history.push(`/login?redirect=${pathname}`);
            }
            this.props.history.push('/login');
        }
        else if (shouldPerformAutoLogin) {
            const queryStrings = queryString.parse(search); // '?foo=bar' --> { foo: 'bar' }
            const hasRedirectQueryString = Object.keys(queryStrings).includes('redirect');
            if (hasRedirectQueryString) {
                this.props.history(queryStrings.redirect);
            }
            this.props.history.push('/');
        }
    }

    logout() {
        LoginHelper.performLogout()
            .then(() => {
                this.props.history.push('/login');
            });
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
        // permissionTest should be one of RouterRoutes.getRoutes()
        const isAuthorized = this.props.permissionTest(this.props.session);
        if (isAuthorized !== 'authorized') {
            return <Redirect to={isAuthorized} />;
        }
        return this.props.children;
    }
}

ProtectedComponent.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(ProtectedComponent);


export const AuthHOC = (permissionsProps, component) => {
    return (
        <ProtectedComponent {...permissionsProps}>
            {component}
        </ProtectedComponent>
    );
};
