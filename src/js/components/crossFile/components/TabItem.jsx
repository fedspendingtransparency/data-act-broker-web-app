/**
  * TabItem.jsx
  * Created by Minahm Kim 11/21/17
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    changeTab: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.string,
    count: PropTypes.number,
    isActive: PropTypes.bool
};

const defaultProps = {
    changeTab: null,
    label: '',
    value: '',
    count: 0,
    isActive: false
};

export default class TabItem extends React.Component {
    clickedTab(e) {
        e.preventDefault();
        this.props.changeTab(this.props.value);
    }
    render() {
        let activeClass = '';
        if (this.props.isActive) {
            activeClass = ' active';
        }

        return (
            <button href="#" className={`tab-item${activeClass}`} onClick={this.clickedTab.bind(this)}>
                {this.props.label}
                <span className="count-badge">
                    {this.props.count}
                </span>
            </button>
        );
    }
}

TabItem.propTypes = propTypes;
TabItem.defaultProps = defaultProps;
