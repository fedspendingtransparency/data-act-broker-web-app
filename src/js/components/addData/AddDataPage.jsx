/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import AddDataHeader from './AddDataHeader.jsx';
import AddDataMeta from './AddDataMeta.jsx';
import AddDataContent from './AddDataContent.jsx';

export default class AddDataPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agency: "",
            start: "",
            end: ""
        };
    }

    updateMetaData(newState){
        this.setState({
            agency: newState.agency,
            start: newState.startDate,
            end: newState.endDate
        });
    }

    render() {
        let bodyComponent = null;

        if (this.state.agency == ""){
            bodyComponent = <AddDataMeta updateMetaData={this.updateMetaData.bind(this)}/>;
        } else {
            bodyComponent = <AddDataContent metaData={this.state} />;
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
