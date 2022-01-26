/**
  * DateTypeField.jsx
  * Created by Kevin Li 5/19/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

const defaultProps = {
    onChange: null,
    value: ''
};

export default class DateTypeField extends React.Component {
    constructor(props) {
        super(props);

        this.pickedTypeMonth = this.pickedType.bind(this, 'month');
        this.pickedTypeQuarter = this.pickedType.bind(this, 'quarter');
    }

    pickedType(type) {
        this.props.onChange(type);
    }

    render() {
        let isMonth = false;
        let isQuarter = false;

        if (this.props.value === "month") {
            isMonth = true;
            isQuarter = false;
        }
        else if (this.props.value === "quarter") {
            isMonth = false;
            isQuarter = true;
        }

        return (
            <div>
                <div className="row usa-da-add-data-meta-label usa-da-duration">
                    For what duration are you submitting or validating data?
                </div>
                <div className="row">
                    <div className="col-sm-12 pos-rel text-left usa-da-date-type">
                        <div className="usa-da-date-type-group">
                            <input
                                type="radio"
                                id="usa-da-date-type-month"
                                name="date-type"
                                value="monthly"
                                onChange={this.pickedTypeMonth}
                                checked={isMonth} />
                            <label htmlFor="usa-da-date-type-month">
                                Monthly
                            </label>
                        </div>

                        <div className="usa-da-date-type-group">
                            <input
                                type="radio"
                                id="usa-da-date-type-quarterly"
                                name="date-type"
                                value="quarterly"
                                onChange={this.pickedTypeQuarter}
                                checked={isQuarter} />
                            <label htmlFor="usa-da-date-type-quarterly">
                                Quarterly
                            </label>
                        </div>
                    </div>
                    <div className="quarterly-submission-note">
                        <b>Note:</b> Quarterly submissions are only available for FY21 and prior.
                    </div>
                </div>
            </div>
        );
    }
}

DateTypeField.propTypes = propTypes;
DateTypeField.defaultProps = defaultProps;
