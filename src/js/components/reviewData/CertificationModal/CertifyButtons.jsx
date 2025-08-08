/**
  * CertifyButtons.jsx
  * Created by Kevin Li 9/7/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    clickedCertifyButton: PropTypes.func,
    clickedCertifyCheckbox: PropTypes.func,
    closeModal: PropTypes.func,
    session: PropTypes.object,
    certified: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['publish', 'certify', 'both'])
};

const defaultProps = {
    clickedCertifyButton: null,
    clickedCertifyCheckbox: null,
    closeModal: null,
    session: {},
    certified: false,
    type: 'both'
};

export default class CertifyButtons extends React.Component {
    render() {
        let certifyButtonText = 'Certify published data';
        let buttonClass = '';
        let checkboxText = 'certify';
        let icon = <FontAwesomeIcon icon="clipboard-check" />;
        if (this.props.type === 'publish') {
            certifyButtonText = 'Publish to USAspending.gov';
            checkboxText = 'attest';
            icon = <FontAwesomeIcon icon="file-arrow-up" />;
        }
        if (!this.props.certified) {
            buttonClass = ' btn-disabled';
        }
        if (this.props.loading) {
            const capitalizedType = this.props.type.charAt(0).toUpperCase() + this.props.type.slice(1);
            certifyButtonText = `${capitalizedType}ing`;
            if (this.props.type === 'both') {
                certifyButtonText = 'Certifying';
            }
            icon = '';
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12 certify-check">
                        <input
                            type="checkbox"
                            id="certify-check"
                            checked={this.props.certified}
                            onChange={this.props.clickedCertifyCheckbox} />
                        <label htmlFor="certify-check">
                            I <b>({this.props.session.user.name.toUpperCase()})</b> {checkboxText} that the data in this
                            submission meets the criteria above.
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-10">
                        <button
                            onClick={this.props.clickedCertifyButton}
                            className={`certify-button usa-da-button btn-full btn-primary${buttonClass}`}
                            disabled={!this.props.certified || this.props.loading}>
                            {icon}
                            {certifyButtonText}
                        </button>
                    </div>
                    <div className="col-md-6 mb-10">
                        <button onClick={this.props.closeModal} className="usa-da-button btn-full decline-button">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

CertifyButtons.propTypes = propTypes;
CertifyButtons.defaultProps = defaultProps;
