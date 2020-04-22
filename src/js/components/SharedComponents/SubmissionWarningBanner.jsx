/**
* SubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
*/

import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import BannerRow from './BannerRow';

const propTypes = {
    submissionInfo: PropTypes.object,
    revertSubmission: PropTypes.func,
    reverting: PropTypes.bool
};

const defaultProps = {
    submissionInfo: null,
    revertSubmission: null,
    reverting: false
};

export default class SubmissionWarningBanner extends React.Component {
    render() {
        let content = '';
        const disabled = this.props.reverting;
        if (this.props.submissionInfo != null) {
            let warningBannerType = this.props.submissionInfo.publish_status;
            if (this.props.submissionInfo.certified_submission) {
                warningBannerType = 'test-submission';
            }

            const warningBannerMap = {
                unpublished: null,
                'test-submission': {
                    header: (<p>Submission Already Certified for This Fiscal Quarter</p>),
                    message: (
                        <p>
                            You cannot certify this submission since one has already been certified for this fiscal quarter.
                            To view the certified submission, click <Link to={`/submission/${this.props.submissionInfo.certified_submission}/`}>here</Link>.
                        </p>),
                    useMarkdown: false
                },
                published: {
                    header: 'Submission Already Certified',
                    message: 'This submission has already been certified.' +
                            ' Any changes made will not be reflected on usaspending until it is re-certified.',
                    useMarkdown: true
                },
                publishing: {
                    header: 'Submission Currently Certifying',
                    message: 'This submission is currently certifying.' +
                            ' No changes can be made until the certification is complete.',
                    useMarkdown: true
                },
                updated: {
                    header: (<p>Submission Updated</p>),
                    message: (
                        <p>
                            This submission has been updated.
                            If you would like changes to be reflected on USASpending, please certify. <br />
                            <button
                                disabled={disabled}
                                className={`usa-da-button btn-primary btn-full${disabled ? ' btn-disabled' : ''}`}
                                onClick={this.props.revertSubmission}>
                                    Revert Submission
                            </button>
                        </p>),
                    useMarkdown: false
                },
                reverting: {
                    header: 'Submission Currently Reverting',
                    message: 'This submission is currently reverting.' +
                            ' No changes can be made until reverting is complete.',
                    useMarkdown: true
                }
            };
            const warningBanner = warningBannerMap[warningBannerType];
            if (warningBanner) {
                content = <BannerRow type="warning" {...warningBanner} />;
            }
        }
        return content;
    }
}

SubmissionWarningBanner.propTypes = propTypes;
SubmissionWarningBanner.defaultProps = defaultProps;
