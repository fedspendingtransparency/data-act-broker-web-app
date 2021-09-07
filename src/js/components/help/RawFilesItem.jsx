/**
 * RawFilesItem.jsx
 * Created by Alisa Burdeyny 9/03/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    currentLevel: PropTypes.string,
    itemAction: PropTypes.func
};

const defaultProps = {
    id: null,
    label: '',
    currentLevel: '',
    itemAction: null
};

export default class RawFilesItem extends React.Component {
    constructor(props) {
        super(props);

        this.itemAction = this.itemAction.bind(this);
    }

    itemAction() {
        this.props.itemAction(this.props.currentLevel, this.props.id, this.props.label);
    }

    render() {
        return (
            <div className="raw-files-item">
                <button onClick={this.itemAction} className="raw-files-button">
                    {this.props.label}
                </button>
            </div>
        );
    }
}

RawFilesItem.propTypes = propTypes;
RawFilesItem.defaultProps = defaultProps;
