/**
  * AdminButton.jsx
  **/

import React from 'react';
import classNames from 'classnames';

const defaultProps = {
    cssClasses: 'usa-da-button btn-primary'
}

export default class AdminButton extends React.Component {
    render() {

        return (
            <button type="button"
                className={this.props.cssClasses}
                onClick={this.props.clickedButton}>{this.props.name}</button>
        );
    }
}

AdminButton.defaultProps = defaultProps;