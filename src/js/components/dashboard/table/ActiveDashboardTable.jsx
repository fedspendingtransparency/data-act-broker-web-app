/**
 * ActiveDashboardTable.jsx
 * Created by Alisa Burdeyny 04/01/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import DashboardTableHeader from 'components/dashboard/table/DashboardTableHeader';
import NoResultsMessage from 'components/SharedComponents/NoResultsMessage';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import DashboardTableLabelButton from 'components/dashboard/table/DashboardTableLabelButton';

const propTypes = {
    results: PropTypes.array,
    inFlight: PropTypes.bool,
    hasError: PropTypes.bool,
    changeSort: PropTypes.func.isRequired,
    currSort: PropTypes.string,
    currOrder: PropTypes.string,
    openModal: PropTypes.func.isRequired,
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const defaultProps = {
    results: [],
    inFlight: false,
    hasError: false,
    currSort: 'period',
    currOrder: 'desc'
};

export default class ActiveDashboardTable extends React.Component {
    tableHeaders = () => [
        {
            text: 'Significance',
            class: 'dashboard-table__significance-column',
            sortType: 'significance'
        },
        {
            text: `${startCase(this.props.errorLevel)} Rule`,
            class: 'dashboard-table__label-column',
            sortType: 'rule_label'
        },
        {
            text: (<span>Number of<br />Instances</span>),
            class: 'dashboard-table__instances-column',
            sortType: 'instances'
        },
        {
            text: 'Category',
            class: 'dashboard-table__category-column',
            sortType: 'category'
        },
        {
            text: 'Impact',
            class: 'dashboard-table__impact-column',
            sortType: 'impact'
        },
        {
            text: 'Rule Description',
            class: null,
            sortType: 'description'
        }
    ];
    render() {
        let contentMessage = <LoadingMessage />;
        let tableRows = [];
        if (!this.props.inFlight) {
            if (this.props.hasError) {
                contentMessage = <ErrorMessageOverlay />;
            }
            else if (this.props.results.length === 0) {
                contentMessage = <NoResultsMessage />;
            }
            else {
                contentMessage = null;
                tableRows = this.props.results.map((row) => (
                    <tr key={`dashboard-table-row-${row.submissionId}-${row.ruleLabel}`}>
                        <td>
                            {row.significance}.
                        </td>
                        <td>
                            <DashboardTableLabelButton
                                label={row.ruleLabel}
                                row={row}
                                openModal={this.props.openModal} />
                        </td>
                        <td>
                            {row.instanceCount}
                        </td>
                        <td className="capitalized">
                            {row.category}
                        </td>
                        <td className="capitalized">
                            {row.impact}
                        </td>
                        <td>
                            <div className="ellipse-box">
                                {row.ruleDescription}
                            </div>
                        </td>
                    </tr>
                ));
            }
        }
        return (
            <div className="dashboard-table">
                <h3 className="dashboard-viz__heading">Table</h3>
                <table>
                    <DashboardTableHeader
                        headers={this.tableHeaders()}
                        changeSort={this.props.changeSort}
                        currSort={this.props.currSort}
                        currOrder={this.props.currOrder} />
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
                {contentMessage}
            </div>
        );
    }
}

ActiveDashboardTable.defaultProps = defaultProps;
ActiveDashboardTable.propTypes = propTypes;
