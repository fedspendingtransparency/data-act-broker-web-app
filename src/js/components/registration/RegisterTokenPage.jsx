/**
* RegisterTokenPage.jsx
* Created by Martin Press 3/8/16
**/

import React, { PropTypes } from 'react';
import Request from 'superagent';
import RegistrationPage from './RegistrationPage.jsx';
import RegisterEmailPage from './RegisterEmailPage.jsx';
import RegistrationTokenLoadingPage from './RegistrationTokenLoadingPage.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx'
import { kGlobalConstants } from '../../GlobalConstants.js';

import * as LoginHelper from '../../helpers/loginHelper.js';
import { hashHistory } from 'react-router';

export default class RegisterTokenPage extends React.Component {

     constructor(props) {
         super(props);

         this.state = {
             stepName: "",
             email: "",
             message: ""
         };

     }

    componentWillMount(){
      this.sendRequest(this.props.params.token)
    }

     sendRequest(token) {
        LoginHelper.lookupEmailToken(token)
            .then((data) => {
                if (data.errorCode == 0 && data.email) {
                    this.setState({
                        email:data.email
                    });
                }
                else {
                    hashHistory.push('/registration');
                }
            })
            .catch((err) => {
                console.log(err);
                hashHistory.push('/registration');
            });
     }

     render() {

        let content = <RegistrationTokenLoadingPage />;

        if (this.state.email != '') {
            content = <RegistrationPage stepName='code' email={this.state.email} message={this.state.message} />;
        }

         return (
             <div>
                <div className="usa-da-site_wrap">
                    {content}
                </div>
                <Footer />
            </div>
         );
     }
 }
