/**
* AppContainer.jsx
* Created by Kevin Li 3/16/15
*/

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Cookies from 'js-cookie';

import reducers from '../redux/reducers/index';
import * as sessionActions from '../redux/actions/sessionActions';
import { kGlobalConstants } from '../GlobalConstants';
import StoreSingleton from '../redux/storeSingleton';
import { fetchActiveUser } from '../helpers/loginHelper';

import RouterContainer from './router/RouterContainer';
import PendingPage from '../components/login/PendingPage';


// create the state store
let devExtension;
if (kGlobalConstants.DEV || kGlobalConstants.LOCAL) {
    // only enable Redux debugging in dev and local modes
    devExtension = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined;
}

const store = createStore(reducers, {}, devExtension);

const storeSingleton = new StoreSingleton();
storeSingleton.setStore(store);

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appReady: false,
            showPending: true
        };
    }

    componentDidMount() {
        // check if we have a login cookie set
        this.checkCookies();

        // cookie state is only used as a shorthand to determine if we should show the loading page
        // regardless, we still need to check the backend for the user session
        fetchActiveUser()
            .then(() => {
                // logged in
                this.setState({
                    appReady: true
                });
            })
            .catch(() => {
                const action = sessionActions.setLoggedOut();
                store.dispatch(action);
                // unset the login state cookie
                Cookies.remove('brokerLogin');

                this.setState({
                    appReady: true
                });
            });
    }

    checkCookies() {
        if (!Cookies.get('brokerLogin')) {
            // cookie is not set
            this.setState({
                showPending: false
            });
        }
    }

    render() {
        // show loading page that resembles non-interactive version of landing page if user has an active session
        let appContents = <PendingPage />;
        // once the server responds with the actual user session, show the real app
        if (this.state.appReady || !this.state.showPending) {
            appContents = <RouterContainer store={store} />;
        }

        return (
            <Provider store={store}>
                {appContents}
            </Provider>
        );
    }
}
