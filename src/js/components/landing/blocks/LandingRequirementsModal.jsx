/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LandingBody from './LandingRequirementsBody';

const propTypes = {
    type: PropTypes.string
};

const defaultProps = {
    type: ''
};

export default class LandingRequirementsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            type: this.props.type
        };

        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <Modal
                mounted={this.state.isOpen}
                onExit={this.closeModal}
                verticallyCenter
                titleId="usa-da-landing-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-landing-modal" className="usa-da-landing-modal">
                        <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                            <button onClick={this.closeModal} aria-label="close">
                                <FontAwesomeIcon icon="times" />
                            </button>
                        </div>
                        <LandingBody {...this.props} />
                    </div>
                </div>
            </Modal>
        );
    }
}

LandingRequirementsModal.propTypes = propTypes;
LandingRequirementsModal.defaultProps = defaultProps;
