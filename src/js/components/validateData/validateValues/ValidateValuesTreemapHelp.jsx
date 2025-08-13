/**
  * ValidateValuesTreemapHelp.jsx
  * Created by Kevin Li 6/20/16
  */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    count: PropTypes.number,
    description: PropTypes.string,
    detail: PropTypes.string,
    field: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    description: '',
    detail: null,
    count: 0,
    type: 'error',
    field: '',
    name: ''
};

export default class ValidateValuesTreemapHelp extends React.Component {
    render() {
        let detail = ' hide';
        if (this.props.detail) {
            detail = '';
        }
        return (
            <div className="usa-da-treemap-help-wrap">
                <div className="treemap-help-title">
                    {this.props.name}
                </div>
                <div className="treemap-help-description">
                    <b>Field:</b> {this.props.field}<br />
                    <b>{this.props.type}:</b> {this.props.description}<br />
                    <b>Occurrences: </b>{this.props.count}
                </div>
                <div className={`treemap-help-detail${detail}`}>
                    <b>More information:</b><br />
                    {this.props.detail}
                </div>
            </div>
        );
    }
}

ValidateValuesTreemapHelp.propTypes = propTypes;
ValidateValuesTreemapHelp.defaultProps = defaultProps;
