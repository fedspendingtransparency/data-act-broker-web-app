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
import Banner from '..//SharedComponents/Banner.jsx';


export default class AddDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            window: null
        }
    }

    componentDidMount() {
        this.isWindow();
    }

    isWindow() {
        ReviewHelper.isWindow()
            .then((res) => {
                this.setState({window: res.data})
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

        let windowWarning = null;
        if(this.state.window){
            windowWarning = <Banner data={this.state.window}/>
        }

        return (
            <div className="usa-da-add-data-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                    <AddDataHeader />
                    {windowWarning}
                    {bodyComponent}
                </div>
                <Footer />
            </div>
        );
    }
}
