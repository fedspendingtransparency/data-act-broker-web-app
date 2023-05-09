/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import _ from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReviewDataSelectedUser from './ReviewDataSelectedUser';
import Typeahead from '../SharedComponents/Typeahead';

import * as ReviewHelper from '../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    submissionID: PropTypes.string,
    isOpen: PropTypes.bool,
    fromUser: PropTypes.string,
    submittingAgency: PropTypes.string
};

const defaultProps = {
    isOpen: false,
    closeModal: () => {},
    submissionID: '',
    fromUser: '',
    submittingAgency: ''
};

export default class ReviewDataNotifyModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            selectedUsers: []
        };

        this.selectUser = this.selectUser.bind(this);
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers() {
        ReviewHelper.listUsers()
            .then((data) => {
                const tmpData = data;
                for (let i = 0; i < tmpData.length; i++) {
                    tmpData[i].displayName = `${tmpData[i].name} | ${tmpData[i].email}`;
                }
                this.setState({ users: tmpData });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    userFormatter(item) {
        return {
            label: item.displayName,
            value: item.id
        };
    }

    selectUser(id, isValid) {
        if (isValid) {
            const selectedUser = _.find(this.state.users, (user) => user.id === id);
            const updatedSelectedUsers = this.state.selectedUsers.slice();

            if (updatedSelectedUsers.length === 0 || updatedSelectedUsers[updatedSelectedUsers.length - 1].id !== id) {
                updatedSelectedUsers.push(selectedUser);
                this.setState({ selectedUsers: updatedSelectedUsers });

                const updatedUsers = _.remove(this.state.users, (user) => user.id !== id);
                this.setState({ users: updatedUsers });

                this.typeahead.setState({ value: "" });
            }
        }
    }

    deselectUser(userId) {
        if (userId) {
            const deselectedUser = _.find(this.state.selectedUsers, (user) => user.id === userId);
            const users = this.state.users.slice();

            if (users.length === 0 || users[users.length - 1].id !== userId) {
                users.push(deselectedUser);
                this.setState({ users });

                const updatedSelectedUsers = _.remove(this.state.selectedUsers, (user) => user.id !== userId);
                this.setState({ selectedUsers: updatedSelectedUsers });
            }
        }
    }

    sendNotification(e) {
        e.preventDefault();

        const users = this.state.selectedUsers.map((user) => user.id);

        ReviewHelper.sendNotification(users, this.props.submissionID)
            .then(() => {
                this.props.closeModal();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    generateMailToLink() {
        const toEmails = (this.state.selectedUsers.map((user) => user.email)).join(', ');
        const subject = 'DATA Act Broker - Submission Ready for Review';
        const revUser = this.props.fromUser.toUpperCase();
        const revAgecny = this.props.submittingAgency.toUpperCase();
        const revLink = `https://broker.usaspending.gov/#/submission/${this.props.submissionID}/reviewData`;
        const body = [
            `${revUser} has shared a DATA Act broker submission with you from ${revAgecny}. `,
            `Follow this link (${revLink}) to review their submission. `,
            `For questions or comments, please visit the Service Desk at https://servicedesk.usaspending.gov/ `,
            `or e-mail DATAPMO@fiscal.treasury.gov.`
        ].join('');
        return `mailto:${toEmails}?subject=${subject}&body=${body}`;
    }

    render() {
        const selectedUsers = [];
        if (this.state.selectedUsers && this.state.selectedUsers.length > 0) {
            for (const user of this.state.selectedUsers) {
                selectedUsers.push(<ReviewDataSelectedUser
                    key={user.id}
                    user={user}
                    deselectUser={this.deselectUser.bind(this, user.id)} />);
            }
        }

        let autoCompleteItems = null;
        if (this.state.users && this.state.users.length > 0) {
            autoCompleteItems = (<Typeahead
                ref={(c) => {
                    this.typeahead = c;
                }}
                placeholder="Name or email address of the person to certify this submission"
                keyValue="displayName"
                internalValue={["id"]}
                values={this.state.users}
                formatter={this.userFormatter}
                onSelect={this.selectUser}
                errorHeader="Unknown User"
                errorDescription="You must select a user from the list that is provided as you type." />);
        }

        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;

        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.props.closeModal}
                underlayClickExists={false}
                verticallyCenter={trueProps}
                titleId="usa-da-notify-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-notify-modal" className="usa-da-notify-modal">
                        <div className="usa-da-notify-modal-close usa-da-icon usa-da-icon-times">
                            <button onClick={this.props.closeModal} aria-label="close">
                                <FontAwesomeIcon icon="times" />
                            </button>
                        </div>

                        <div className="usa-da-notify-modal-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <h6>Notify another user that the submission is ready for review</h6>

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
                                    <a
                                        href={this.generateMailToLink()}
                                        className="usa-da-button btn-primary pull-right">Send Notification
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ReviewDataNotifyModal.propTypes = propTypes;
ReviewDataNotifyModal.defaultProps = defaultProps;
