/**
 * FooterComponent.jsx
 * Created by Mike Bray 12/26/15
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaveSiteModal from 'components/SharedComponents/LeaveSiteModal';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leaveSiteModalOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            leaveSiteModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            leaveSiteModalOpen: false
        });
    }

    render() {
        const year = new Date().getFullYear();
        return (
            <div className="usa-da-footer" role="contentinfo">
                &copy; {year}&nbsp;
                <a href="https://www.usaspending.gov/" rel="noopener noreferrer" target="_blank">
                    USAspending.gov
                </a>
                <button
                    onClick={this.openModal}
                    aria-label="Broker GitHub">
                    <FontAwesomeIcon icon={['fab', 'github']} className="github-icon" />
                </button>
                <div id="leaveSiteModalHolder">
                    <LeaveSiteModal
                        {...this.props}
                        closeModal={this.closeModal}
                        isOpen={this.state.leaveSiteModalOpen}
                        redirectURL="https://github.com/fedspendingtransparency/data-act-broker-backend"
                        focusButton="#github-button" />
                </div>
            </div>
        );
    }
}
