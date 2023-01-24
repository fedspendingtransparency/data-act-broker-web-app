/**
  * RevalidateDataModal.jsx
  * Created by Nipun Monga 02/27/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    closeModal: PropTypes.func,
    redirectURL: PropTypes.string,
    focusButton: PropTypes.string,
    isOpen: PropTypes.bool
};

const defaultProps = {
    closeModal: null,
    redirectURL: '',
    focusButton: '',
    isOpen: false
};

export default class RevalidateDataModal extends React.Component {
    render() {
        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;

        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.props.closeModal}
                verticallyCenter={trueProps}
                initialFocus={this.props.focusButton}
                titleId="usa-da-leave-site-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-leave-site-modal" className="usa-da-shared-modal">
                        <div className="usa-da-shared-close">
                            <button onClick={this.props.closeModal} aria-label="close-modal">
                                <FontAwesomeIcon icon="times" />
                            </button>
                        </div>

                        <div className="usa-da-leave-site-modal-content">
                            <h2>
                                <FontAwesomeIcon icon="exclamation-triangle" />
                                You're leaving a Federal Government website.
                            </h2>

                            <p>
                                You're going to a website that is not managed or controlled by the Federal Government.
                                Its privacy policies may differ from ours.
                            </p>

                            <span>Click this link to go to the website you have selected</span>
                            <a href={this.props.redirectURL} rel="noopener noreferrer" target="_blank">
                                {this.props.redirectURL}
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

RevalidateDataModal.propTypes = propTypes;
RevalidateDataModal.defaultProps = defaultProps;
