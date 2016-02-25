/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Table from '../SharedComponents/table/TableComponent.jsx';

class AdminPageButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let context = this.props.context;
        return (
            <button type="button"
                className={this.props.newStatus == 'approved' ? 'usa-button-active' : 'usa-button-secondary'}
                onClick={context.changeStatus.bind(this.props)}>{this.props.name}</button>
        );
    }
}

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
                    let users = res.body.users;
                    let userArray = [];

                    users.forEach(function(user) {
                        userArray.push(Object.keys(user).map(function(k) { return user[k] }));
                        userArray[userArray.length-1].push(<AdminPageButton name="Approve" newStatus="approved" user={user} context={context} />);
                        userArray[userArray.length-1].push(<AdminPageButton name="Deny" newStatus="denied" user={user} context={context} />);
                    });

                    this.setState({ users: userArray });
                }
            });
    }

    changeStatus(){
        Request.post(kGlobalConstants.API + 'change_status/')
            .withCredentials()
            .send({ 'uid': this['user']['id'], 'new_status': this['newStatus']})
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    // Refresh data
                    getAllUserRequests();
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
        const headers = ['Email', 'Agency', 'Title', 'User ID', 'Name', 'Approve', 'Deny'];

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
