/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './AddDataHeader.jsx';
import AddDataMeta from './AddDataMeta.jsx';
import AddDataContainer from '../../containers/addData/AddDataContainer.jsx';
import AddDataContent from './AddDataContent.jsx';

import Moment from 'moment';

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
            <div>
                <Navbar activeTab="addData"/>
                <AddDataHeader />
                {bodyComponent}
            </div>
        );
    }
}
