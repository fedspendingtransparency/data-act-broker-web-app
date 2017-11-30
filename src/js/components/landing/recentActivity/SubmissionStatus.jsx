/**
  * SubmissionStatus.jsx
  * Created by Kevin Li 5/16/16
  */

import React, { PropTypes } from 'react';

const propTypes = {
    status: PropTypes.number,
    certified: PropTypes.bool
};

export const StatusTypes = {
    UNKNOWN: 0,
    STARTED: 1,
    INPROGRESS: 2,
    HASERRORS: 3,
    VALIDATED: 4,
    CERTIFIED: 5,
    SERVERERROR: 6,
    VALIDATEDWARNINGS: 7
};

const defaultProps = {
    status: StatusTypes.UNKNOWN,
    certified: false
};

export class SubmissionStatus extends React.Component {
    constructor(props) {
        super(props);

        this.statusStrings = ['Unknown', 'Started', 'Validation In Progress', 'Has Errors',
            'Validated (Without Errors)', 'Certified', 'Validation Server Error', 'Validated (With Warnings)'];
    }

    progressBar(value) {
        const colors = ['pending', 'pending', 'pending', 'pending'];

        if (value === StatusTypes.STARTED) {
            colors[0] = 'filled';
        }
        else if (value === StatusTypes.INPROGRESS) {
            colors[0] = 'filled';
            colors[1] = 'filled';
        }
        else if (value === StatusTypes.VALIDATED || value === StatusTypes.VALIDATEDWARNINGS) {
            for (let i = 0; i < 3; i++) {
                colors[i] = 'filled';
            }
        }
        else if (value === StatusTypes.HASERRORS) {
            for (let i = 0; i < 3; i++) {
                colors[i] = 'error';
            }
        }
        else if (value === StatusTypes.CERTIFIED) {
            for (let i = 0; i < colors.length; i++) {
                colors[i] = 'filled';
            }
        }
        else if (value === StatusTypes.SERVERERROR) {
            colors[0] = 'error';
        }

        return colors;
    }

    render() {
        const colors = this.progressBar(this.props.status);
        let label = this.statusStrings[this.props.status];
        if (this.props.status !== 5 && this.props.certified) {
            label += '\n(Needs Recertification)';
        }

        return (
            <div className="usa-da-table-submission-status">
                <div className="usa-da-status-label">
                    {label}
                </div>
                <div className="usa-da-submission-progress-bars">
                    <div className={"step " + colors[0]} />
                    <div className={"step " + colors[1]} />
                    <div className={"step " + colors[2]} />
                    <div className={"step " + colors[3]} />
                </div>
            </div>
        );
    }
}

SubmissionStatus.propTypes = propTypes;
SubmissionStatus.defaultProps = defaultProps;
