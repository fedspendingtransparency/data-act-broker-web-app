/**
  * Modal.jsx
  * Created by Kate Kuratsu 03/24/17
  */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';

const propTypes = {
    onClose: PropTypes.func,
    content: PropTypes.node,
    isOpen: PropTypes.bool
};

const defaultProps = {
    onClose: () => {},
    content: null,
    isOpen: false
};

export default class ErrorModal extends React.Component {
    closeModal(e) {
        return typeof this.props.onClose === 'function' ? this.props.onClose(e) : null;
    }

    render() {
        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.closeModal.bind(this)}
                underlayClickExits
                verticallyCenter
                titleId="usa-da-certify-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-certify-modal" className="usa-da-certify-modal">
                        {this.props.content}
                        <div className="pull-right">
                            <br />
                            <button className="btn btn-primary" onClick={this.closeModal.bind(this)}>Ok</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

ErrorModal.propTypes = propTypes;
ErrorModal.defaultProps = defaultProps;
