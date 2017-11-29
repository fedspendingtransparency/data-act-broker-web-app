/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
*/

import React, { PropTypes } from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent';
import AddDataHeader from './AddDataHeader';
import AddDataMeta from './AddDataMeta';
import AddDataContainer from '../../containers/addData/AddDataContainer';
import Footer from '../SharedComponents/FooterComponent';

import Banner from '../SharedComponents/Banner';

const propTypes = {
    updateMetaData: PropTypes.func,
    route: PropTypes.object,
    submission: PropTypes.object
};

export default class AddDataPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let bodyComponent = null;

        if (this.props.submission.meta.agency === "") {
            bodyComponent = <AddDataMeta updateMetaData={this.props.updateMetaData} />;
        }
        else {
            bodyComponent = <AddDataContainer metaData={this.props.submission.meta} />;
        }

        return (
            <div className="usa-da-add-data-page">
                <div className="usa-da-site_wrap">
                    <Navbar activeTab="submissionGuide" type={this.props.route.type} />
                    <AddDataHeader />
                    <Banner type="dabs" />
                    {bodyComponent}
                </div>
                <Footer />
            </div>
        );
    }
}

AddDataPage.propTypes = propTypes;
