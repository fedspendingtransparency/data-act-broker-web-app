import React, { PropTypes } from 'react';
import Request from 'superagent';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';

export default class ResetPasswordTokenPage extends React.Component {

     constructor(props) {
         super(props);

         this.state = {
             errorCode: "",
             email: "",
             message: "",
             success: false
         };

     }

    componentWillMount(){
      console.log(this.props.params.token);
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
                        errorCode: res.body.errorCode,
                        email: res.body.email,
                        message:res.body.message,
                        success :true
                    });
                }
            });
     }

     render() {
         let currentComponent =  null
         if (this.state.success) {
              currentComponent =  <ForgotPasswordPage errorCode={this.state.errorCode} message={this.state.message} email={this.state.email} />
         }
         return (
             <div>{currentComponent}</div>
         );
     }
 }
