/**
 * ValidationContent.jsx
 * Created by Mike Hess 8/15/17
 */

import PropTypes from 'prop-types';

import ValidationOverlayContainer from '../../containers/validateData/ValidationOverlayContainer';
import ValidateDataFileContainer from '../../containers/validateData/ValidateDataFileContainer';
import ValidateValuesFileContainer from '../../containers/validateData/ValidateValuesFileContainer';
import ValidateDataInProgressOverlay from './ValidateDataInProgressOverlay';

import fileTypes from '../../containers/addData/fileTypes';

const propTypes = {
    session: PropTypes.object,
    submission: PropTypes.object,
    agencyName: PropTypes.string,
    hasFailed: PropTypes.bool,
    hasFinished: PropTypes.bool,
    submissionID: PropTypes.string,
    progressMeta: PropTypes.object,
    resetProgress: PropTypes.func
};

const ValidationContent = ({
    session = {},
    submission = {},
    agencyName = '',
    hasFailed = false,
    hasFinished = false,
    progressMeta = {},
    resetProgress = () => {},
    ...props
}) => {
    const errors = [];
    const warnings = [];
    const items = fileTypes.map((type) => {
        const data = submission.validation;
        const fileData = data[type.requestName];

        if (fileData && fileData.file_status === 'complete') {
            if (fileData.error_data.length > 0) {
                errors.push(type.requestName);
            }
            if (fileData.warning_data.length > 0) {
                warnings.push(type.requestName);
            }
            return (<ValidateValuesFileContainer
                key={type.fileTitle}
                type={type}
                data={data}
                agencyName={agencyName}
                session={session} />);
        }
        else if (fileData) {
            errors.push(type.requestName);
            return (<ValidateDataFileContainer
                key={type.fileTitle}
                type={type}
                data={data}
                agencyName={agencyName}
                progress={progressMeta[type.requestName].progress}
                fileName={progressMeta[type.requestName].name} />);
        }
        return null;
    });

    let overlay = '';
    if (!hasFinished || hasFailed) {
        // still loading or validating
        overlay = <ValidateDataInProgressOverlay hasFailed={hasFailed} />;
    }
    else {
        overlay = (<ValidationOverlayContainer
            warnings={warnings}
            errors={errors}
            submissionID={props.submissionID}
            resetProgress={resetProgress} />);
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
};

ValidationContent.propTypes = propTypes;
export default ValidationContent;
