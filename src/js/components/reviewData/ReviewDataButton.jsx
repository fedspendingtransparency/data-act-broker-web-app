/**
 * ReviewDataButton.jsx
 * Created by Mike Bray 4/5/16
 */

import React from 'react'; 
import PropTypes from 'prop-types';

const propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string
};

const defaultProps = {
    icon: null,
    label: ''
};

export default class ReviewDataButton extends React.Component {
    render() {
        return (
            <div className="usa-da-review-data-button-holder">
                <button className="usa-button-big usa-button-disabled">
                    <span className="usa-da-icon">{this.props.icon}</span> &nbsp;{this.props.label}
                </button>
            </div>
        );
    }
}

ReviewDataButton.propTypes = propTypes;
ReviewDataButton.defaultProps = defaultProps;
