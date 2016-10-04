/**
 * HelpNav.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';


export default class HelpNav extends React.Component {
    constructor(props) {
        super(props);
    }



	render() {
		const pageArray = [{name:'Help',link:'/#/help'},
						   {name:'Resources',link:'/#/resources'},
						   {name:'Validations',link:'/#/validations'}].map((page) => {

								if(this.props.selected == page.name){
									 return <a href={page.link} className="selected usa-da-button btn-lg">{page.name}</a>;
								} else {
								 	 return <a href={page.link} className="usa-da-button btn-lg">{page.name}</a>;
								}
					      });
	    return (
	      <div className="help-nav">
	                  {pageArray}
	      </div>
	    );
	}
}