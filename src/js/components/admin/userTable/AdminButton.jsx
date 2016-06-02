/**
  * AdminButton.jsx
  **/

import React from 'react';
import classNames from 'classnames';

const defaultProps = {
    cssClasses: 'usa-da-button btn-primary'
}

export default class AdminButton extends React.Component {

    clickedButton(e) {
        e.preventDefault();
        this.props.onClick(this.props.value);
    }

    render() {

        return (
            <button type="button"
                className={this.props.cssClasses}
                onClick={this.clickedButton.bind(this)}>{this.props.name}</button>
        );
    }
}

AdminButton.defaultProps = defaultProps;