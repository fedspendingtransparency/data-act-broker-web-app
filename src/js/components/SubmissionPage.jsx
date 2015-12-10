/**
* LandingComponents.jsx
* Created by Katie Rose 12/7/15
**/

var React = require('react');
var NavigationComponents  = require('./NavigationComponents.jsx');
var SubmissionComponents  = require('./SubmissionComponents.jsx');

var SubmissionContent = React.createClass({
    render: function() {
        return (
            <div className="usa-da-content">
                <h1>Please select a file.</h1>
                <div>
                    <SubmissionComponents.Submission/>
                </div>
            </div>
        );
    }
});

var SubmissionPage = React.createClass({
    render: function() {
        return (
            <div>
            <NavigationComponents.Navbar/>
            <LandingContent/>
            </div>
		);
    }
});


module.exports.SubmissionPage = SubmissionPage;
