/**
* RegisterTokenPage.jsx
* Created by Martin Press 3/8/16
**/

import React, { PropTypes } from 'react';
import Request from 'superagent';
import RegistrationPage from './RegistrationPage.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';

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
                    this.setState({
                        stepName: "code", email: res.body.email, message:res.body.message
                    });
                }
            });
     }

     render() {
         let currentComponent =  null
         if (this.state.stepName === "code") {
              currentComponent =  <RegistrationPage stepName='code' email={this.state.email} message={this.state.message} />
         }
         return (
             <div>{currentComponent}</div>
         );
     }
 }
