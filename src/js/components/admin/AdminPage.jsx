/**
 * AdminPage.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';
import AdminPageHeader from './AdminPageHeader.jsx';
import AdminPageContent from './AdminPageContent.jsx';

export default class AdminPage extends React.Component {
    render() {
        return (
            <div>
            	<div className="usa-da-page-content">
	                <Navbar activeTab="admin"/>
	                <AdminPageHeader />
	                <AdminPageContent />
	            </div>
	            <Footer />
            </div>
        );
    }
}
