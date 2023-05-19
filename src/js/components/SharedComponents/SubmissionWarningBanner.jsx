/**
* SubmissionWarningBanner.jsx
* Created by Alisa Burdeyny 3/10/17
*/

import React from 'react';
import PropTypes from 'prop-types';

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
            const testSubmission = this.props.submissionInfo.test_submission;
            const pubSubIds = this.props.submissionInfo.published_submission_ids;
            let pubSub = null;
            if (testSubmission && pubSubIds.length === 0) {
                warningBannerType = 'test-submission';
            }
            else if (testSubmission && pubSubIds.length === 1) {
                warningBannerType = 'test-submission-one';
                pubSub = pubSubIds[0];
            }
            else if (testSubmission && pubSubIds.length > 1) {
                warningBannerType = 'test-submission-multiple';
            }
            else if (warningBannerType === 'published' && this.props.submissionInfo.certified) {
                warningBannerType = 'certified';
            }
            const updatedType = this.props.submissionInfo.certified ? 'certify' : 'publish';
            const certifyButtonText = this.props.submissionInfo.certified ? 'Publish & Certify' : 'Publish';
            const pastUpdatedType = this.props.submissionInfo.certified ? 'certified' : 'published';

            const warningBannerMap = {
                unpublished: null,
                'test-submission': {
                    header: 'This is a test submission',
                    message: `Test submissions cannot be published or certified, but they can be used to validate ` +
                        `your data.`
                },
                'test-submission-one': {
                    header: 'This is a test submission',
                    message: `A submission has already been published and/or certified for this time period. ` +
                        `To view the published and/or certified submission, [click here](/#/submission/${pubSub}).`
                },
                'test-submission-multiple': {
                    header: `This is a test submission`,
                    message: `Multiple submissions have already been published and/or certified for this time period.` +
                        `To view the published and/or certified submissions, visit the ` +
                        `[Submission Table](/#/submissionTable).`
                },
                published: {
                    header: 'Submission already published',
                    message: `Any changes to this submission will not be reflected on USAspending.gov until it is ` +
                        `republished.`
                },
                publishing: {
                    header: 'Submission currently publishing',
                    message: 'This submission is currently certifying.' +
                            ' No changes can be made until the certification is complete.'
                },
                certified: {
                    header: 'Submission already certified',
                    message: `Any changes to this submission will not be reflected on USAspending.gov until it is ` +
                        `recertified.`
                },
                updated: {
                    header: (<p>Submission updated</p>),
                    message: (
                        <p>
                            <b>To re{updatedType}</b> with these changes, complete the submission process and select
                            &quot;{certifyButtonText}&quot; on the Review and Publish page.
                            <br />
                            <b>To immediately undo these changes</b> and revert back to this submission&rsquo;s
                            previously {pastUpdatedType} state, click the &quot;Revert Submission&quot; button.
                            <br />
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
                    header: 'Submission currently reverting',
                    message: 'This submission is currently reverting.' +
                            ' No changes can be made until reverting is complete.'
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
