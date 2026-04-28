/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  */

import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LandingBody from './LandingRequirementsBody';

const propTypes = {
    type: PropTypes.string,
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired
};

const LandingRequirementsModal = ({type = '', isOpen = false, ...props}) => {
    return (
        <Modal
            mounted={isOpen}
            onExit={props.closeModal}
            verticallyCenter
            titleId="usa-da-landing-modal">
            <div className="usa-da-modal-page">
                <div id="usa-da-landing-modal" className="usa-da-landing-modal">
                    <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                        <button onClick={props.closeModal} aria-label="close">
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                    </div>
                    <LandingBody type={type} {...props} />
                </div>
            </div>
        </Modal>
    );
};

LandingRequirementsModal.propTypes = propTypes;
export default LandingRequirementsModal;
