/**
 * LastDateModifiedFilter.jsx
 * Created by Kwadwo Opoku-Debrah 8/25/18
 */

import React, { PropTypes } from 'react';

import LastDateModifiedContainer from '../../../containers/dashboard/LastDateModifiedContainer';

const propTypes = {
    updateFilterList: PropTypes.func,
    type: PropTypes.string,
    table: PropTypes.string,
    minDateLastModified: PropTypes.string
};

const defaultProps = {
    updateFilterList: null,
    type: '',
    table: '',
    minDateLastModified: ''
};

export default class LastDateModifiedFilter extends React.Component {
    constructor(props) {
        super(props);

        this.lastDateModifiedSelect = this.lastDateModifiedSelect.bind(this);
    }

    lastDateModifiedSelect(lastDateModified) {
        if (lastDateModified) {
            const startDate = lastDateModified.startDate;
            const endDate = lastDateModified.endDate;
            this.props.updateFilterList(
                'lastDateModified',
                {
                    startDate,
                    endDate
                },
            );
        }
    }

    render() {
        return (
            <div className="dashboard-filters__filter dashboard-filters__filter_typeahead">
                <div className="">
                    <LastDateModifiedContainer
                        type={this.props.type}
                        table={this.props.table}
                        placeholder="Last Date Modified"
                        onSelect={this.lastDateModifiedSelect}
                        minDateLastModified={this.props.minDateLastModified} />
                </div>
            </div>
        );
    }
}

LastDateModifiedFilter.propTypes = propTypes;
LastDateModifiedFilter.defaultProps = defaultProps;
