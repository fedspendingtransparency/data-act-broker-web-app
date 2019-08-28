/**
  * Treemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react'; 
import PropTypes from 'prop-types';
import d3 from 'd3';
import _ from 'lodash';
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

const defaultProps = {
    clickedItem: () => {},
    width: 0,
    height: 300,
    activeCell: -1,
    formattedData: {
        data: [],
        max: 0,
        min: 0
    },
    colors: {}
};


export default class Treemap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chart: null
        };
    }

    componentDidMount() {
        this.setChart();
    }

    componentDidUpdate(prevProps) {
        // only re-render when props we care about change
        if (!_.isEqualWith(prevProps, this.props, this.compareProps)) {
            this.setChart();
        }
    }

    setChart() {
        this.setState({
            chart: this.drawChart()
        });
    }

    compareProps(prevProps, newProps) {
        // custom object comparison to only look at those keys we care about
        if (!_.isEqual(prevProps.formattedData, newProps.formattedData)) {
            // data changed, always re-render
            return false;
        }

        if (prevProps.activeCell !== newProps.activeCell) {
            // active cell changed, re-render
            return false;
        }

        if (prevProps.width !== newProps.width) {
            // re-render because window width changed (to keep it responsive)
            return false;
        }

        // don't care about the other props
        return true;
    }

    drawChart() {
        const layout = d3.layout.treemap()
            .children((d) => d)
            .size([this.props.width, this.props.height])
            .sort((a, b) =>
                // order by the parent component's pre-sorted array indices
                b.index - a.index
            )
            .sticky(true);

        const treemap = layout(this.props.formattedData.data);

        const baseColor = this.props.colors.base;
        return treemap.map((node) => {
            const max = this.props.formattedData.max;
            const min = this.props.formattedData.min;

            let tint = 0;
            if (max !== min) {
                // prevent divide by zero errors
                tint = (40 / (this.props.formattedData.max - this.props.formattedData.min)) *
                    (this.props.formattedData.max - node.value);
            }

            // determine if the cell is currently selected
            let active = false;
            if (node.index === this.props.activeCell) {
                active = true;
            }

            const color = tinycolor(baseColor).lighten(tint).toString();

            return (<TreemapCell
                key={`${node.description}-${node.index}`}
                width={node.dx}
                height={node.dy}
                x={node.x}
                y={node.y}
                cellColor={color}
                colors={this.props.colors}
                cellId={node.index}
                active={active}
                title={node.title}
                count={node.value}
                field={node.field}
                detail={node.detail}
                description={node.description}
                clickedItem={this.props.clickedItem} />);
        });
    }

    render() {
        return (
            <div className="usa-da-treemap">
                {this.state.chart}
            </div>
        );
    }
}

Treemap.propTypes = propTypes;
Treemap.defaultProps = defaultProps;
