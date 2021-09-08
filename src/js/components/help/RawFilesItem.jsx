/**
 * RawFilesItem.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    item: PropTypes.object,
    currentLevel: PropTypes.string,
    itemAction: PropTypes.func
};

const defaultProps = {
    item: {id: null, label: ''},
    currentLevel: '',
    itemAction: null
};

export default class RawFilesItem extends React.Component {
    constructor(props) {
        super(props);

        this.itemAction = this.itemAction.bind(this);
    }

    itemAction() {
        this.props.itemAction(this.props.currentLevel, this.props.item.id, this.props.item.label);
    }

    render() {
        let filePrefix = '';
        if (this.props.currentLevel === 'download') {
            if (this.props.item.filetype === 'FABS') {
                filePrefix = `Submission ${this.props.item.submission_id}: `;
            }
            else {
                filePrefix = `File ${this.props.item.filetype}: `;
            }
        }
        return (
            <div className="raw-files-item">
                {filePrefix}
                <button onClick={this.itemAction} className="raw-files-button">
                    {this.props.item.label}
                </button>
            </div>
        );
    }
}

RawFilesItem.propTypes = propTypes;
RawFilesItem.defaultProps = defaultProps;
