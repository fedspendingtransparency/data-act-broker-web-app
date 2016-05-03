/**
 * ReviewDataButton.jsx
 * Created by Mike Bray 4/5/16
 **/

import React, { PropTypes } from 'react';
import BaseIcon from '../SharedComponents/icons/BaseIcon.jsx';
import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    icon: PropTypes.element,
    label: PropTypes.string
};

export default class ReviewDataButton extends React.Component {
    render() {
        let iconName = this.props.icon;

        return (
            <div className="usa-da-review-data-button-holder">
                <button className="usa-button-big usa-button-disabled"><span className='usa-da-icon'>{iconName}</span> &nbsp;{this.props.label}</button>
            </div>
        );
    }
}

ReviewDataButton.propTypes = propTypes;