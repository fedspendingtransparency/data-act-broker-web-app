/**
 * HelpNav.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
    pageArray: PropTypes.array,
    selected: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    pageArray: ['Help', 'Resources', 'Raw Files', 'Data Sources'],
    selected: '',
    type: ''
};

export default class HelpNav extends React.Component {
    render() {
        const pageLinks = this.props.pageArray.map((page) => {
            const dabsUrl = `/${page.toLowerCase().replace(' ', '')}`;
            const fabsUrl = `/FABS${page.charAt(0).toUpperCase()}${page.slice(1).toLowerCase().replace(' ', '')}`;
            const url = this.props.type === 'fabs' ? fabsUrl : dabsUrl;

            if (this.props.selected === page) {
                return <Link to={url} className="selected usa-da-button btn-lg" key={page}>{page}</Link>;
            }
            return <Link to={url} className="usa-da-button btn-lg" key={page}>{page}</Link>;
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
