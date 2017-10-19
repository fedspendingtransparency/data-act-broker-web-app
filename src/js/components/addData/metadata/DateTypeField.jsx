/**
  * DateTypeField.jsx
  * Created by Kevin Li 5/19/16
  **/

import React from 'react';

export default class DateTypeField extends React.Component {
    pickedType(type, e) {
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
                    <div className="col-sm-12 pos-rel text-left usa-da-datetype">
                        <div className="usa-da-datetype-group">
                            <input type="radio" id="usa-da-datetype-month" name="datetype" value="monthly"
                                onClick={this.pickedType.bind(this, 'month')} checked={isMonth} />
                            <label htmlFor="usa-da-datetype-month">
                                Monthly
                            </label>
                        </div>

                        <div className="usa-da-datetype-group">
                            <input type="radio" id="usa-da-datetype-quarterly" name="datetype" value="quarterly"
                                onClick={this.pickedType.bind(this, 'quarter')} checked={isQuarter}/>
                            <label htmlFor="usa-da-datetype-quarterly">
                                Quarterly
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
