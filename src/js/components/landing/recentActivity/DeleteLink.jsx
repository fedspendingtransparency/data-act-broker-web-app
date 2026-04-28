/**
  * DeleteLink.jsx
  * Created by Minahm Kim 02/09/17
  */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeleteModal from './DeleteModal';
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    reload: PropTypes.func,
    warning: PropTypes.func,
    account: PropTypes.object,
    item: PropTypes.object,
    submissionId: PropTypes.number,
    confirm: PropTypes.bool
};

const DeleteLink = ({
    reload = null,
    warning = null,
    account = null,
    item = null,
    submissionId = null,
    confirm = false
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deletable, setDeletable] = useState(false);

    useEffect(() => {
        canDelete();
    }, []);

    useEffect(() => {
        canDelete();
    }, [account, item, submissionId]);

    const openModal = () => {
        setModalOpen(true);
    };

    const canDelete = () => {
        if (!account) {
            return;
        }

        let tmpDeletable = (account.website_admin || !account.helpOnly);

        if (!tmpDeletable) {
            account.affiliations.forEach((aff) => {
                if (aff.agency_name === item.agency && (aff.permission === "writer" ||
                    aff.permission === 'submitter')) {
                    tmpDeletable = true;
                }
            });
        }

        setDeletable(tmpDeletable);
        setModalOpen(confirm);
    };

    const deleteSub = () => {
        reload();
    };

    const reset = () => {
        warning(-1);
        setModalOpen(false);
    };

    let button = 'N/A';
    let modal = null;
    const onKeyDownHandler = createOnKeyDownHandler(openModal);

    if (deletable) {
        button = (
            <div
                role="button"
                tabIndex={0}
                onKeyDown={onKeyDownHandler}
                onClick={openModal}
                className="trash-icon"
                aria-label="Delete">
                <FontAwesomeIcon icon={['far', 'trash-can']} className="trash-icon" />
            </div>);
        modal = (<DeleteModal
            isOpen={modalOpen}
            closeModal={reset}
            deleteSub={deleteSub}
            id={submissionId} />);
    }

    return (
        <div>
            <div className="usa-da-recent-activity-link" >
                {button}
            </div>
            {modal}
        </div>
    );
};

DeleteLink.propTypes = propTypes;
export default DeleteLink;
