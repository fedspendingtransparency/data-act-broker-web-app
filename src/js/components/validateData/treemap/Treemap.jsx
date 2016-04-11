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
	data: []
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

		const treemap = _.drop(layout(this.props.data), 1);

		const baseColor = '#e31c3d';
		return treemap.map((node, index) => {

			const tint = (50 / treemap.length) * index;
			const color = tinycolor(baseColor).lighten(tint).toString();

			return <TreemapCell key={index} width={node.dx} height={node.dy} x={node.x} y={node.y} label={node.label} color={color} description={node.description} clickedItem={this.props.clickedItem} />
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