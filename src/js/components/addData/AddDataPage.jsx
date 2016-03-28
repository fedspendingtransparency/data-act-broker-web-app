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

        // this.state = {
        //     agency: "",
        //     startDate: "",
        //     endDate: ""
        // };

        this.state = {
            agency: "Broadcasting Board of Governors",
            startDate: Moment("2016-01-01", "YYYY-MM-DD"),
            endDate: Moment("2016-03-15", "YYYY-MM-DD")
        }
    }

    componentDidMount() {
        console.error("REMOVE PREPOPULATED STATE BEFORE PUSHING");
    }

    updateMetaData(newState){
        this.setState({
            agency: newState.agency,
            startDate: newState.startDate,
            endDate: newState.endDate
        });
    }

    render() {
        let bodyComponent = null;

        if (this.state.agency == ""){
            bodyComponent = <AddDataMeta updateMetaData={this.updateMetaData.bind(this)}/>;
        } else {
            bodyComponent = <AddDataContainer metaData={this.state} />;
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
