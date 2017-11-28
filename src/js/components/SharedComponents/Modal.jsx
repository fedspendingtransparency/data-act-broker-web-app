/**
  * Modal.jsx
  * Created by Kate Kuratsu 03/24/17
  */

import React, { PropTypes } from 'react';
import Modal from 'react-aria-modal';

const propTypes = {
    onClose: PropTypes.func,
    content: PropTypes.node,
    isOpen: PropTypes.bool
};

export default class ErrorModal extends React.Component {
    closeModal(e) {
        return typeof this.props.onClose === 'function' ? this.props.onClose(e) : null;
    }

    render() {
        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;
        return (
            <Modal mounted={this.props.isOpen} onExit={this.closeModal.bind(this)} underlayClickExits={trueProps}
                verticallyCenter={trueProps} initialFocus="#modal-button" titleId="usa-da-certify-modal">
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
