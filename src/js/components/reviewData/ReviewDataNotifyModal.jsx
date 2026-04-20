/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
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

const ReviewDataNotifyModal = ({
    isOpen = false, closeModal = () => {}, submissionID = '', fromUser = '', submittingAgency = ''
}) => {
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const typeaheadRef = useRef();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        ReviewHelper.listUsers()
            .then((res) => {
                const tmpData = res.data.users;
                for (let i = 0; i < tmpData.length; i++) {
                    tmpData[i].displayName = `${tmpData[i].name} | ${tmpData[i].email}`;
                }
                setUsers(tmpData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const userFormatter = (item) => {
        return {
            label: item.displayName,
            value: item.id
        };
    };

    const selectUser = (id, isValid) => {
        if (isValid) {
            const selectedUser = _.find(users, (user) => user.id === id);
            const updatedSelectedUsers = selectedUsers.slice();

            if (updatedSelectedUsers.length === 0 || updatedSelectedUsers[updatedSelectedUsers.length - 1].id !== id) {
                updatedSelectedUsers.push(selectedUser);
                const updatedUsers = _.remove(users, (user) => user.id !== id);

                setSelectedUsers(updatedSelectedUsers);
                setUsers(updatedUsers);
            }
        }
    };

    const deselectUser = (userId) => {
        if (userId) {
            const deselectedUser = _.find(selectedUsers, (user) => user.id === userId);
            const tmpUsers = users.slice();

            if (tmpUsers.length === 0 || users[users.length - 1].id !== userId) {
                tmpUsers.push(deselectedUser);
                const updatedSelectedUsers = _.remove(selectedUsers, (user) => user.id !== userId);

                setUsers(tmpUsers);
                setSelectedUsers(updatedSelectedUsers);
            }
        }
    };

    const generateMailToLink = () => {
        const toEmails = (selectedUsers.map((user) => user.email)).join(', ');
        const subject = 'Data Broker - Submission Ready for Review';
        const revUser = fromUser.toUpperCase();
        const revAgency = submittingAgency.toUpperCase();
        const revLink = `https://broker.usaspending.gov/submission/${submissionID}/reviewData`;
        const body = [
            `${revUser} has shared a Data Broker submission with you from ${revAgency}. `,
            `Follow this link (${revLink}) to review their submission. `,
            `For questions or comments, please visit the Service Desk at https://servicedesk.usaspending.gov/ `,
            `or e-mail DATAPMO@fiscal.treasury.gov.`
        ].join('');
        return `mailto:${toEmails}?subject=${subject}&body=${body}`;
    };

    const selectedUsersList = [];
    if (selectedUsers && selectedUsers.length > 0) {
        for (const user of selectedUsers) {
            selectedUsersList.push(<ReviewDataSelectedUser
                key={user.id}
                user={user}
                deselectUser={deselectUser} />);
        }
    }

    let autoCompleteItems = null;
    if (users && users.length > 0) {
        autoCompleteItems = (<Typeahead
            ref={typeaheadRef}
            placeholder="Name or email address of the person to certify this submission"
            keyValue="displayName"
            internalValue={["id"]}
            values={users}
            formatter={userFormatter}
            onSelect={selectUser}
            errorHeader="Unknown User"
            errorDescription="You must select a user from the list that is provided as you type."
            clearAfterSelect />);
    }

    return (
        <Modal
            mounted={isOpen}
            onExit={closeModal}
            underlayClickExists={false}
            verticallyCenter
            titleId="usa-da-notify-modal">
            <div className="usa-da-modal-page">
                <div id="usa-da-notify-modal" className="usa-da-notify-modal">
                    <div className="usa-da-notify-modal-close usa-da-icon usa-da-icon-times">
                        <button onClick={closeModal} aria-label="close">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                    </div>

                    <div className="usa-da-notify-modal-content">
                        <div className="row">
                            <div className="col-md-12">
                                <h6>Notify another user that the submission is ready for review</h6>

                                <div className="usa-da-selected-users-holder">
                                    {selectedUsersList}
                                </div>

                                <div className="usa-da-autocomplete-holder typeahead-holder mb-30">
                                    {autoCompleteItems}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-10">
                                <a
                                    href={generateMailToLink()}
                                    className="usa-da-button btn-primary pull-right">Send Notification
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ReviewDataNotifyModal.propTypes = propTypes;
export default ReviewDataNotifyModal;
