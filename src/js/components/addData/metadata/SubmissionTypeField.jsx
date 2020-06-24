/**
  * SubmissionTypeField.jsx
  * Created by Daniel Boos 6/24/20
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

const defaultProps = {
    onChange: null,
    value: ''
};

export default class SubmissionTypeField extends React.Component {
    pickedType(type) {
        this.props.onChange(type);
    }

    render() {
        let isTest = false;
        let isCertifiable = false;

        if (this.props.value === "test") {
            isTest = true;
            isCertifiable = false;
        }
        else if (this.props.value === "certifiable") {
            isTest = false;
            isCertifiable = true;
        }

        return (
            <div>
                <div className="row usa-da-add-data-meta-label usa-da-duration">
                    What type of submission do you want to create?
                </div>
                <div className="row">
                    <div className="col-sm-12 pos-rel text-left usa-da-submissiontype">
                        <div className="usa-da-submissiontype-group">
                            <input
                                type="radio"
                                id="usa-da-submisisontype-test"
                                name="submisisontype"
                                value="certifiable"
                                onClick={this.pickedType.bind(this, 'test')}
                                checked={isTest} />
                            <label htmlFor="usa-da-submisisontype-test">
                                Test Submission
                                <div className="subtype-description">
                                    Test submissions cannot be published or certified, but they can be used to validate your data.
                                </div>
                            </label>
                        </div>

                        <div className="usa-da-submissiontype-group">
                            <input
                                type="radio"
                                id="usa-da-submisisontype-certifiable"
                                name="submisisontype"
                                value="test"
                                onClick={this.pickedType.bind(this, 'certifiable')}
                                checked={isCertifiable} />
                            <label htmlFor="usa-da-submisisontype-certifiable">
                                Certifiable Submission
                                <div className="subtype-description">
                                    This will be the official publishable and certifiable submission for your agency for this selected time period.
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SubmissionTypeField.propTypes = propTypes;
SubmissionTypeField.defaultProps = defaultProps;
