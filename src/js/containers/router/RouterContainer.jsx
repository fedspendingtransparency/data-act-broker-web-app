/**
 * RouterContainer.jsx
 * Created by Kevin Li 3/16/15
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';

import { kGlobalConstants } from '../../GlobalConstants';
import * as sessionActions from '../../redux/actions/sessionActions';
import RouterRoutes from './RouterRoutes';
import ProtectedRoute from './ProtectedRoute';

const GA_OPTIONS = { debug: false };
const isProd = process.env.NODE_ENV === 'production';

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

const Routes = new RouterRoutes();
const history = createBrowserHistory();

class RouterContainer extends React.Component {
    componentDidMount() {
        if (isProd && kGlobalConstants.GA_TRACKING_ID !== '') {
            ReactGA.initialize(kGlobalConstants.GA_TRACKING_ID, GA_OPTIONS);
            history.listen((location) => {
                ReactGA.set({ page: location.pathname });
                ReactGA.pageview(location.pathname);
            });
        }
    }

    render() {
        return (
            <Router history={history}>
                <Switch>
                    {[
                        ...Routes.getRoutes().map((route) => (
                            <ProtectedRoute
                                key={route.path}
                                {...route}
                                history={history}
                                session={this.props.session} />
                        ))
                    ]}
                </Switch>
            </Router>
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
