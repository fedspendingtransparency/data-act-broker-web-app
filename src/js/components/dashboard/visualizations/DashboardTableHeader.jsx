/**
 * DashboardTableHeader.jsx
 * Created by Alisa Burdeyny 11/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    headers: PropTypes.array
};

const defaultProps = {
    headers: []
};

export default class DashboardTableHeader extends React.Component {
    constructor(props) {
        super(props);

        this.test = this.test.bind(this);
        this.test2 = this.test2.bind(this);
    }
    test() {
        console.log('this');
    }
    test2(){
        console.log('that');
    }
    render() {
        const tableHeaders = this.props.headers.map((header, index) => (
            <th key={'dashboard-table-header-' + index} className={header.class}>
                <div className="dashboard-table__header-wrapper">
                    <div>
                        {header.text}
                    </div>
                    <div className="dashboard-table__sort-icons">
                        <div onClick={this.test}>
                            <FontAwesomeIcon size="2x" icon="caret-up" />
                        </div>
                        <div onClick={this.test2}>
                            <FontAwesomeIcon size="2x" icon="caret-down" />
                        </div>
                    </div>
                </div>
            </th>)
        );

        return (
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
        );
    }
}

DashboardTableHeader.propTypes = propTypes;
DashboardTableHeader.defaultProps = defaultProps;
