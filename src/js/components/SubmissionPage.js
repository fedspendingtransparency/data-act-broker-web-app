/**
* SubmissionPage.js
* Created by Katie Rose 12/7/15
**/

var React = require('react');
var NavigationComponents  = require('./NavigationComponents.js');
var SubmissionComponents  = require('./SubmissionComponents.js');

class SubmissionContent extends React.Component {
    render() {
        return (
            <div className="usa-da-content">
                <h1>Please select a file.</h1>
                <div>
                    <SubmissionComponents.Submission/>
                </div>
            </div>
        );
    }
}

class SubmissionPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationComponents.Navbar />
                <SubmissionContent />
            </div>
        );
    }
}

module.exports.SubmissionPage = SubmissionPage;
