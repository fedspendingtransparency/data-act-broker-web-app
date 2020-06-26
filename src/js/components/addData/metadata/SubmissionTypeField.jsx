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
                    <div className="col-sm-12 pos-rel text-left usa-da-submission-type">
                        <div className="usa-da-submission-type-group">
                            <input
                                type="radio"
                                id="usa-da-submisison-type-test"
                                name="submisison-type"
                                value="test"
                                onClick={this.pickedTypeTest}
                                checked={isTest} />
                            <label htmlFor="usa-da-submisison-type-test">
                                Test Submission
                                <div className="subtype-description">
                                    Test submissions cannot be published or certified, but they can be used to validate your data.
                                </div>
                            </label>
                        </div>

                        <div className="usa-da-submission-type-group">
                            <input
                                type="radio"
                                id="usa-da-submisison-type-certifiable"
                                name="submisison-type"
                                value="certifiable"
                                onClick={this.pickedTypeCertifiable}
                                checked={isCertifiable} />
                            <label htmlFor="usa-da-submisison-type-certifiable">
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
