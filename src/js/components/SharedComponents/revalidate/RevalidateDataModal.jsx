/**
  * RevalidateDataModal.jsx
  * Created by Nipun Monga 02/27/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { Navigate } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as ReviewHelper from 'helpers/reviewHelper';
import RevalidateButtons from './RevalidateButtons';

const propTypes = {
    closeModal: PropTypes.func,
    data: PropTypes.object,
    submissionID: PropTypes.string,
    isOpen: PropTypes.bool,
    refreshPage: PropTypes.bool
};

const defaultProps = {
    closeModal: null,
    data: null,
    submissionID: '',
    isOpen: false,
    refreshPage: false
};

export default class RevalidateDataModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closeable: true,
            errorMessage: '',
            redirect: false
        };

        this.clickedRevalidateButton = this.clickedRevalidateButton.bind(this);
    }

    clickedRevalidateButton(e) {
        e.preventDefault();

        ReviewHelper.revalidateSubmission(this.props.submissionID)
            .then(() => {
                this.closeModal();
                // Redirect to validateData page
                this.setState({ redirect: true });
            })
            .catch((error) => {
                let errMsg = 'An error occurred while attempting to certify the submission. ' +
                    'Please contact your administrator for assistance.';
                if (error.status === 400 || error.status === 403) {
                    errMsg = error.response.data.message;
                }

                this.setState({ errorMessage: errMsg });
            });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }

        if (!this.state.closeable) {
            return;
        }

        // reset the modal if closed
        this.setState({
            errorMessage: ''
        }, () => {
            this.props.closeModal();
        });
    }

    render() {
        if (this.state.redirect) {
            if (this.props.refreshPage) {
                window.location.reload();
            }
            else {
                return <Navigate to={`/submission/${this.props.submissionID}/validateData`} />;
            }
        }
        let hideClose = '';
        if (!this.state.closeable) {
            hideClose = ' hide';
        }

        let error = '';
        if (this.state.errorMessage) {
            error = <div className="alert alert-danger text-center" role="alert">{this.state.errorMessage}</div>;
        }

        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;

        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.closeModal.bind(this)}
                underlayClickExits={this.state.closeable}
                verticallyCenter={trueProps}
                initialFocus="#revalidate-button"
                titleId="usa-da-revalidate-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-revalidate-modal" className="usa-da-certify-modal">
                        <div className={`usa-da-certify-modal-close usa-da-icon usa-da-icon-times${hideClose}`}>
                            <button aria-label="close" onClick={this.closeModal.bind(this)}>
                                <FontAwesomeIcon icon="times" />
                            </button>
                        </div>

                        <div className="usa-da-certify-modal-content">
                            <RevalidateButtons
                                {...this.props}
                                clickedRevalidateButton={this.clickedRevalidateButton} />
                            {error}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

RevalidateDataModal.propTypes = propTypes;
RevalidateDataModal.defaultProps = defaultProps;
