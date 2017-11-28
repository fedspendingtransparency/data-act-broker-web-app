/**
  * LoadingBauble.jsx
  * Created by Kevin Li 8/25/16
  */

import React from 'react';

export default class LoadingBauble extends React.Component {
    render() {
        return (
            <div className="sk-double-bounce">
                <div className="sk-child sk-double-bounce1" />
                <div className="sk-child sk-double-bounce2" />
            </div>
        );
    }
}
