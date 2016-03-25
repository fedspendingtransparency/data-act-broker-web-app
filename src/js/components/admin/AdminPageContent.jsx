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
            'usa-button-active': this.props.newStatus === 'approved',
            'usa-button-secondary': this.props.newStatus === 'denied'
        });

        return (
            <button type="button"
                className={classes}
                onClick={context.changeStatus.bind(this.props)}>{this.props.name}</button>
        );
    }
}

export default class AdminPageMessage extends React.Component {
    render(){
        var classNames = require('classnames');
        let classes = classNames({
            'hidden': this.props.data.hidden === true,
            'usa-alert usa-alert-success': this.props.data.hidden === false && this.props.data.action == 'approved',
            'usa-alert usa-alert-error': this.props.data.hidden === false && this.props.data.action == 'denied'
        });

        return (
            <div className={classes}>
                <div className="usa-alert-body">
                    <h3 className="usa-alert-heading">Success</h3>
                    <p className="usa-alert-text">{this.props.data.user}'s Data Broker account has been {this.props.data.action}.</p>
                </div>
            </div>
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
                    this['context'].getAllUserRequests();

                    this['context'].setState({
                        loaded: true,
                        message: {
                            user: this['user']['email'],
                            hidden: false,
                            action: this['newStatus']
                        }
                    });
                }
            });
    }

    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loaded: false,
            message: {
                user: "",
                hidden: true,
                action: ""
            }
        };
    }

    componentDidMount() {
        this.getAllUserRequests();
    }

    render() {
        const headers = ['Name', 'Title', 'Agency', 'Email', 'User ID', 'Approve', 'Deny'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-admin-message">
                        <AdminPageMessage data={this.state.message} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 usa-da-table-holder usa-da-admin-table-holder">
                        <Loader loaded={this.state.loaded}>
                            <Table data={this.state.users} headers={headers}/>
                        </Loader>
                    </div>
                </div>
            </div>
        );
    }
}
