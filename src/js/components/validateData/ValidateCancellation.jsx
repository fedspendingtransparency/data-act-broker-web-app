/**
  * ValidateCancellation.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';

import { Link } from 'react-router-dom';

export default class ValidateCancellation extends React.Component {
    render() {
        return (
            <div
                className="alert alert-danger text-center"
                role="alert">
                Your submission has been stuck in validation for a while. Would you like to cancel and try again?
                &nbsp;&nbsp;&nbsp;
                <Link
                    to="/addData"
                    className="usa-da-button btn-danger">
                    Cancel Submission
                </Link>
            </div>
        );
    }
}
