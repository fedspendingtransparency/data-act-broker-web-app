/**
  * DeleteModal.jsx
  * Created by Minahm Kim 03/10/17
  */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    deleteSub: PropTypes.func,
    id: PropTypes.number,
    isOpen: PropTypes.bool
};

const DeleteModal = ({closeModal = () => {}, deleteSub = () => {}, id = null, isOpen = false}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [disable, setDisable] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (exiting) {
            setExiting(false);
            closeModal();
        }
    }, [exiting]);

    const clickedDeleteButton = () => {
        setDisable(true);
        ReviewHelper.deleteSubmission(id)
            .then((res) => {
                if (res.data.message === 'Success') {
                    deleteSub();
                    exitModal();
                }
            })
            .catch((error) => {
                let tmpErrorMessage = "An error occurred while attempting to delete the submission. Please contact " +
                    "your administrator for assistance.";
                if (error.response.data.message && error.response.data.message !== "") {
                    tmpErrorMessage = error.response.data.message;
                }
                setErrorMessage(tmpErrorMessage);
            });
    };

    const exitModal = (e) => {
        if (e) {
            e.preventDefault();
        }

        // reset the modal if closed
        setErrorMessage('');
        setDisable(false);
        setExiting(true);
    };

    let error = '';
    if (errorMessage) {
        error = <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>;
    }

    return (
        <Modal
            mounted={isOpen}
            onExit={exitModal}
            underlayClickExits
            verticallyCenter
            initialFocus="#delete-button"
            titleId="usa-da-certify-modal">
            <div className="usa-da-modal-page">
                <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                    <div className="usa-da-certify-modal-close usa-da-icon usa-da-icon-times">
                        <button onClick={exitModal} aria-label="close">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                    </div>

                    <div className="usa-da-certify-modal-content delete-modal-content">
                        Warning: This will delete the submission from the system for your entire agency.
                        It will not be recoverable once deleted. Are you sure you want to proceed?
                    </div>
                    {error}
                    <div className="pull-right">
                        <br />
                        <button
                            id="delete-button"
                            className="btn btn-danger delete-button"
                            onClick={clickedDeleteButton}
                            disabled={disable}>Delete
                        </button>
                        <button className="btn btn-default" onClick={exitModal}>Cancel</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

DeleteModal.propTypes = propTypes;
export default DeleteModal;
