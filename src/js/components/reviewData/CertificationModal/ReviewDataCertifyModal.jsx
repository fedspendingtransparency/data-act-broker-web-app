/**
  * ReviewDataCertifyModal.jsx
  * Created by Kevin Li 9/6/16
  */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-aria-modal';
import { Navigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CertifyDisclaimer from 'components/reviewData/CertificationModal/CertifyDisclaimer';
import PublishDisclaimer from 'components/reviewData/CertificationModal/PublishDisclaimer';
import CertifyButtons from 'components/reviewData/CertificationModal/CertifyButtons';
import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    session: PropTypes.object,
    submissionID: PropTypes.string,
    warnings: PropTypes.number,
    isOpen: PropTypes.bool,
    type: PropTypes.oneOf(['publish', 'certify', 'both'])
};

const ReviewDataCertifyModal = ({
    closeModal = null, session = null, submissionID = '', warnings = 0, isOpen = false, type = 'both'
}) => {
    const [certified, setCertified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [goToSubmissionTable, setGoToSubmissionTable] = useState(false);
    const [triggerClose, setTriggerClose] = useState(false);

    useEffect(() => {
        if (triggerClose) {
            setTriggerClose(false);
            closeModal();
        }
    }, [triggerClose]);

    const clickedCertifyCheckbox = () => {
        setCertified(!certified);
    };

    const clickedCertifyButton = (e) => {
        e.preventDefault();
        setLoading(true);

        ReviewHelper.publishCertifyDABSSubmission(submissionID, type)
            .then(() => {
                setLoading(false);
                exitModal();
                // Redirect to submission dashboard after successful certification
                setGoToSubmissionTable(true);
            })
            .catch((err) => {
                let processType = type;
                if (type === 'both') {
                    processType = 'certify';
                }
                let tmpErrorMessage = `An error occurred while attempting to ${processType} the submission. ` +
                    `Please contact your administrator for assistance`;
                if (err.status === 400 || err.status === 403) {
                    tmpErrorMessage = err.response.data.message;
                    if (err.response.data.submissionId) {
                        tmpErrorMessage = (
                            <div>
                                {tmpErrorMessage}
                            </div>);
                    }
                }

                setErrorMessage(tmpErrorMessage);
                setLoading(false);
            });
    };

    const exitModal = (e) => {
        if (e) {
            e.preventDefault();
        }

        // reset the modal if closed
        setCertified(false);
        setErrorMessage('');
        setTriggerClose(true);
    };

    if (goToSubmissionTable) {
        return <Navigate to="/submissionTable" />;
    }
    let message = null;
    if (warnings > 0) {
        let warning = " warning";
        if (warnings !== 1) {
            warning = " warnings";
        }
        message = (
            <h6>
                This submission contains <span className="variable-field">{warnings + warning}</span>.
            </h6>);
    }

    let error = '';
    if (errorMessage) {
        error = <div className="alert alert-danger text-center" role="alert">{errorMessage}</div>;
    }

    let disclaimer = <CertifyDisclaimer />;
    if (type === 'publish') {
        disclaimer = <PublishDisclaimer />;
    }

    return (
        <Modal
            mounted={isOpen}
            onExit={exitModal}
            underlayClickExits={true}
            verticallyCenter
            initialFocus="#certify-check"
            titleId="usa-da-certify-modal">
            <div className="usa-da-modal-page">
                <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                    <div className={`usa-da-certify-modal-close usa-da-icon usa-da-icon-times`}>
                        <button onClick={exitModal} aria-label="close">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                    </div>

                    <div className="usa-da-certify-modal-content">
                        <div className="row">
                            <div className="col-md-12 title-field">
                                <h6>
                                    Are you sure you want to&nbsp;
                                    {type === 'both' ? 'certify' : type} your data?
                                </h6>
                                {message}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {disclaimer}
                            </div>
                        </div>
                        <CertifyButtons
                            closeModal={exitModal}
                            session={session}
                            type={type}
                            loading={loading}
                            certified={certified}
                            clickedCertifyButton={clickedCertifyButton}
                            clickedCertifyCheckbox={clickedCertifyCheckbox} />
                        {error}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

ReviewDataCertifyModal.propTypes = propTypes;
export default ReviewDataCertifyModal;
