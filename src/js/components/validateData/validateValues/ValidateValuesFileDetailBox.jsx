/**
  * ValidateValuesFileDetailBox.jsx
  * Created by Kevin Li 6/27/16
  */

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    onClick: PropTypes.func,
    count: PropTypes.number,
    label: PropTypes.string,
    styleClass: PropTypes.string,
    expandedReport: PropTypes.bool
};

const ValidateValuesFileDetailBox = ({
    onClick = () => {}, count = 0, label = '', styleClass = '', expandedReport = false
}) => {
    const onKeyDownHandler = createOnKeyDownHandler(onClick);
    // handle CSS class for determining if the error/warning count should be color text or black
    let labelClass = 'usa-da-validate-item-message-count';
    if (count === 0) {
        labelClass += ' none';
    }

    // handle CSS for displaying the error/warning report button only when there are errors/warnings
    let showButton = ' hide';
    if (count > 0) {
        showButton = '';
    }

    // handle CSS class for expanding/collapsing the error/warning report
    let footerStatus = '';
    // toggle report button icon for open/close state
    let buttonIcon = <FontAwesomeIcon icon="angle-down" />;
    if (expandedReport) {
        footerStatus = ' active';
        buttonIcon = <FontAwesomeIcon icon="angle-up" className="angle-up-icon" />;
    }

    return (
        <div className={`col-md-6 ${styleClass}`}>
            <div className="row usa-da-validate-item-body">
                <div className="usa-da-validate-txt-wrap">
                    <span className="usa-da-validate-item-message-label">{label}:&nbsp;</span>
                    <span className={labelClass}>{count}</span>
                </div>
            </div>
            <div className="row usa-da-validate-item-footer-wrapper">
                <div
                    role="button"
                    tabIndex={0}
                    className={`usa-da-validate-item-footer usa-da-header-error${showButton}${footerStatus}`}
                    onKeyDown={onKeyDownHandler}
                    onClick={onClick}>
                    <div>View &amp; Download {label} Report
                        <span className="usa-da-icon">{buttonIcon}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ValidateValuesFileDetailBox.propTypes = propTypes;
export default ValidateValuesFileDetailBox;
