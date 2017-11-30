/**
 * ReviewDataNarrativeDropdown.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React, { PropTypes } from 'react';

const propTypes = {
    changeFile: PropTypes.func
};

const defaultProps = {
    changeFile: null
};

export default class ReviewDataNarrativeDropdown extends React.Component {
    changeFile(e) {
        e.preventDefault();
        this.props.changeFile(e.target.value);
    }

    render() {
        const fileList = ["A", "B", "C", "D1", "D2", "E", "F"];
        const dropdownOptions = [];
        for (let i = 0; i < fileList.length; i++) {
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

ReviewDataNarrativeDropdown.propTypes = propTypes;
ReviewDataNarrativeDropdown.defaultProps = defaultProps;
