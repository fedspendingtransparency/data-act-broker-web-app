import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { withAuth } from "./ProtectedComponent";
import { getPath } from "../../helpers/loginHelper";

const propTypes = {
    path: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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

const ProtectedRoute = (props) => {
    const {
        location, authFn, component, path, session
    } = props;
    const componentWithAuth = withAuth(component, props);
    const isAuthorized = authFn(session);
    // if (isAuthorized) {
    // withAuth to monitor the session etc...
    return (<Route path={path} render={componentWithAuth} />);
    // }

    // const redirectUrl = getPath(location, isAuthorized);

    // return (
    //     <Redirect to={redirectUrl} />
    // );
};

ProtectedRoute.propTypes = propTypes;
ProtectedRoute.defaultProps = defaultProps;

export default ProtectedRoute;
