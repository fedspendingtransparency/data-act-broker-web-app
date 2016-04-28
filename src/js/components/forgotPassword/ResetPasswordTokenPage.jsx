import React, { PropTypes } from 'react';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';
import { kGlobalConstants } from '../../GlobalConstants.js';
import * as LoginHelper from '../../helpers/loginHelper.js';

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

    componentWillMount() {
        this.sendRequest(this.props.params.token);
    }

     sendRequest(token) {
        LoginHelper.lookupPasswordToken(token)
            .then((data) => {
                this.setState({
                    errorCode: data.errorCode,
                    email: data.email,
                    message: data.message,
                    success: true
                });
            })
            .catch((err) => {
                console.log(err);
            });
     }

     render() {
         let currentComponent = null;

         if (this.state.success) {
             currentComponent = <ForgotPasswordPage errorCode={this.state.errorCode} message={this.state.message} email={this.state.email} />
         }

         return (
             <div>
                 {currentComponent}
             </div>
         );
     }
 }
