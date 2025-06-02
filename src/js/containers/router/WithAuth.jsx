import React from "react";
import { useLocation } from 'react-router-dom';
import ProtectedComponent from 'containers/router/ProtectedComponent';

const WithAuth = (component, path, props) => {
    const location = useLocation();
    console.log(props)

    return (
        <ProtectedComponent {...props} location={location} Child={component} />
    );
};

export default WithAuth;