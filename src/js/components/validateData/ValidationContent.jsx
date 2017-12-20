/**
 * ValidationContent.jsx
 * Created by Mike Hess 8/15/17
 */

import React, { PropTypes } from 'react';

import ValidationOverlayContainer from '../../containers/validateData/ValidationOverlayContainer';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer';
import ValidateDataInProgressOverlay from './ValidateDataInProgressOverlay';

import { fileTypes } from '../../containers/addData/fileTypes';

const propTypes = {
    session: PropTypes.object,
    submission: PropTypes.object,
    agencyName: PropTypes.string,
    hasFailed: PropTypes.bool,
    hasFinished: PropTypes.bool
};

const defaultProps = {
    session: {},
    submission: {},
    agencyName: "",
    hasFailed: false,
    hasFinished: false
};

export default class ValidationContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const errors = [];
        const warnings = [];
        const items = fileTypes.map((type, index) => {
            const data = this.props.submission.validation;
            const fileData = data[type.requestName];

            if (fileData && fileData.file_status === 'complete') {
                if (fileData.error_data.length > 0) {
                    errors.push(type.requestName);
                }
                if (fileData.warning_data.length > 0) {
                    warnings.push(type.requestName);
                }
                return (<ValidateValuesFileContainer
                    key={index}
                    type={type}
                    data={data}
                    agencyName={this.props.agencyName}
                    session={this.props.session} />);
            }
            else if (fileData) {
                errors.push(type.requestName);
                return (<ValidateDataFileContainer
                    key={index}
                    type={type}
                    data={data}
                    agencyName={this.props.agencyName} />);
            }
            return null;
        });

        let overlay = '';
        if (!this.props.hasFinished || this.props.hasFailed) {
            // still loading or validating
            overlay = <ValidateDataInProgressOverlay hasFailed={this.props.hasFailed} />;
        }
        else {
            overlay = (<ValidationOverlayContainer
                warnings={warnings}
                errors={errors} />);
        }

        return (
            <div className="container">
                <div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
                        {items}
                    </div>
                </div>
                {overlay}
            </div>
        );
    }
}

ValidationContent.propTypes = propTypes;
ValidationContent.defaultProps = defaultProps;
