/**
 * HelpNav.jsx
 * Created by Emily Gullo 9/27/16
 */

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

const propTypes = {
    session: PropTypes.object,
    pageArray: PropTypes.array,
    selected: PropTypes.string,
    type: PropTypes.string
};

const defaultProps = {
    session: { user: { affiliations: [{ agency_name: '' }] } },
    pageArray: ['Help', 'Resources', 'Raw Files', 'Data Sources'],
    selected: '',
    type: ''
};

export default class HelpNav extends React.Component {
    render() {
        const affiliations = [...new Set(this.props.session.user.affiliations.map((aff) => aff.agency_name))];

        let pageArrayFiltered = this.props.pageArray;
        if (affiliations.length === 1 && affiliations[0] === 'Non-published FABS Vendor Agency (TFVA)') {
            pageArrayFiltered = pageArrayFiltered.filter((page) => page !== 'Raw Files');
        }

        const pageLinks = pageArrayFiltered.map((page) => {
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
