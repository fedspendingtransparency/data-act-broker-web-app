import React from 'react';
import PropTypes from 'prop-types';
import Redirect from 'react-router-dom';
import queryString from 'query-string';

const propTypes = {
    permissionsTest: PropTypes.func,
    redirectPath: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.shape({
        key: PropTypes.string, // 'ac3df4', ** not with HashHistory!
        pathname: PropTypes.string, // '/somewhere'
        search: PropTypes.string, // '?some=search-string',
        hash: PropTypes.string, // '#howdy',
        state: PropTypes.shape({}) // user defined based on calls to history.push()
    }),
    match: PropTypes.shape({
        params: PropTypes.shape({}), // Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
        isExact: PropTypes.bool, // true if the entire URL was matched (no trailing characters)
        path: PropTypes.string, // The path pattern used to match. Useful for building nested <Route>s
        url: PropTypes.string // The matched portion of the URL. Useful for building nested <Link>s
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

const CheckPermissionsWrapper = ({
    permissionsTest,
    redirectPath = '/login',
    children,
    location,
    history
}) => {
    const { pathname, search } = location;
    const isAuthorized = permissionsTest();
    const shouldPerformAutoLogin = (pathname === '/login' && isAuthorized);
    if (!isAuthorized) {
        if (pathname !== '/login') {
            return <Redirect to={`${redirectPath}?redirect=${pathname}`} />;
        }
        return <Redirect to={redirectPath} />;
    }
    else if (shouldPerformAutoLogin) {
        const queryStrings = queryString.parse(search); // '?foo=bar' --> { foo: 'bar' }
        const hasRedirectQueryString = Object.keys(queryStrings).includes('redirect');
        if (hasRedirectQueryString) {
            return <Redirect to={queryStrings.redirect} />;
        }
        history.push('/');
    }
    return children;
};

CheckPermissionsWrapper.propTypes = propTypes;
export default CheckPermissionsWrapper;

export const WithPermissions = (permissionsProps, component) => {
    return (
        <CheckPermissionsWrapper {...permissionsProps}>
            {component}
        </CheckPermissionsWrapper>
    );
};
