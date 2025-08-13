/**
  * Modal.jsx
  * Created by Kate Kuratsu 03/24/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    content: PropTypes.node,
    isOpen: PropTypes.bool,
    cancel: PropTypes.bool,
    confirmText: PropTypes.string
};

const defaultProps = {
    onConfirm: () => {},
    onCancel: () => {},
    content: null,
    isOpen: false,
    cancel: false,
    confirmText: 'Ok'
};

export default class ErrorModal extends React.Component {
    constructor(props) {
        super(props);

        this.cancel = this.cancel.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    cancel(e) {
        return typeof this.props.onCancel === 'function' ? this.props.onCancel(e) : null;
    }

    confirm(e) {
        return typeof this.props.onConfirm === 'function' ? this.props.onConfirm(e) : null;
    }

    render() {
        const initialFocus = this.cancel ? '#usa-da-shared-close-button' : 'usa-da-shared-confirm-button';
        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.cancel}
                underlayClickExits
                verticallyCenter
                initialFocus={initialFocus}
                titleId="usa-da-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-modal" className="usa-da-shared-modal">
                        {this.props.cancel ?
                            <div className="usa-da-shared-close">
                                <button
                                    id="usa-da-shared-close-button"
                                    className="close-button"
                                    onClick={this.cancel}
                                    aria-label="close-modal-button">
                                    <FontAwesomeIcon icon="xmark" />
                                </button>
                            </div> : ''}
                        {this.props.content}
                        <div className="pull-right">
                            <br />
                            {this.props.cancel ?
                                <button
                                    id="usa-da-shared-cancel-button"
                                    className="btn-default usa-da-button cancel-button"
                                    onClick={this.cancel}>
                                    Cancel
                                </button> : ''}
                            <button
                                id="usa-da-shared-confirm-button"
                                className="btn btn-primary usa-da-button"
                                onClick={this.confirm}>
                                {this.props.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ErrorModal.propTypes = propTypes;
ErrorModal.defaultProps = defaultProps;
