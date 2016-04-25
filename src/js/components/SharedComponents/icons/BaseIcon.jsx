/**
  * BaseIcon.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { PropTypes } from 'react';
import svg4everybody from 'svg4everybody';
import { fetchStaticAssetPath } from '../../../helpers/util.js';


const propTypes = {
	iconClass: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired
};


export default class BaseIcon extends React.Component {
	componentDidMount() {
		// necessary for IE support
		svg4everybody({
			polyfill: true
		});
	}
	render() {
		return (
			<svg className={this.props.iconClass}>
				<use xlinkHref={fetchStaticAssetPath() + "graphics/icons.svg#" + this.props.iconName}></use>
			</svg>
		);
	}
}

BaseIcon.propTypes = propTypes;