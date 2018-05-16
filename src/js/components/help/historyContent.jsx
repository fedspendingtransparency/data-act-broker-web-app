/**
 * HistoryContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';

const propTypes = {
    history: PropTypes.object,
    section: PropTypes.string,
    title: PropTypes.string
};

const defaultProps = {
    history: null,
    section: '',
    title: ''
};

export default class HistoryContent extends React.Component {
    componentDidUpdate() {
        this.scrollToSection();
    }

    scrollToSection() {
        if (this.props.section && $('[name=' + this.props.section + ']').length > 0) {
            $('html, body').animate({
                scrollTop: $('[name=' + this.props.section + ']').offset().top
            }, 500);
        }
    }

    render() {
        return (
            <div className="usa-da-help-content">
                <h2>{this.props.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.history }} />
            </div>
        );
    }
}

HistoryContent.propTypes = propTypes;
HistoryContent.defaultProps = defaultProps;
