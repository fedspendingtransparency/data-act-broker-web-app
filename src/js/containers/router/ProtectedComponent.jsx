import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import * as LoginHelper from '../../helpers/loginHelper';
import * as sessionActions from '../../redux/actions/sessionActions';

const propTypes = {
    Child: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.element, PropTypes.node]),
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

const ProtectedComponent = (props) => {
    let sessionChecker = null;

    useEffect(() => {
        if (props.session.login === 'loggedIn') {
            // we've switched from either a logged out state to logged in or
            // we've received session data back from the backend
            // so we should update the session monitoring
            monitorSession();
        }
    }, [props.session.login]);

    const monitorSession = () => {
        // start a timer to periodically check the user's session state every 15 minutes
        sessionChecker = setInterval(() => {
            LoginHelper.checkSession()
                .then((res) => {
                    if (res.data.status !== 'True') {
                        return Promise.reject();
                    }
                })
                .catch(() => {
                    props.setLoggedOut();

                    // unset the login state cookie
                    Cookies.remove('brokerLogin');

                    // session expired, stop checking if it's active any more
                    clearInterval(sessionChecker);
                });
        }, 15 * 60 * 1000);
    }

    // Remove # from the paths
    if (props.location.pathname === '/' && props.location.hash) {
        const redirectPath = props.location.hash.replace('#', '');
        return <Navigate to={redirectPath} />;
    }
    // if user isn't logged in, redirect to the login page
    if (!props.authFn(props.session)) {
        const search = `redirect=${props.location.pathname}`;
        return (
            <Navigate to={{
                pathname: '/login',
                search
            }} />
        );
    }
    // if there's a redirect path and the user logs in, redirect them to that path
    const redirectPath = LoginHelper.getRedirectPath(props.location, true);
    if (redirectPath !== null && props.location.pathname === '/login' && props.session.login === 'loggedIn') {
        return <Navigate to={redirectPath} />;
    }

    const Component = props.Child;
    return <Component {...props} />;
};

ProtectedComponent.propTypes = propTypes;

export default connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(ProtectedComponent);
