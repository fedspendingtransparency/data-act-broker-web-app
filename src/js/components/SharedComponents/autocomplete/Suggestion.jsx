/**
 * Suggestion.jsx
 * Created by Lizzie Salita 11/1/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    data: PropTypes.object,
    selected: PropTypes.bool,
    select: PropTypes.func
};

const defaultProps = {
    title: '',
    subtitle: '',
    data: [],
    selected: false
};

export default class Suggestion extends React.Component {
    componentDidMount() {
        this.setUpSuggestion();
    }

    setUpSuggestion() {
        this.suggestion.addEventListener('mousedown', () => {
            this.props.select(this.props.data);
        });
    }

    render() {
        return (
            <li
                id={this.props.id}
                tabIndex={-1}
                aria-selected={this.props.selected}
                role="option"
                ref={(s) => {
                    this.suggestion = s;
                }}>
                {this.props.title}<br />
                {this.props.subtitle}
            </li>
        );
    }
}

Suggestion.defaultProps = defaultProps;
Suggestion.propTypes = propTypes;
