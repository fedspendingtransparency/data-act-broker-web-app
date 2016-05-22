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

    render() {
        
        return (
            <UserTable {...this.props} />
        );
    }
}

export default connect(
    state => ({ admin: state.adminUsers }),
    dispatch => bindActionCreators(adminUserListActions, dispatch)
)(AdminUserTableContainer)
