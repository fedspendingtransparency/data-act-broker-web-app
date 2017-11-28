/**
  * TabItem.jsx
  * Created by Minahm Kim 11/21/17
  */

import React, { PropTypes } from 'react';

const propTypes = {
    changeTab: PropTypes.func,
    counts: PropTypes.object,
    activeTab: PropTypes.string,
    label: PropTypes.string,
    status: PropTypes.string,
    value: PropTypes.string,
    count: PropTypes.number,
    isActive: PropTypes.bool
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
            <a href="#" className={"tab-item" + activeClass} onClick={this.clickedTab.bind(this)}>
                {this.props.label}
                <span className="count-badge">
                    {this.props.count}
                </span>
            </a>
        );
    }
}

TabItem.propTypes = propTypes;
