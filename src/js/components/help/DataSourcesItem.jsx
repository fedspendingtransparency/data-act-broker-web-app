/**
 * DataSourcesItem.jsx
 * Created by Alisa Burdeyny 10/07/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    title: PropTypes.string,
    uses: PropTypes.string,
    description: PropTypes.string,
    source: PropTypes.object,
    updatedAt: PropTypes.string
};

const defaultProps = {
    title: '',
    uses: '',
    description: '',
    source: null,
    updatedAt: ''
};

export default class DataSourcesItem extends React.Component {
    render() {
        return (
            <div className="data-sources-item">
                <h3>{this.props.title}</h3>
                <h4>Used In</h4>
                <p>{this.props.uses}</p>
                <h4>Description</h4>
                <p>{this.props.description}</p>
                <h4>Data Source</h4>
                {this.props.source}
                <p className="updated-at">{this.props.updatedAt}</p>
            </div>
        );
    }
}

DataSourcesItem.propTypes = propTypes;
DataSourcesItem.defaultProps = defaultProps;
