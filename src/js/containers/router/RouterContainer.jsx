/**
 * RouterContainer.jsx
 * Created by Kevin Li 3/16/15
 */

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { kGlobalConstants } from '../../GlobalConstants';
import * as sessionActions from '../../redux/actions/sessionActions';
import RouterRoutes from './RouterRoutes';
import ProtectedRoute from './ProtectedRoute';

// import { withAuth } from "./ProtectedComponent";
// import ProtectedComponent from "./ProtectedComponent";
import WithAuth from "./WithAuth";

const propTypes = {
    session: PropTypes.shape({
        login: PropTypes.string,
        user: PropTypes.shape({
            affiliations: PropTypes.arrayOf(
                PropTypes.shape({
                    permission: PropTypes.string
                })
            )
        })
    })
};

const defaultProps = {
    session: {}
};

const RouteList = new RouterRoutes();

class RouterContainer extends React.Component {

    render() {
        // console.log(RouteList.getRoutes());
        // console.log(this.props);
        return (
            <BrowserRouter>
                <Routes>
                    {[
                        ...RouteList.getRoutes().map((route) => {
                            // console.log(path);
                            // console.log(component);
                            // console.log(route);
                            // const Component = (routerProps) => WithAuth(component, routerProps);
                            // const Component = <ProtectedComponent Child={component} />
                            // const testVar = (routerProps) => <ProtectedComponent Child={component} {...routerProps} />;
                            // console.log(testVar);
                            // const Component = route.component;
                            const Component = () => WithAuth(route.component, {...route});
                            
                            return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<Component />}
                                session={this.props.session} />
                        )})
                    ]}
                </Routes>
            </BrowserRouter>
        );
    }
}

RouterContainer.propTypes = propTypes;
RouterContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        session: state.session
    }),
    (dispatch) => bindActionCreators(sessionActions, dispatch)
)(RouterContainer);
