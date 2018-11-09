/**
 * GenerateButton.jsx
 * Created by Lizzie Salita 11/7/18
 */

import React, { PropTypes } from 'react';

const propTypes = {
    agency: PropTypes.string,
    generate: PropTypes.func,
    status: PropTypes.string
};

const defaultProps = {
    agency: '',
    generate: () => {},
    status: ''
};

export default class GenerateButton extends React.Component {
    render() {
        let message = 'Generate File A';
        const disabled = (this.props.status === 'generating') || !this.props.agency;
        if (this.props.status === 'done' || this.props.status === 'failed') {
            message = 'Regenerate';
        }
        return (
            <div className="right-align-box">
                <button
                    className="usa-da-button btn-default generate-button"
                    disabled={disabled}
                    onClick={this.props.generate}>
                    {message}
                </button>
            </div>
        );
    }
}

GenerateButton.propTypes = propTypes;
GenerateButton.defaultProps = defaultProps;
