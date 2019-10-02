/**
  * ReviewDataCertifyModal.jsx
  * Created by Kevin Li 9/6/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { hashHistory, Link } from 'react-router';
import * as Icons from '../../SharedComponents/icons/Icons';
import CertifyDisclaimer from './CertifyDisclaimer';
import CertifyButtons from './CertifyButtons';
import CertifyProgress from './CertifyProgress';
import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    session: PropTypes.object,
    submissionID: PropTypes.string,
    warnings: PropTypes.number,
    isOpen: PropTypes.bool
};

const defaultProps = {
    closeModal: null,
    session: null,
    submissionID: '',
    warnings: 0,
    isOpen: false
};

export default class ReviewDataCertifyModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            certified: false,
            showProgress: false,
            publishComplete: false,
            closeable: true,
            errorMessage: "",
            loading: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.clickedCertifyButton = this.clickedCertifyButton.bind(this);
        this.clickedCertifyCheckbox = this.clickedCertifyCheckbox.bind(this);
    }

    clickedCertifyCheckbox() {
        this.setState({
            certified: !this.state.certified
        });
    }

    clickedCertifyButton(e) {
        e.preventDefault();
        this.setState({ loading: true });

        ReviewHelper.certifySubmission(this.props.submissionID)
            .then(() => {
                this.setState({ loading: false });
                this.closeModal();
                // Redirect to submissions table after successful certification
                hashHistory.push("/submissionsTable");
            })
            .catch((error) => {
                let errorMessage = "An error occurred while attempting to certify the submission. " +
                    "Please contact your administrator for assistance.";
                if (error.httpStatus === 400 || error.httpStatus === 403) {
                    errorMessage = error.message;
                    if (error.submissionId) {
                        errorMessage = (
                            <div>
                                {error.message} You can update the certified submission
                                <Link to={`/submission/${error.submissionId}/validateData`}>here</Link>.
                            </div>);
                    }
                }

                this.setState({ errorMessage, loading: false });
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
            showProgress: false,
            certified: false,
            publishComplete: false,
            errorMessage: ''
        }, () => {
            this.props.closeModal();
        });
    }

    render() {
        let message = null;
        if (this.props.warnings > 0) {
            let warning = " warning";
            if (this.props.warnings !== 1) {
                warning = " warnings";
            }
            message = (
                <h6>
                    This submission contains <span className="variable-field">{this.props.warnings + warning}</span>.
                </h6>);
        }

        let action = (<CertifyButtons
            {...this.props}
            loading={this.state.loading}
            certified={this.state.certified}
            clickedCertifyButton={this.clickedCertifyButton}
            clickedCertifyCheckbox={this.clickedCertifyCheckbox} />);

        if (this.state.showProgress) {
            action = (<CertifyProgress
                {...this.props.session}
                finished={this.state.publishComplete}
                closeModal={this.closeModal} />);
        }

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
                onExit={this.closeModal}
                underlayClickExits={this.state.closeable}
                verticallyCenter={trueProps}
                initialFocus="#certify-check"
                titleId="usa-da-certify-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                        <div className={`usa-da-certify-modal-close usa-da-icon usa-da-icon-times${hideClose}`}>
                            <button onClick={this.closeModal}> <Icons.Times /> </button>
                        </div>

                        <div className="usa-da-certify-modal-content">
                            <div className="row">
                                <div className="col-md-12 title-field">
                                    <h6>Are you sure you want to publish your data?</h6>
                                    {message}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <CertifyDisclaimer />
                                </div>
                            </div>
                            {action}
                            {error}
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ReviewDataCertifyModal.propTypes = propTypes;
ReviewDataCertifyModal.defaultProps = defaultProps;
