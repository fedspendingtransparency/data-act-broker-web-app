/**
 * ReviewDataCommentsDropdown.jsx
 * Created by Alisa Burdeyny 11/21/16
 **/

import React from 'react';

export default class ReviewDataCommentsDropdown extends React.Component {
    changeFile(e) {
    	e.preventDefault();
    	this.props.changeFile(e.target.value);
    }

    render() {
        var fileList = ["A", "B", "C", "D1", "D2", "E", "F"];
        var dropdownOptions = [];
        for(var i = 0; i < fileList.length; i++) {
            dropdownOptions.push(<option key={i} value={fileList[i]}>File {fileList[i]}</option>);
        }
        return (
            <div className="col-md-2">
                <select onChange={this.changeFile.bind(this)}>
                    {dropdownOptions}
                </select>
            </div>
        );
    }
}