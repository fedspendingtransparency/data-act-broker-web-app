/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Table from '../SharedComponents/table/TableComponent.jsx';

export default class AdminPageContent extends React.Component {
    getAllUserRequests(){
        var context = this;

        Request.post(kGlobalConstants.API + 'list_users_with_status/')
            .withCredentials()
            .send({ 'status': 'awaiting_approval' })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    // Display users
                    var users = res.body.users;
                    let userArray = [];

                    users.forEach(function(user) {
                        userArray.push(Object.keys(user).map(function(k) { return user[k] }));
                        userArray[userArray.length-1].push(<button type="button" onClick={context.changeStatus.bind([user.email,"approved"])}>Approve</button>);
                        userArray[userArray.length-1].push(<button type="button" onClick={context.changeStatus.bind([user.email,"denied"])}>Deny</button>);
                    });

                    this.setState({ users: userArray });
                }
            });
    }

    changeStatus(){
        Request.post(kGlobalConstants.API + 'change_status/')
            .withCredentials()
            .send({ 'user_email': this[0], 'new_status': this[1]})
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    // Remove row on successful approval
                    console.log(res);
                }
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            users: []
        };

        this.getAllUserRequests();
    }

    render() {
        const headers = ['Agency', 'Email', 'Name', 'Title', 'Approve', 'Deny'];

        if (this.state.users.length > 0) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 usa-da-table-holder">
                            <Table data={this.state.users} headers={headers}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 usa-da-table-holder">
                            Fetching Users
                        </div>
                    </div>
                </div>
            );
        }
    }
}
