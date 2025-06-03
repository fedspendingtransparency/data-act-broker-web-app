import React from "react";
import { useLocation } from 'react-router-dom';
import ProtectedComponent from 'containers/router/ProtectedComponent';

const WithAuth = (component, props) => {
    const location = useLocation();

    return (
        <ProtectedComponent {...props} location={location} Child={component} />
    );
};

export default WithAuth;