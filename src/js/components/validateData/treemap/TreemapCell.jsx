/**
  * TreemapCell.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import { createOnKeyDownHandler } from '../../../helpers/util';

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
    clickedItem: () => {},
    colors: {},
    cellColor: '',
    title: 'Unspecified',
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    active: false
};

export default class TreemapCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        };
        this.clickEvent = this.clickEvent.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.mouseOver = this.mouseOver.bind(this);
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
        const onKeyDownHandler = createOnKeyDownHandler(this.clickEvent);
        const style = {
            top: this.props.y,
            left: this.props.x,
            height: this.props.height,
            width: this.props.width,
            color: this.props.colors.text,
            backgroundColor: this.props.cellColor,
            border: '1px solid #fff'
        };

        if (this.state.hover) {
            style.backgroundColor = tinycolor(this.props.cellColor).lighten().desaturate().toString();
            style.border = '1px solid #323a45';
        }
        if (this.props.active) {
            style.color = this.props.colors.activeText;
            style.backgroundColor = this.props.colors.active;
            style.border = `1px solid ${this.props.colors.activeBorder}`;
        }

        return (
            <div
                role="button"
                tabIndex={0}
                className="usa-da-treemap-cell"
                style={style}
                onKeyUp={this.mouseOut}
                onKeyDown={onKeyDownHandler}
                onKeyPress={this.mouseOver}
                onMouseOver={this.mouseOver}
                onFocus={this.mouseOver}
                onMouseOut={this.mouseOut}
                onBlur={this.mouseOut}
                onClick={this.clickEvent}>
                <div className="treemap-rule">{this.props.title}</div>
            </div>
        );
    }
}

TreemapCell.propTypes = propTypes;
TreemapCell.defaultProps = defaultProps;
