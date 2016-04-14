/**
* RegisterTokenPage.jsx
* Created by Martin Press 3/8/16
**/

import React, { PropTypes } from 'react';
import Request from 'superagent';
import RegistrationPage from './RegistrationPage.jsx';
import RegisterEmailPage from './RegisterEmailPage.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx'
import { kGlobalConstants } from '../../GlobalConstants.js';

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
        Request.post(kGlobalConstants.API + 'confirm_email_token/')
            .withCredentials()
            .send({ 'token': token })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {

                    if (!res.body.email) {
                        hashHistory.push('/registration');
                    }
                    else {
                        this.setState({
                            email:res.body.email
                        });

                    }
                }
            });
     }

     render() {

        let content = 'Verifying...';

        if (this.state.email != '') {
            content = <RegistrationPage stepName='code' email={this.state.email} message={this.state.message} />;
        }

         return (
             <div>
                <div className="usa-da-page-content">
                    {content}
                </div>
                <Footer />
            </div>
         );
     }
 }
