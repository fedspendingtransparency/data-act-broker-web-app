import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from "./ProtectedComponent";
import { getRedirectPath } from "../../helpers/loginHelper";

const propTypes = {
    path: PropTypes.string,
    redirectUrl: PropTypes.string,
    component: PropTypes.node,
    authFn: PropTypes.func,
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
    })
};

const defaultProps = {
    authFn: () => true
};

const ProtectedRoute = ({
    location,
    component,
    authFn,
    session
}) => {
    console.log("protectedRoute");
    const isAuthorized = authFn(session);

    if (isAuthorized) {
        console.log("props", isAuthorized, session, location, component);
        // withAuth to monitor the session etc...
        // return (<Route path={path} component={withAuth(component)} />);
        const Test = withAuth(component);
        return <Test location={location} />;
    }

    const redirectUrl = getRedirectPath(location, isAuthorized);

    return (
        <Redirect to={redirectUrl} />
    );
};

ProtectedRoute.propTypes = propTypes;
ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
