/**
 * ReviewDataButton.jsx
 * Created by Mike Bray 4/5/16
 **/

import React, { PropTypes } from 'react';

const propTypes = {
    icon: PropTypes.string,
    label: PropTypes.string
};

export default class ReviewDataButton extends React.Component {
    render() {
        let iconName = 'glyphicon glyphicon-'+this.props.icon;

        return (
            <div className="usa-da-review-data-button-holder">
                <button className="usa-button-big"><i className={iconName}></i>&nbsp;{this.props.label}</button>
            </div>
        );
    }
}

ReviewDataButton.propTypes = propTypes;