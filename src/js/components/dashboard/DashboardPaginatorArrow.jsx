/**
  * DashboardPaginatorArrowv.jsx
  * Created by Kevin Li 10/31/16
  */

import React, { PropTypes } from 'react';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

const propTypes = {
    moveDirection: PropTypes.func,
    direction: PropTypes.string
};

const defaultProps = {
    direction: 'left'
};

export default class DashboardPaginatorArrow extends React.Component {
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
                <a href="#" onClick={this.clickedArrow.bind(this)} title={altText}>
                    <div className="usa-da-icon">
                        {arrow}
                    </div>
                </a>
            </li>
        );
    }
}

DashboardPaginatorArrow.propTypes = propTypes;
DashboardPaginatorArrow.defaultProps = defaultProps;
