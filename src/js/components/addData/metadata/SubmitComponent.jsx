/**
  * SubmitComponent.jsx
  * Created by Kevin Li 5/20/16
  */

import React, { PropTypes } from 'react';
import SubmitButton from '../../SharedComponents/SubmitButton';

const propTypes = {
    onSubmit: PropTypes.func,
    message: PropTypes.string,
    disabled: PropTypes.bool
};

const defaultProps = {
    disabled: false
};

export default class SubmitComponent extends React.Component {
    render() {
        return (
            <div className="usa-da-meta-submit">
                <div className="row">
                    <div className="col-sm-8 text-left usa-da-meta-message">
                        {this.props.message}
                    </div>
                    <div className="col-sm-4" data-testid="submitbutton">
                        <SubmitButton
                            onClick={this.props.onSubmit}
                            className="usa-da-button btn-primary btn-lg pull-right"
                            buttonText="Submit"
                            buttonDisabled={this.props.disabled} />
                    </div>
                </div>
            </div>
        );
    }
}

SubmitComponent.propTypes = propTypes;
SubmitComponent.defaultProps = defaultProps;
