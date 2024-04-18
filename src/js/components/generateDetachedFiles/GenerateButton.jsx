/**
 * GenerateButton.jsx
 * Created by Lizzie Salita 11/7/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

const propTypes = {
    agency: PropTypes.string.isRequired,
    generate: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    fileLabel: PropTypes.string.isRequired
};

export default class GenerateButton extends React.Component {
    render() {
        let message = `Generate ${this.props.fileLabel}`;
        let loadingMessage = '';
        if (this.props.status === 'generating') {
            message = 'Generating';
            loadingMessage = <LoadingBauble />;
        }
        else if (this.props.status === 'done') {
            message = `Regenerate ${this.props.fileLabel}`;
        }

        const disabled = (this.props.status === 'generating') || !this.props.agency;

        return (
            <div className="right-align-box">
                <button
                    className="usa-da-button btn-default generate-button"
                    disabled={disabled}
                    onClick={this.props.generate}>
                    {loadingMessage}{message}
                </button>
            </div>
        );
    }
}

GenerateButton.propTypes = propTypes;
