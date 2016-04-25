/**
  * BaseIcon.jsx
  * Created by Kevin Li 4/25/2016
  */

import React, { PropTypes } from 'react';
import { fetchStaticAssetPath } from '../../../helpers/util.js';


const propTypes = {
	iconClass: PropTypes.string.isRequired,
	iconName: PropTypes.string.isRequired
};


export default class BaseIcon extends React.Component {
	render() {
		return (
			<svg className={this.props.iconClass}>
				<use xlinkHref={fetchStaticAssetPath() + "graphics/icons.svg#" + this.props.iconName}></use>
			</svg>
		);
	}
}

BaseIcon.propTypes = propTypes;