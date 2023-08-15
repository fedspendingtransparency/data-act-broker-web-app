/**
* DropZoneGenerated.jsx
* Created by Alisa Burdeyny 8/14/23
*/

import React from 'react';
import PropTypes from 'prop-types';

import * as UtilHelper from 'helpers/util';

import DropZoneDisplay from './DropZoneDisplay';

const propTypes = {
    onDrop: PropTypes.func,
    resetSubmission: PropTypes.func,
    submission: PropTypes.object,
    fileTitle: PropTypes.string,
    requestName: PropTypes.string.isRequired
};

const defaultProps = {
    onDrop: null,
    resetSubmission: null,
    submission: null,
    fileTitle: ''
};

export default class DropZone extends React.Component {
    componentWillUnmount() {
        this.props.resetSubmission();
    }

    render() {
        // Need to use charAt because we have a : at the end of the letter
        const fileLetter = this.props.fileTitle.split(' ')[1].charAt(0);
        let fyDate = UtilHelper.getYearAndPeriod(this.props.submission.meta.endDate);
        let periodQuarter = `P${fyDate.period.toString().padStart(2, '0')}`;
        const fy = fyDate.year.toString().slice(-2);
        // if quarterly, adjust to show quarter to be generated
        if (this.props.submission.meta.dateType !== 'month') {
            const quarter = UtilHelper.convertDateToQuarter(this.props.submission.meta.startDate, 'MMYYYY');
            periodQuarter = `Q${quarter}`;
        }
        const dropzoneString = `**File-${fileLetter}_FY${fy}${periodQuarter}** to be generated.`;
        const progress = 0;

        return (
            <div className="usa-da-dropzone text-center non-interactive">
                <DropZoneDisplay
                    displayMode='ready'
                    displayString={dropzoneString}
                    progress={progress} />
            </div>
        );
    }
}

DropZone.propTypes = propTypes;
DropZone.defaultProps = defaultProps;
