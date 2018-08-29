/**
 * AgencyFilter.jsx
 * Created by Lizzie Salita 8/24/18
 */

import React, { PropTypes } from 'react';

import AgencyListContainer from '../../../containers/SharedContainers/AgencyListContainer';

const propTypes = {
    updateFilterList: PropTypes.func
};

const defaultProps = {
    updateFilterList: null
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
AgencyFilter.defaultProps = defaultProps;
