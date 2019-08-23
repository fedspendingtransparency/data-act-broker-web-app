/**
  * DeleteModal.jsx
  * Created by Minahm Kim 03/10/17
  */

import React, { PropTypes } from 'react';
import Modal from 'react-aria-modal';
import * as Icons from '../../SharedComponents/icons/Icons';

import * as ReviewHelper from '../../../helpers/reviewHelper';

const propTypes = {
    closeModal: PropTypes.func,
    delete: PropTypes.func,
    id: PropTypes.number,
    isOpen: PropTypes.bool
};

const defaultProps = {
    closeModal: () => {},
    delete: () => {},
    id: null,
    isOpen: false
};

export default class DeleteModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: "",
            disable: false
        };
    }

    clickedDeleteButton() {
        ReviewHelper.deleteSubmission(this.props.id)
            .then((data) => {
                if (data.message === 'Success') {
                    this.props.delete();

                    // reset the modal if closed
                    this.setState({
                        errorMessage: ''
                    }, () => {
                        this.props.closeModal();
                    });
                }
            })
            .catch((error) => {
                let errorMessage = "An error occurred while attempting to delete the submission. Please contact " +
                    "your administrator for assistance.";
                if (error.message && error.message !== "") {
                    errorMessage = error.message;
                }
                this.setState({ errorMessage });
                this.setState({ disable: true });
            });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }

        // reset the modal if closed
        this.setState({
            errorMessage: ''
        }, () => {
            this.props.closeModal();
        });
    }

    render() {
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
                underlayClickExits={trueProps}
                verticallyCenter={trueProps}
                initialFocus="#delete-button"
                titleId="usa-da-certify-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                        <div className="usa-da-certify-modal-close usa-da-icon usa-da-icon-times">
                            <button onClick={this.closeModal.bind(this)}> <Icons.Times /> </button>
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
                                onClick={this.clickedDeleteButton.bind(this)}
                                disabled={this.state.disable}>Delete
                            </button>
                            <button className="btn btn-default" onClick={this.closeModal.bind(this)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

DeleteModal.propTypes = propTypes;
DeleteModal.defaultProps = defaultProps;
