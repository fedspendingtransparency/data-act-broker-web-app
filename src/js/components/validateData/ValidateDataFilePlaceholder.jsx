/**
 * ValidateDataFilePlaceholder.jsx
 * Created by Mike Bray 3/28/16
 */

import PropTypes from 'prop-types';

const propTypes = {
    fileTitle: PropTypes.string
};

const ValidateDataFilePlaceholder = ({fileTitle = ''}) => {
    return (
        <div className="row center-block usa-da-validate-item successful">
            <div className="col-md-12">
                <div className="row usa-da-validate-item-top-section">
                    <div className="col-md-9 usa-da-validate-item-status-section">
                        <div className="row usa-da-validate-item-header">
                            <div className="col-md-8">
                                <h4>{fileTitle}</h4>
                            </div>
                            <div className="col-md-4" />
                        </div>
                        <div className="row usa-da-validate-item-body">
                            <div
                                className="col-md-12 usa-da-validate-txt-wrap usa-da-validate-loading-message"
                                data-testid="validate-message">
                                Gathering data...
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="usa-da-validate-item-file-section">
                            <div className="usa-da-validate-item-file-section-result">
                                <div
                                    className="usa-da-icon"
                                    data-testid="validate-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ValidateDataFilePlaceholder.propTypes = propTypes;
export default ValidateDataFilePlaceholder;
