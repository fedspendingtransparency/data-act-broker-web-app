/**
  * SkipNavigationLink.jsx
  * Created by Kevin Li 7/13/16
  **/

import React from 'react';


export default class SkipNavigationLink extends React.Component {
	skipNav(e) {
		e.preventDefault();
		
		// find the content item
		let target = document.querySelector('[data-contentstart="start"]');
		if (target) {
			target.focus();
		}
	}
	render() {
		return (
			<a href="#" className="hidden-screen-reader" onClick={this.skipNav.bind(this)}>Skip Navigation</a>
		)
	}
}