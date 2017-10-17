/**
  * ValidateNotYours.jsx
  * Created by Kevin Li 4/25/2016
  */

import React from 'react';

export default class ValidateNotYours extends React.Component {
    render() {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {this.props.message}
            </div>
        );
    }
}
