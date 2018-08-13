/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 8/10/18
 */

import React, { PropTypes } from 'react';

import AgencyListContainer from '../../../containers/SharedContainers/AgencyListContainer';

const propTypes = {
    currentAgencies: PropTypes.array,
    updateFilter: PropTypes.func,
};

export default class AgencyFilter extends React.Component {
    constructor (props) {
        super(props);

        this.handleAgencySelect = this.handleAgencySelect.bind(this);
    }

    handleAgencySelect(code, codeType, isValid) {
        if (code !== '' && isValid) {
            this.props.updateFilter(
                'agencies',
                {
                    code,
                    codeType
                }
            );
        }
    }

    render() {
        return (
            <div className="dashboard-filters__filter dashboard-filters__filter_agency">
                <div className="typeahead-holder">
                    <AgencyListContainer
                        placeholder="Agency Name"
                        onSelect={this.handleAgencySelect} />
                </div>
            </div>
        );
    }
}

AgencyFilter.propTypes = propTypes;
