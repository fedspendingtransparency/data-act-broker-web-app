/**
  * SubmissionsTablePaginatorArrow.jsx
  * Created by Kevin Li 10/31/16
  */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from '../SharedComponents/icons/Icons';

const propTypes = {
    moveDirection: PropTypes.func,
    direction: PropTypes.string
};

const defaultProps = {
    direction: 'left',
    moveDirection: null
};

export default class SubmissionsTablePaginatorArrow extends React.Component {
    clickedArrow(e) {
        e.preventDefault();
        this.props.moveDirection(this.props.direction);
    }
    render() {
        let altText = 'Go to previous page';
        let arrow = <Icons.AngleLeft alt={altText} />;
        if (this.props.direction !== 'left') {
            altText = 'Go to next page';
            arrow = <Icons.AngleRight alt={altText} />;
        }
        return (
            <li className="page-arrow">
                <button onClick={this.clickedArrow.bind(this)} title={altText}>
                    <div className="usa-da-icon">
                        {arrow}
                    </div>
                </button>
            </li>
        );
    }
}

SubmissionsTablePaginatorArrow.propTypes = propTypes;
SubmissionsTablePaginatorArrow.defaultProps = defaultProps;
