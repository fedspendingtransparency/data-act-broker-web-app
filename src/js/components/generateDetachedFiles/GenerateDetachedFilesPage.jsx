/**
* GenerateDetachedFilesPage.jsx
* Created by Alisa Burdeyny
**/

import React from 'react'
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

export default class GenerateDetachedFilesPage extends React.Component {
    render() {
        return (
            <div className="usa-da-generate-detached-files-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide" />
                    TEST
                </div>
                <Footer />
            </div>
        );
    }
}