/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Table from '../SharedComponents/table/TableComponent.jsx';
import Loader from 'react-loader';

class AdminPageButton extends React.Component {
    render() {
        let context = this.props.context;
        var classNames = require('classnames');
        let classes = classNames({
            'usa-button-active': this.props.newStatus == 'approved',
            'usa-button-secondary': this.props.newStatus == 'denied'
        });

        return (
            <button type="button"
                className={classes}
                onClick={context.changeStatus.bind(this.props)}>{this.props.name}</button>
        );
    }
}

export default class AdminPageContent extends React.Component {
    getAllUserRequests(){
        Request.post(kGlobalConstants.API + 'list_users_with_status/')
            .withCredentials()
            .send({ 'status': 'awaiting_approval' })
            .end((err, res) => {
                if (err) {
                    this['context'].setState({ loaded: true });
                } else {
                    let users = res.body.users;
                    let userArray = [];

                    for (var user of users) {
                        userArray.push(Object.keys(user).map(function(k) { return user[k] }));
                        userArray[userArray.length-1].push(<AdminPageButton name="Approve" newStatus="approved" user={user} context={this} />);
                        userArray[userArray.length-1].push(<AdminPageButton name="Deny" newStatus="denied" user={user} context={this} />);
                    }

                    this.setState({ users: userArray, loaded: true });
                }
            });
    }

    changeStatus(){
        this['context'].setState({ loaded: false });
        Request.post(kGlobalConstants.API + 'change_status/')
            .withCredentials()
            .send({ 'uid': this['user']['id'], 'new_status': this['newStatus']})
            .end((err) => {
                if (err) {
                    this['context'].setState({ loaded: true });
                } else {
                    this['context'].setState({ loaded: true });
                    this['context'].getAllUserRequests();
                }
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loaded: false
        };

        this.getAllUserRequests();
    }

    render() {
        const headers = ['Email', 'Agency', 'Title', 'User ID', 'Name', 'Approve', 'Deny'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder">
                        <Loader loaded={this.state.loaded}>
                            <Table data={this.state.users} headers={headers}/>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
}
