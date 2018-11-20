/**
  * ValidateValuesTreemapHelp.jsx
  * Created by Kevin Li 6/20/16
  */

import React, { PropTypes } from 'react';

const propTypes = {
    count: PropTypes.number,
    description: PropTypes.string,
    detail: PropTypes.string,
    field: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    description: '',
    detail: null,
    count: 0,
    type: 'error',
    field: '',
    title: ''
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
                    {this.props.title}
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
