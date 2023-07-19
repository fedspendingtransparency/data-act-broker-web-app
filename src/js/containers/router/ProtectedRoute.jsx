import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import { withAuth } from "./ProtectedComponent";

const propTypes = {
    path: PropTypes.string,
    component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
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

const ProtectedRoute = (props) => {
    const { component, path } = props;
    const componentWithAuth = withAuth(component, props);
    // withAuth to monitor the session etc...
    return (<Route path={path} render={componentWithAuth} />);
};

ProtectedRoute.propTypes = propTypes;

export default ProtectedRoute;
