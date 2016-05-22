/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Table from '../SharedComponents/table/TableComponent.jsx';
import Loader from 'react-loader';

import AdminUserTableContainer from '../../containers/admin/AdminUserTableContainer.jsx';

import * as AdminHelper from '../../helpers/adminHelper.js';




export default class AdminPageContent extends React.Component {
    // getAllUserRequests(){

    //     AdminHelper.listUsersWithStatus('awaiting_approval')
    //         .then((data) => {
    //             let users = data.users;
    //             let userArray = [];

    //             for (let user of users) {
    //                 userArray.push(this.transformUserData(user));
    //                 userArray[userArray.length-1].push(<AdminPageButton name="Approve" newStatus="approved" user={user} context={this} />);
    //                 userArray[userArray.length-1].push(<AdminPageButton name="Deny" newStatus="denied" user={user} context={this} />);
    //             }

    //             this.setState({ users: userArray, loaded: true });
    //         })
    //         .catch((err) => {
    //             this.setState({
    //                 loaded: true
    //             });
    //         });
    // }

    // changeStatus(){
    //     this['context'].setState({ loaded: false });
    //     AdminHelper.changeUserStatus(this['user']['id'], this['newStatus'])
    //         .then(() => {
    //             this['context'].getAllUserRequests();

    //             this['context'].setState({
    //                 loaded: true,
    //                 message: {
    //                     user: this['user']['email'],
    //                     hidden: false,
    //                     action: this['newStatus']
    //                 }
    //             });
    //         })
    //         .catch((err) => {
    //             this['context'].setState({ loaded: true });
    //         });
    // }

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         users: [],
    //         loaded: false,
    //         message: {
    //             user: "",
    //             hidden: true,
    //             action: ""
    //         }
    //     };
    // }

    // componentDidMount() {
    //     this.getAllUserRequests();
    // }

    // transformUserData(user) {
    //     // reformat the user data to match the table columns
    //     const output = [
    //         user.name,
    //         user.title,
    //         user.agency,
    //         user.email
    //     ];

    //     return output;
    // }

    render() {
        const headers = ['Name', 'Title', 'Agency', 'Email', 'Approve', 'Deny'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-admin-message">
                        <h5 className="text-center">The following user(s) has requested access to the DATA Act Broker.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="usa-da-admin-table-wrapper usa-da-registration col-md-12">
                        <ul>
                            <li>Click "Approve" to grant access. This will generate an email to the user with a link to complete registration.</li>
                            <li>Click "Deny" to prevent access. This will generate an email notifying the user that they have been denied access.</li>
                        </ul>

                        <AdminUserTableContainer />
                    </div>
                </div>
            </div>
        );
    }
}