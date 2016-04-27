/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Request from 'superagent';
import Table from '../SharedComponents/table/TableComponent.jsx';
import Loader from 'react-loader';

import * as AdminHelper from '../../helpers/adminHelper.js';

class AdminPageButton extends React.Component {
    render() {
        let context = this.props.context;
        var classNames = require('classnames');
        let classes = classNames({
            'usa-da-button btn-primary': this.props.newStatus === 'approved',
            'usa-da-button btn-danger': this.props.newStatus === 'denied'
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
                    <p className="usa-alert-text">{this.props.data.user}'s DATA Act Broker account has been {this.props.data.action}.</p>
                </div>
            </div>
        );
    }
}

export default class AdminPageContent extends React.Component {
    getAllUserRequests(){

        AdminHelper.listUsersWithStatus('awaiting_approval')
            .then((data) => {
                let users = data.users;
                let userArray = [];

                for (let user of users) {
                    userArray.push(this.transformUserData(user));
                    userArray[userArray.length-1].push(<AdminPageButton name="Approve" newStatus="approved" user={user} context={this} />);
                    userArray[userArray.length-1].push(<AdminPageButton name="Deny" newStatus="denied" user={user} context={this} />);
                }

                this.setState({ users: userArray, loaded: true });
            })
            .catch((err) => {
                this.setState({
                    loaded: true
                });
            });
    }

    changeStatus(){
        this['context'].setState({ loaded: false });
        AdminHelper.changeUserStatus(this['user']['id'], this['newStatus'])
            .then(() => {
                this['context'].getAllUserRequests();

                this['context'].setState({
                    loaded: true,
                    message: {
                        user: this['user']['email'],
                        hidden: false,
                        action: this['newStatus']
                    }
                });
            })
            .catch((err) => {
                this['context'].setState({ loaded: true });
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

    transformUserData(user) {
        // reformat the user data to match the table columns
        const output = [
            user.name,
            user.title,
            user.agency,
            user.email
        ];

        return output;
    }

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

                        <div className="row">
                            <div className="col-md-12 usa-da-admin-message">
                                <AdminPageMessage data={this.state.message} />
                            </div>
                        </div>
                            
                        <div className="row">
                            <div className="col-md-12">
                                <Loader loaded={this.state.loaded}>
                                    <Table data={this.state.users} headers={headers} extraClasses={['table-bordered']}/>
                                </Loader>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}