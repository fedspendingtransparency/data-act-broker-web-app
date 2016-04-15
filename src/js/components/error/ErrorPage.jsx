import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';

export default class ErrorPage extends React.Component {
	render() {
		return (
			<div className="site_wrap">
                <Navbar />
                
                <div className="site_content pending-page">
	                <div className="usa-da-content-dark">
	                    <div className="container">
	                        <div className="row usa-da-content-add-data usa-da-page-title">
	                            <div className="col-md-7 mt-50 mb-50">
	                                <div className="display-2">Page Not Found</div>
	                                <p>No page exists at this address.</p>
	                                <p><a href="#/">Click here</a> to return home.</p>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
            </div>
		);
	}
}