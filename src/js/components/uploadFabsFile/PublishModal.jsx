/**
  * PublishModal.jsx
  * Created by Minahm Kim 8/3/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    closeModal: PropTypes.func,
    submit: PropTypes.func,
    rows: PropTypes.object,
    isOpen: PropTypes.bool
};

const PublishModal = ({closeModal = () => {}, submit = () => {}, rows = {}, isOpen = false}) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [modalClosing, setModalClosing] = useState(false);

    useEffect(() => {
        if (modalClosing) {
            closeModal();
        }
    }, [modalClosing]);

    const closeModalClicked = (e) => {
        if (e) {
            e.preventDefault();
        }

        setErrorMessage('');
        setModalClosing(true);
    };

    const publishable = rows.valid_rows !== 0;

    let message = (
        <React.Fragment>
            <p>
                This will publish the {rows.valid_rows} data rows that have passed validation out of a total
                of {rows.total_rows} data rows in your FABS file
            </p>
            <p>
                {rows.total_rows - rows.valid_rows} rows violated one or more fatal validation rules and will not be
                published. If these rows are not resubmitted and published in a separate FABS submission, then your
                agency&#8217;s financial assistance data on USAspending will be incomplete and you may receive linkage
                warnings any time these awards appear in your agency&#8217;s File C data.
            </p>
        </React.Fragment>);

    let action = (
        <button
            id="publish-button"
            onClick={submit}
            className="us-da-button col-sm-6">
            Publish
        </button>);

    if (!publishable) {
        message = (
            <p>
                Your file cannot be published because none of your records passed validation. Please correct your
                file and resubmit it.
            </p>);
        action = (
            <button
                disabled
                id="publish-button"
                className="us-da-disabled-button col-sm-6">
                    No Valid Rows
            </button>
        );
    }

    let error = '';
    if (errorMessage) {
        error = <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>;
    }

    return (
        <Modal
            mounted={isOpen}
            onExit={closeModalClicked}
            underlayClickExits
            verticallyCenter
            titleId="usa-da-certify-modal">
            <div className="usa-da-modal-page">
                <div
                    id="usa-da-certify-modal"
                    className="usa-da-certify-modal">
                    <div className="usa-da-certify-modal-close usa-da-icon usa-da-icon-times">
                        <button onClick={closeModalClicked} aria-label="close">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                    </div>

                    <div className="usa-da-certify-modal-content">
                        <div className="row">
                            <div className="col-md-12 title-field">
                                <h6>Are you sure you want to publish your data to&nbsp;
                                    <a
                                        href="http://www.usaspending.gov"
                                        rel="noopener noreferrer"
                                        target="_blank">
                                        USAspending.gov
                                    </a>?
                                </h6>
                                {message}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" />
                        </div>
                        <div className="row">
                            {action}
                            <div className="col-sm-6">
                                <button
                                    onClick={closeModalClicked}
                                    className="usa-da-button btn-warning btn-full">
                                    Cancel
                                </button>
                            </div>
                        </div>
                        {error}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

PublishModal.propTypes = propTypes;
export default PublishModal;
