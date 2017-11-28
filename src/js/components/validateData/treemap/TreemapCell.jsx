/**
  * TreemapCell.jsx
  * Created by Kevin Li 4/11/2016
  */

import React, { PropTypes } from 'react';
import tinycolor from 'tinycolor2';

const propTypes = {
    clickedItem: PropTypes.func,
    colors: PropTypes.object,
    cellColor: PropTypes.string,
    title: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    active: PropTypes.bool
};

const defaultProps = {
    title: 'Unspecified',
    active: false
};

export default class TreemapCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
    }

    mouseOver() {
        this.setState({
            hover: true
        });
    }

    mouseOut() {
        this.setState({
            hover: false
        });
    }

    clickEvent() {
        this.props.clickedItem(this.props);
    }

    render() {
        const style = {
            top: this.props.y,
            left: this.props.x,
            height: this.props.height,
            width: this.props.width,
            backgroundColor: this.props.cellColor,
            border: '1px solid #fff'
        };

        if (this.state.hover) {
            style.backgroundColor = tinycolor(this.props.cellColor).lighten().desaturate().toString();
            style.border = '1px solid #323a45';
        }
        if (this.props.active) {
            style.backgroundColor = this.props.colors.active;
            style.border = '1px solid ' + this.props.colors.activeBorder;
            style.color = '#fff';
        }

        return (
            <div className="usa-da-treemap-cell" style={style} onMouseOver={this.mouseOver.bind(this)}
                onMouseOut={this.mouseOut.bind(this)} onClick={this.clickEvent.bind(this)}>
                <div className="treemap-rule">{this.props.title}</div>
            </div>
        );
    }
}

TreemapCell.propTypes = propTypes;
TreemapCell.defaultProps = defaultProps;
