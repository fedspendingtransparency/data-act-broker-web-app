/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import _ from 'lodash';

import ReviewDataSelectedUser from './ReviewDataSelectedUser.jsx';
import Typeahead from '../SharedComponents/Typeahead.jsx';

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class ReviewDataNotifyModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            users: null,
            selectedUsers: []
        };
    }

    componentDidMount() {
        Modal.setAppElement('#reviewDataNotifyModalHolder');
        this.loadUsers();
    }
    
    loadUsers() {
        ReviewHelper.listUsers()
            .then((data) => {
                for (let i = 0; i < data.length; i++){
                    data[i].displayName = data[i].name + " | " + data[i].email;
                }
                this.setState({"users": data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isOpen: false
        });
    }

    userFormatter(item, input) {
        return {
            label: item.displayName,
            value: item.id
        };
    }

    selectUser(id, isValid) {
        if (isValid){
            let selectedUser = _.find(this.state.users, user => user.id == id);
            let updatedSelectedUsers = this.state.selectedUsers.slice();

            if (updatedSelectedUsers.length == 0 || updatedSelectedUsers[updatedSelectedUsers.length-1].id != id) {
                updatedSelectedUsers.push(selectedUser);
                this.setState({"selectedUsers": updatedSelectedUsers});

                let updatedUsers = _.remove(this.state.users, user => user.id != id);
                this.setState({"users": updatedUsers});

                this.refs.typeahead.setState({value: ""});
            }
        }
    }

    deselectUser(userId){
        if (userId){
            let deselectedUser = _.find(this.state.selectedUsers, user => user.id == userId);
            let users = this.state.users.slice();

            if (users.length == 0 || users[users.length-1].id != userId) {
                users.push(deselectedUser);
                this.setState({"users": users});

                let updatedSelectedUsers = _.remove(this.state.selectedUsers, user => user.id != userId);
                this.setState({"selectedUsers": updatedSelectedUsers});
            }
        }
    }

    sendNotification(e){
        e.preventDefault();

        var users = this.state.selectedUsers.map(user => user.id);

        ReviewHelper.sendNotification(users, this.props.submissionID)
            .then((data) => {
                this.closeModal();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let selectedUsers = [];
        if (this.state.selectedUsers && this.state.selectedUsers.length > 0){
            for (let user of this.state.selectedUsers){
                selectedUsers.push(<ReviewDataSelectedUser key={user.id} user={user} deselectUser={this.deselectUser.bind(this,user.id)} />);
            }
        }

        let autoCompleteItems = null;
        if (this.state.users && this.state.users.length > 0){
            autoCompleteItems = <Typeahead ref="typeahead" placeholder="Name or email address of the person to certify this submission" keyValue="displayName" internalValue="id" values={this.state.users} formatter={this.userFormatter} onSelect={this.selectUser.bind(this)} errorHeader="Unknown User" errorDescription="You must select a user from the list that is provided as you type." />;
        }

        return (
            <Modal isOpen={this.state.isOpen} overlayClassName="usa-da-landing-modal-overlay" className="usa-da-landing-modal">
                <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                    <a href="#" onClick={this.closeModal.bind(this)}> <Icons.Times /> </a>
                </div>

                <div className="usa-da-landing-modal-content">
                <div className="row">
                    <div className="col-md-12">
                        <h6>Notify Another User that the Submission is Ready for Certification</h6>

                        <div className="usa-da-selected-users-holder">
                            {selectedUsers}
                        </div>

                        <div className="usa-da-autocomplete-holder typeahead-holder mb-30">
                            {autoCompleteItems}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-10">
                        <a href="#" onClick={this.sendNotification.bind(this)} className="usa-da-button btn-primary pull-right">Send Notification</a>
                    </div>
                </div>
                </div>
            </Modal>
        );
    }
}