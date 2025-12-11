/**
  * TreemapCell.jsx
  * Created by Kevin Li 4/11/2016
  */

import { useState } from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import { createOnKeyDownHandler } from '../../../helpers/util';

const propTypes = {
    clickedItem: PropTypes.func,
    colors: PropTypes.object,
    cellColor: PropTypes.string,
    name: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    active: PropTypes.bool
};

const TreemapCell = ({
    clickedItem = () => {},
    colors = {},
    cellColor = '',
    name = 'Unspecified',
    height = 0,
    width = 0,
    x = 0,
    y = 0,
    active = false,
    ...props
}) => {
    const [hover, setHover] = useState(false);

    const mouseOver = () => {
        setHover(true);
    };

    const mouseOut = () => {
        setHover(false);
    };

    const clickEvent = () => {
        clickedItem({
            name: name,
            ...props
        });
    };

    const onKeyDownHandler = createOnKeyDownHandler(clickEvent);
    const style = {
        top: y,
        left: x,
        height: height,
        width: width,
        color: colors.text,
        backgroundColor: cellColor,
        border: '1px solid #fff'
    };

    if (hover) {
        style.backgroundColor = tinycolor(cellColor).lighten().desaturate().toString();
        style.border = '1px solid #323a45';
    }
    if (active) {
        style.color = colors.activeText;
        style.backgroundColor = colors.active;
        style.border = `1px solid ${colors.activeBorder}`;
    }

    return (
        <div
            role="button"
            tabIndex={0}
            className="usa-da-treemap-cell"
            style={style}
            onKeyUp={mouseOut}
            onKeyDown={onKeyDownHandler}
            onMouseOver={mouseOver}
            onFocus={mouseOver}
            onMouseOut={mouseOut}
            onBlur={mouseOut}
            onClick={clickEvent}>
            <div className="treemap-rule">{name}</div>
        </div>
    );
};

TreemapCell.propTypes = propTypes;
export default TreemapCell;
