/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 8/24/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import AgencyFilterContainer from '../../../containers/dashboard/AgencyFilterContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string
};

const defaultProps = {
    updateFilterList: null,
    type: '',
    table: ''
};

export default class AgencyFilter extends React.Component {
    constructor(props) {
        super(props);

        this.handleAgencySelect = this.handleAgencySelect.bind(this);
    }

    handleAgencySelect(code, codeType, isValid, name) {
        if (code && name && isValid) {
            this.props.updateFilterList(
                'agencies',
                {
                    code,
                    name
                },
            );
        }
    }

    render() {
        return (
            <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
                <div className="typeahead-holder">
                    <AgencyFilterContainer
                        type={this.props.type}
                        table={this.props.table}
                        placeholder="Agency Name"
                        onSelect={this.handleAgencySelect} />
                </div>
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;
AgencyFilter.defaultProps = defaultProps;
