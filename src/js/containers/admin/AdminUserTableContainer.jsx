/**
* AdminUserTable.jsx
* Created by Kevin Li
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as AdminHelper from '../../helpers/adminHelper.js';

import * as adminUserListActions from '../../redux/actions/adminUserListActions.js';

import UserTable from '../../components/admin/userTable/UserTable.jsx';

class AdminUserTableContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: {
                hidden: true,
                type: "",
                message: ""
            }
        };
    }

	componentDidMount() {
		this.props.clearActiveUser();
        	this.loadUserList();
	}

    loadUserList() {
        AdminHelper.listAllUsers()
            .then((users) => {
                this.props.setUserList(users);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    modifyUser(user, changes) {
        AdminHelper.modifyUser(user.id, changes)
            .then(() => {
                if (changes.hasOwnProperty('status')) {
                    let type = "success";
                    if (changes.status == "denied") {
                        type = "failed";
                    }

                    this.setState({
                        message: {
                            hidden: false,
                            type: type,
                            message: user.name + "'s DATA Act Broker account has been " + changes.status + "."
                        }
                    });
                }

                else if (changes.hasOwnProperty('is_active')) {
                    let type = "success";
                    let message = user.name + "'s DATA Act Broker account has been set to active.";
                    if (changes.is_active != true) {
                        type = "failed";
                        message = user.name + "'s DATA Act Broker account has been disabled.";
                    }

                    this.setState({
                        message: {
                            hidden: false,
                            type: type,
                            message: message
                        }
                    });
                }
                else {
                    this.setState({
                        message: {
                            hidden: false,
                            type: 'success',
                            message: user.name + "'s DATA Act Broker account was successfully updated."
                        }
                    });
                }

                // reload the table
                this.loadUserList();
            })
            .catch((err) => {
                this.setState({
                        message: {
                            hidden: false,
                            type: 'failed',
                            message: 'An error occurred while updating the user account.'
                        }
                    });
                console.log(err);
            });
    }

    render() {
        
        return (
            <UserTable {...this.props} message={this.state.message} modifyUser={this.modifyUser.bind(this)} />
        );
    }
}

export default connect(
    state => ({ admin: state.adminUsers }),
    dispatch => bindActionCreators(adminUserListActions, dispatch)
)(AdminUserTableContainer)
