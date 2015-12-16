/**
* SubmissionPage.jsx
* Created by Katie Rose 12/7/15
**/

import React from 'react';
import Navbar from './NavigationComponents.jsx';
import Submission from './SubmissionComponents.jsx';

class SubmissionContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content">
                <h1>Please select a file.</h1>
                <div>
                    <Submission/>
                </div>
            </div>
        );
    }
}

export default class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <SubmissionContent />
            </div>
        );
    }
}
