/**
  * SubmissionTypeField.jsx
  * Created by Daniel Boos 6/24/20
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as UtilHelper from 'helpers/util';

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    publishedSubmissions: PropTypes.array,
    endDate: PropTypes.string,
    dateType: PropTypes.string
};

const defaultProps = {
    onChange: null,
    value: '',
    publishedSubmissions: [],
    endDate: '',
    dateType: ''
};

export default class SubmissionTypeField extends React.Component {
    constructor(props) {
        super(props);

        this.pickedTypeTest = this.pickedType.bind(this, 'test');
        this.pickedTypeCertifiable = this.pickedType.bind(this, 'certifiable');
    }

    pickedType(type) {
        this.props.onChange(type);
    }

    render() {
        let isTest = false;
        let isCertifiable = false;
        let certifiableCSS = '';
        let warningBanner = null;
        let disabled = false;

        if (this.props.value === "test") {
            isTest = true;
            isCertifiable = false;
        }
        else if (this.props.value === "certifiable") {
            isTest = false;
            isCertifiable = true;
        }

        if (this.props.publishedSubmissions.length > 0) {
            const singlePubSub = (this.props.publishedSubmissions.length === 1);
            const title = singlePubSub ?
                'A submission has already been published or certified' :
                'Monthly submissions have already been published or certified';
            const reason = singlePubSub ?
                'Only one submission can be published and certified for each time period.' :
                `Monthly and quarterly submissions cannot be published and certified within the same quarter. The
                monthly submissions that have been made within this quarter can be viewed in the Submission Table.`;
            warningBanner = (
                <div className="alert alert-warning text-left row" role="alert">
                    <div className="col-xs-1">
                        <FontAwesomeIcon icon="exclamation-triangle" />
                    </div>
                    <div className="col-xs-11">
                        <h3>{title}</h3>
                        <p>{reason}</p>
                    </div>
                </div>
            );
            certifiableCSS = 'disabled';
            disabled = true;
        }

        const dates = UtilHelper.getYearAndPeriod(this.props.endDate);

        if (dates.year >= 2022 && this.props.dateType === 'quarter') {
            warningBanner = (
                <div className="alert alert-warning text-left row" role="alert">
                    <div className="col-xs-1">
                        <FontAwesomeIcon icon="exclamation-triangle" />
                    </div>
                    <div className="col-xs-11">
                        <h3>As of FY22, Quarterly submissions can no longer be published or certified</h3>
                        <p>To create a certifiable submission you must choose the monthly submission type.</p>
                    </div>
                </div>
            );
            certifiableCSS = 'disabled';
            disabled = true;
        }

        return (
            <div>
                <div className="row usa-da-add-data-meta-label usa-da-duration">
                    What type of submission do you want to create?
                </div>
                <div className="row">
                    <div className="col-sm-12 pos-rel text-left usa-da-submission-type">
                        <div className="usa-da-submission-type-group">
                            <input
                                type="radio"
                                id="usa-da-submission-type-test"
                                name="submission-type"
                                value="test"
                                onChange={this.pickedTypeTest}
                                checked={isTest} />
                            <label htmlFor="usa-da-submission-type-test">
                                Test submission
                                <div className="subtype-description">
                                    Test submissions cannot be published or certified, but they can be used to validate
                                    your data.
                                </div>
                                <div className="subtype-description test-submission-note">
                                    <b>Note:</b> Test submissions are automatically deleted if they remain unedited for
                                    a period of 6 months.
                                </div>
                            </label>
                        </div>

                        <div className="usa-da-submission-type-group">
                            <input
                                type="radio"
                                id="usa-da-submission-type-certifiable"
                                name="submission-type"
                                value="certifiable"
                                onChange={this.pickedTypeCertifiable}
                                checked={isCertifiable}
                                disabled={disabled} />
                            <label htmlFor="usa-da-submission-type-certifiable" className={certifiableCSS}>
                                Certifiable submission
                                <div className="subtype-description">
                                    This will be the official publishable and certifiable submission for your agency
                                    for this selected time period.
                                </div>
                            </label>
                        </div>
                        {warningBanner}
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionTypeField.propTypes = propTypes;
SubmissionTypeField.defaultProps = defaultProps;
