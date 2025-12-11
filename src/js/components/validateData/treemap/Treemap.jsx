/**
  * Treemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import tinycolor from 'tinycolor2';

import TreemapCell from './TreemapCell';

const propTypes = {
    clickedItem: PropTypes.func,
    colors: PropTypes.object,
    formattedData: PropTypes.object,
    activeCell: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number
};


const Treemap = ({
    clickedItem = () => {},
    width = 0,
    height = 300,
    activeCell = -1,
    colors = {},
    formattedData = {
        data: [],
        max: 0,
        min: 0
    }
}) => {
    const [chartState, setChartState] = useState(null);
    const formattedDataString = JSON.stringify(formattedData);

    useEffect(() => {
        setChart();
    }, []);

    useEffect(() => {
        setChart();
    }, [formattedDataString, activeCell, width]);

    const setChart = () => {
        setChartState(drawChart());
    };

    const drawChart = () => {
        const hierarchy = d3.hierarchy(formattedData.data)
            .sum((d) => d.value)
            .sort((a, b) =>
                // order by the parent component's pre-sorted array indices
                b.index - a.index
            );
        const layout = d3.treemap()
            .size([width, height])
            .padding(1);

        const treemap = layout(hierarchy);

        const baseColor = colors.base;
        return treemap.leaves().map((node) => {
            const max = formattedData.max;
            const min = formattedData.min;

            let tint = 0;
            if (max !== min) {
                // prevent divide by zero errors
                tint = (40 / (formattedData.max - formattedData.min)) *
                    (formattedData.max - node.data.value);
            }

            // determine if the cell is currently selected
            let active = false;
            if (node.data.index === activeCell) {
                active = true;
            }

            const color = tinycolor(baseColor).lighten(tint).toString();

            return (<TreemapCell
                key={`${node.data.description}-${node.data.index}`}
                width={node.x1 - node.x0}
                height={node.y1 - node.y0}
                x={node.x0}
                y={node.y0}
                cellColor={color}
                colors={colors}
                cellId={node.data.index}
                active={active}
                name={node.data.name}
                count={node.data.value}
                field={node.data.field}
                detail={node.data.detail}
                description={node.data.description}
                clickedItem={clickedItem} />);
        });
    };

    return (
        <div className="usa-da-treemap">
            {chartState}
        </div>
    );
};

Treemap.propTypes = propTypes;
export default Treemap;
