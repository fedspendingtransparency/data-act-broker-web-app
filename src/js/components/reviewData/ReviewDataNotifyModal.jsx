/**
 * ReviewDataNotifyModal.jsx
 * Created by Mike Bray 6/5/16
 */

import React from 'react';
import Modal from 'react-modal';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class LandingRequirementsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        Modal.setAppElement('#reviewDataNotifyModalHolder');
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal(e) {
        e.preventDefault();

        this.setState({
            isOpen: false
        });
    }

    render() {
        let autoCompleteItems = null;

        return (
            <Modal isOpen={this.state.isOpen} overlayClassName="usa-da-landing-modal-overlay" className="usa-da-landing-modal">
                <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                    <a href="#" onClick={this.closeModal.bind(this)}> <Icons.Times /> </a>
                </div>

                <div className="usa-da-landing-modal-content">
                    <h6>Notify Another User that the Submission is Ready for Certification</h6>

                    <div className="usa-da-autocomplete-holder">
                        {autoCompleteItems}
                    </div>

                    <div className="col-md-offset-6 col-md-6">
                        <a href="#" className="usa-da-button btn-primary btn-sm btn-full">Send Notification</a>
                    </div>
                </div>
            </Modal>
        );
    }
}