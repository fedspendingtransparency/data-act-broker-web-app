/**
 * HelpNav.jsx
 * Created by Emily Gullo 9/27/16
 */

import React, { PropTypes } from 'react';

const propTypes = {
    pageArray: PropTypes.array,
    selected: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    pageArray: ['Help', 'Resources', 'Validations']
};

export default class HelpNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pageLinks = this.props.pageArray.map((page, index) => {
            const dabsUrl = "/#/" + page.toLowerCase();
            const fabsUrl = "/#/FABS" + page.charAt(0).toUpperCase() + page.slice(1);
            const url = this.props.type === 'fabs' ? fabsUrl : dabsUrl;

            if (this.props.selected === page) {
                return <a href={url} className="selected usa-da-button btn-lg" key={index}>{page}</a>;
            }
            return <a href={url} className="usa-da-button btn-lg" key={index}>{page}</a>;
        });

        return (
            <div className="help-nav">
                {pageLinks}
            </div>
        );
    }
}

HelpNav.propTypes = propTypes;
HelpNav.defaultProps = defaultProps;
