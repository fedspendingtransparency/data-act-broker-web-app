/**
* SubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
*/

import React from 'react';
import PropTypes from 'prop-types';
import BannerRow from './BannerRow';

const propTypes = {
    submission: PropTypes.object
};

const defaultProps = {
    submission: null
};

export default class SubmissionWarningBanner extends React.Component {
    render() {
        let content = '';
        let link = null;
        let warningBannerType = this.props.submission.publishStatus;
        if (this.props.submission.info.certifiedSubmission) {
            warningBannerType = 'test-submission';
            link = `https://broker.usaspending.gov/#/submission/${this.props.submission.info.certified_submission}/`;
        }
        if (warningBannerType === 'updated') {
            link = `https://broker.usaspending.gov/#/submission/${this.props.submission.id}/`;
        }

        const warningBannerMap = {
            unpublished: null,
            'test-submission': {
                header: 'Submission Already Certified for This Fiscal Quarter',
                message: `You cannot certify this submission since one has already been certified for this fiscal quarter.` +
                         ` To view the certified submission, click [here](${link}).`
            },
            published: {
                header: 'Submission Already Certified',
                message: 'This submission has already been certified.' +
                         ' Any changes made will not be reflected on usaspending until it is re-certified.'
            },
            publishing: {
                header: 'Submission Currently Certifying',
                message: 'This submission is currently certifying.' +
                         ' No changes can be made until the certification is complete.'
            },
            updated: {
                header: 'Submission Updated',
                message: `This submission has been updated.` +
                         ` If you would like changes to be reflected on USASpending, please certify.` +
                         ` If you would to undo these changes, click [here](${link}).`
            },
            reverting: {
                header: 'Submission Currently Reverting',
                message: 'This submission is currently reverting.' +
                         ' No changes can be made until reverting is complete.'
            }
        };
        const warningBanner = warningBannerMap[warningBannerType];
        if (warningBanner) {
            content = <BannerRow type="warning" {...warningBanner} />;
        }
        return content;
    }
}

SubmissionWarningBanner.propTypes = propTypes;
SubmissionWarningBanner.defaultProps = defaultProps;
