/**
  * RevalidateDataModal.jsx
  * Created by Nipun Monga 02/27/17
  */

import React, { PropTypes } from 'react';
import Modal from 'react-aria-modal';
import { hashHistory } from 'react-router';
import * as Icons from '../../SharedComponents/icons/Icons';

import RevalidateButtons from './RevalidateButtons';
import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    data: PropTypes.object,
    submissionID: PropTypes.string,
    isOpen: PropTypes.bool
};

const defaultProps = {
    closeModal: null,
    data: null,
    submissionID: '',
    isOpen: false
};

export default class RevalidateDataModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            closeable: true,
            errorMessage: ""
        };
    }

    clickedRevalidateButton(e) {
        e.preventDefault();

        ReviewHelper.revalidateSubmission(this.props.submissionID)
            .then(() => {
                this.closeModal();
                // Redirect to validateData page
                hashHistory.push('/validateData/' + this.props.submissionID);
            })
            .catch((error) => {
                let errMsg = "An error occurred while attempting to certify the submission. " +
                    "Please contact your administrator for assistance.";
                if (error.httpStatus === 400 || error.httpStatus === 403) {
                    errMsg = error.message;
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
        let hideClose = "";
        if (!this.state.closeable) {
            hideClose = " hide";
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
                initialFocus="#certify-check"
                titleId="usa-da-certify-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                        <div className={"usa-da-certify-modal-close usa-da-icon usa-da-icon-times" + hideClose}>
                            <a href="#" onClick={this.closeModal.bind(this)}>
                                <Icons.Times />
                            </a>
                        </div>

                        <div className="usa-da-certify-modal-content">
                            <RevalidateButtons
                                {...this.props}
                                clickedRevalidateButton={this.clickedRevalidateButton.bind(this)}
                                revalidationThreshold={this.props.data.revalidation_threshold} />

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
