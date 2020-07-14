/**
 * ReviewDataNarrativeDropdown.jsx
 * Created by Alisa Burdeyny 11/21/16
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    changeFile: PropTypes.func,
    currentFile: PropTypes.string
};

const defaultProps = {
    changeFile: null,
    currentFile: 'A'
};

export default class ReviewDataNarrativeDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.changeFile = this.changeFile.bind(this);
    }

    changeFile(e) {
        e.preventDefault();
        this.props.changeFile(e.target.value);
    }

    render() {
        const fileList = ['A', 'B', 'C', 'D1', 'D2', 'E', 'F'];
        const dropdownOptions = [];
        for (let i = 0; i < fileList.length; i++) {
            dropdownOptions.push(<option key={i} value={fileList[i]}>File {fileList[i]}</option>);
        }
        return (
            <div className="file-dropdown">
                <select
                    onChange={this.changeFile}
                    value={this.props.currentFile}>
                    {dropdownOptions}
                </select>
            </div>
        );
    }
}

ReviewDataNarrativeDropdown.propTypes = propTypes;
ReviewDataNarrativeDropdown.defaultProps = defaultProps;
