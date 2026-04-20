/**
  * CertifyButtons.jsx
  * Created by Kevin Li 9/7/16
  */

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

const CertifyButtons = ({
    clickedCertifyButton = null,
    clickedCertifyCheckbox = null,
    closeModal = null,
    session = {},
    certified = false,
    loading = false,
    type = 'both'
}) => {
    let certifyButtonText = 'Certify published data';
    let buttonClass = '';
    let checkboxText = 'certify';
    let icon = <FontAwesomeIcon icon="clipboard-check" />;
    if (type === 'publish') {
        certifyButtonText = 'Publish to USAspending.gov';
        checkboxText = 'attest';
        icon = <FontAwesomeIcon icon="file-arrow-up" />;
    }
    if (!certified) {
        buttonClass = ' btn-disabled';
    }
    if (loading) {
        const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
        certifyButtonText = `${capitalizedType}ing`;
        if (type === 'both') {
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
                        checked={certified}
                        onChange={clickedCertifyCheckbox} />
                    <label htmlFor="certify-check">
                        I <b>({session.user.name.toUpperCase()})</b> {checkboxText} that the data in this submission
                        meets the criteria above.
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-10">
                    <button
                        onClick={clickedCertifyButton}
                        className={`certify-button usa-da-button btn-full btn-primary${buttonClass}`}
                        disabled={!certified || loading}>
                        {icon}
                        {certifyButtonText}
                    </button>
                </div>
                <div className="col-md-6 mb-10">
                    <button onClick={closeModal} className="usa-da-button btn-full decline-button">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

CertifyButtons.propTypes = propTypes;
export default CertifyButtons;
