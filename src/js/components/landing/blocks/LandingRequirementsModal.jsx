/**
  * LandingRequirementsModal.jsx
  * Created by Kevin Li 5/17/16
  */

import React, { PropTypes } from 'react';
import Modal from 'react-aria-modal';

import * as Icons from '../../SharedComponents/icons/Icons';
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
            <Modal
                mounted={this.state.isOpen}
                onExit={this.closeModal.bind(this)}
                underlayClickExists={false}
                verticallyCenter={trueProps}
                titleId="usa-da-landing-modal">
                <div className="usa-da-modal-page">
                    <div id="usa-da-landing-modal" className="usa-da-landing-modal">
                        <div className="usa-da-landing-modal-close usa-da-icon usa-da-icon-times">
                            <button onClick={this.closeModal.bind(this)}>
                                <Icons.Times />
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
