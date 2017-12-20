/**
 * HistoryContent.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { generateProtectedUrls, rssFileKey } from '../../helpers/util';

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
    constructor(props) {
        super(props);

        this.rssPromise = null;
        this.urlPromise = null;

        this.state = {
            rssUrl: '',
            validationRulesUrl: '#',
            domainValuesUrl: '#'
        };
    }

    componentDidMount() {
        // also load the remaining URLs
        this.urlPromise = generateProtectedUrls();
        this.urlPromise.promise
            .then((urls) => {
                this.setState({
                    rssUrl: urls[rssFileKey()],
                    validationRulesUrl: urls['Validation_Rules.xlsx'],
                    domainValuesUrl: urls['Domain_Values.xlsx']
                });
                this.urlPromise = null;
            });
    }

    componentDidUpdate() {
        this.scrollToSection();
    }

    componentWillUnmount() {
        // cancel in-flight S3 signing requests when the component unmounts
        if (this.urlPromise) {
            this.urlPromise.cancel();
        }
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
