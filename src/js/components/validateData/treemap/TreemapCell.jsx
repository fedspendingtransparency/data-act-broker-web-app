/**
  * TreemapCell.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import d3 from 'd3';
import tinycolor from 'tinycolor2';

export default class TreemapCell extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hover: false
		};
	}

	mouseOver(e) {
		this.setState({
			hover: true
		});
	}

	mouseOut(e) {
		this.setState({
			hover: false
		});
	}

	clickEvent(e) {
		this.props.clickedItem(this.props);
	}

	render() {

		const style = {
			top: this.props.y,
			left: this.props.x,
			height: this.props.height,
			width: this.props.width,
			backgroundColor: this.props.color
		};

		if (this.state.hover) {
			style.backgroundColor = tinycolor(this.props.color).lighten().desaturate().toString();
		}

		return (
			<div className="usa-da-treemap-cell" style={style} onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)} onClick={this.clickEvent.bind(this)}>
				<div className="treemap-rule">{this.props.rule}</div>
			</div>
		);
	}
}