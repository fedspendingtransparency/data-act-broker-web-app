/**
 * HelpNav.jsx
 * Created by Emily Gullo 9/27/16
 **/

import React from 'react';

const defaultProps = {
	pageArray: ['Help','Resources','Validations']
};

export default class HelpNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pageLinks = this.props.pageArray.map((page, index) => {
		    const url = "/#/" + page.toLowerCase();

		    if(this.props.selected == page){
		        return <a href={url} className="selected usa-da-button btn-lg" key={index}>{page}</a>;
		    } else {
		        return <a href={url} className="usa-da-button btn-lg" key={index}>{page}</a>;
		    }
        });
		
        return (
		    <div className="help-nav">
		        {pageLinks}
		    </div>
		);
    }
}

HelpNav.defaultProps = defaultProps;
