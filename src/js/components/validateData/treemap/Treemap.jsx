/**
  * Treemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import d3 from 'd3';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

import TreemapCell from './TreemapCell.jsx';

const defaultProps = {
	width: 0,
	height: 300,
	formattedData: {
		data: [],
		max: 0,
		min: 0
	}
}


export default class Treemap extends React.Component {


	drawChart() {
		const layout = d3.layout.treemap()
			.children((d) => d)
			.size([this.props.width, this.props.height])
			.sort((a, b) => {
				return a.value - b.value;
			})
			.sticky(true);

		const treemap = layout(this.props.formattedData.data);

		const baseColor = '#5d87bb';
		return treemap.map((node, index) => {
			const tint = (40 / (this.props.formattedData.max - this.props.formattedData.min)) * (this.props.formattedData.max - node.value);
			const color = tinycolor(baseColor).lighten(tint).toString();

			return <TreemapCell key={index} width={node.dx} height={node.dy} x={node.x} y={node.y} color={color} rule={node.rule} count={node.value} field={node.field} detail={node.detail} description={node.description} clickedItem={this.props.clickedItem} />
		});

	}

	render() {
		return (
			<div className="usa-da-treemap">
				{this.drawChart()}
			</div>
		);
	}
}

Treemap.defaultProps = defaultProps;