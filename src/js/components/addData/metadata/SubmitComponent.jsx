/**
  * SubmitComponent.jsx
  * Created by Kevin Li 5/20/16
  */

import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../../SharedComponents/SubmitButton';

const propTypes = {
    onSubmit: PropTypes.func,
    setRedirect: PropTypes.func,
    disabled: PropTypes.bool,
    publishedSubmissions: PropTypes.array
};

const defaultProps = {
    disabled: false,
    onSubmit: null,
    setRedirect: null,
    publishedSubmissions: []
};

export default class SubmitComponent extends React.Component {
    render() {
        let redirectButton = null;
        if (this.props.publishedSubmissions.length > 0) {
            const singlePubSub = (this.props.publishedSubmissions.length === 1);
            const redirectText = singlePubSub ? 'View existing submission' : 'View Submission Table';
            redirectButton = (
                <SubmitButton
                    onClick={this.props.setRedirect}
                    className="usa-da-button btn-primary-alt"
                    buttonText={redirectText}
                    buttonDisabled={this.props.disabled} />
            );
        }
        return (
            <div className="usa-da-meta-submit row" data-testid="submitbutton">
                {redirectButton}
                <SubmitButton
                    onClick={this.props.onSubmit}
                    className="usa-da-button btn-primary"
                    buttonText="Create submission"
                    buttonDisabled={this.props.disabled} />
            </div>
        );
    }
}

SubmitComponent.propTypes = propTypes;
SubmitComponent.defaultProps = defaultProps;
