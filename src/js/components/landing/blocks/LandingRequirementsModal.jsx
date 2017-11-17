/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  **/

import React from 'react';
import Modal from 'react-aria-modal';

import * as Icons from '../../SharedComponents/icons/Icons.jsx';
import LandingBody from './LandingRequirementsBody.jsx';

export default class LandingRequirementsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            type: this.props.type
        };
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal(e) {
        if (e) {
            e.preventDefault();
        }

        this.setState({
            isOpen: false
        });
    }

    render() {
        // adding this because the linter doesn't like when we just pass true
        const trueProps = true;
        return (
            <Modal mounted={this.state.isOpen} onExit={this.closeModal.bind(this)} underlayClickExists={false}
                verticallyCenter={trueProps} titleId="usa-da-landing-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-landing-modal" className="usa-da-landing-modal">
                        <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                            <a href="#" onClick={this.closeModal.bind(this)}>
                                <Icons.Times />
                            </a>
                        </div>
                        <LandingBody {...this.props} />
                    </div>
                </div>
            </Modal>
        );
    }
}
