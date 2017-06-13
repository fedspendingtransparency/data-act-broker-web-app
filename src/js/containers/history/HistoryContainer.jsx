/**
* HistoryContainer.jsx
* Created by Minahm Kim 6/7/17
**/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HistoryPage from '../../components/history/HistoryPage.jsx';


class HistoryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       return(
        	<HistoryPage submissionID={this.props.params.submissionID}></HistoryPage>
        )
    }
}

export default connect(
    state => ({ session: state.session })
)(HistoryContainer)
