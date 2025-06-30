/**
 * RouterContainer.jsx
 * Created by Kevin Li 3/16/15
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import RouterRoutes from './RouterRoutes';

import WithAuth from "./WithAuth";

const RouteList = new RouterRoutes();

class RouterContainer extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    {[
                        ...RouteList.getRoutes().map((route) => {
                            const Component = () => WithAuth(route.component, {...route});
                            
                            return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<Component />} />
                        )})
                    ]}
                </Routes>
            </BrowserRouter>
        );
    }
}

export default RouterContainer;
