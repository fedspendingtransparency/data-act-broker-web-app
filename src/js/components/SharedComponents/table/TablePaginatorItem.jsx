/**
  * TablePaginatorItem.jsx
  * Created by Kevin Li 10/31/16
  */

import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    changePage: PropTypes.func,
    value: PropTypes.number,
    current: PropTypes.bool,
    showLead: PropTypes.bool,
    showTail: PropTypes.bool
};

const defaultProps = {
    changePage: null,
    current: false,
    value: 1,
    showLead: false,
    showTail: false
};

export default class TablePaginatorItem extends React.Component {
    clickedPage(e) {
        e.preventDefault();
        this.props.changePage(this.props.value);
    }

    render() {
        let className = '';
        if (this.props.current) {
            className = 'active';
        }

        let start = null;
        let end = null;

        if (this.props.showLead) {
            start = <FontAwesomeIcon icon="ellipsis-h" className="pre" />;
        }

        if (this.props.showTail) {
            end = <FontAwesomeIcon icon="ellipsis-h" className="post" />;
        }

        return (
            <li className={className}>
                {start}
                <button onClick={this.clickedPage.bind(this)} title={`Go to page ${this.props.value}`}>
                    {this.props.value}
                </button>
                {end}
            </li>
        );
    }
}

TablePaginatorItem.propTypes = propTypes;
TablePaginatorItem.defaultProps = defaultProps;
