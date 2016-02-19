/**
* AddDataPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from '../SharedComponents/NavigationComponent.jsx';
import SubmissionPageHeader from 'SubmissionPageHeader.jsx';
import SubmissionContent from 'SubmissionContent.jsx';

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar activeTab="addData"/>
                <SubmissionPageHeader />
                <SubmissionContent />
            </div>
        );
    }
}
