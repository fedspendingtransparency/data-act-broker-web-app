/**
 * SelectedRules.jsx
 * Created by Lizzie Salita 11/1/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ShownValue from './ShownValue';

const propTypes = {
    selectedRules: PropTypes.object,
    removeRule: PropTypes.func
};

export default class SelectedRules extends React.Component {
    render() {
        const shownRules = [];
        this.props.selectedRules.entrySeq().forEach((entry) => {
            const code = entry[1];
            const value = (<ShownValue
                label={code}
                key={code}
                removeValue={this.props.removeRule.bind(null, { code })} />);
            shownRules.push(value);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownRules}
            </div>
        );
    }
}

SelectedRules.propTypes = propTypes;
