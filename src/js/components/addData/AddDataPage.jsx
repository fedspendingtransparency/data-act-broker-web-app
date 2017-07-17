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

import * as ReviewHelper from '../../helpers/reviewHelper.js';
import GTASBanner from '..//SharedComponents/GTASWarningBanner.jsx';


export default class AddDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gtas: null
        }
    }

    componentDidMount() {
        this.isGtas();
    }

    isGtas() {
        ReviewHelper.isGtasWindow()
            .then((res) => {
                this.setState({gtas: res.data})
            })
            .catch((err) =>{
                console.log(err)
            })
    }

    render() {
        let bodyComponent = null;

        if (this.props.submission.meta.agency == ""){
            bodyComponent = <AddDataMeta updateMetaData={this.props.updateMetaData}/>;
        } else {
            bodyComponent = <AddDataContainer metaData={this.props.submission.meta} />;
        }

        let gtasWarning = null;
        if(this.state.gtas){
            gtasWarning = <GTASBanner data={this.state.gtas}/>
        }

        return (
            <div className="usa-da-add-data-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide"/>
                    <AddDataHeader />
                    {gtasWarning}
                    {bodyComponent}
                </div>
                <Footer />
            </div>
        );
    }
}
