/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import $ from 'jquery';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './AddDataHeader.jsx';
import AddDataMeta from './AddDataMeta.jsx';
import AddDataContainer from '../../containers/addData/AddDataContainer.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import Banner from '../SharedComponents/Banner.jsx';


export default class AddDataPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let bodyComponent = null;

        if (this.props.submission.meta.agency == ""){
            bodyComponent = <AddDataMeta updateMetaData={this.props.updateMetaData}/>;
        } else {
            bodyComponent = <AddDataContainer metaData={this.props.submission.meta} />;
        }

        return (
            <div className="usa-da-add-data-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide"/>
                    <AddDataHeader />
                    <Banner type='fabs' />
                    {bodyComponent}
                </div>
                <Footer />
            </div>
        );
    }
}
