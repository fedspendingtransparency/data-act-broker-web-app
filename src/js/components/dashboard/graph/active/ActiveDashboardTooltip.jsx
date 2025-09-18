/*
 * ActiveDashboardTooltip.jsx
 * Created by Lizzie Salita 4/10/20
*/

import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    yValue: PropTypes.number,
    totalInstances: PropTypes.number,
    category: PropTypes.string,
    impact: PropTypes.string,
    percent: PropTypes.number,
    errorLevel: PropTypes.oneOf(['error', 'warning'])
};

const ActiveDashboardTooltip = (props) => (
    <table>
        <tbody>
            <tr>
                <th>Impact</th>
                <td>{startCase(props.impact)}</td>
            </tr>
            <tr>
                <th>Category</th>
                <td>{startCase(props.category)}</td>
            </tr>
            <tr>
                <th>{`Total # of ${startCase(props.errorLevel)}s`}</th>
                <td>{formatNumberWithPrecision(props.totalInstances, 0)}</td>
            </tr>
            <tr>
                <th># of Rule Instances</th>
                <td>{formatNumberWithPrecision(props.yValue, 0)}</td>
            </tr>
            <tr>
                <th>{`% of all ${startCase(props.errorLevel)}s`}</th>
                <td>{props.percent}%</td>
            </tr>
        </tbody>
    </table>
);

ActiveDashboardTooltip.propTypes = propTypes;
export default ActiveDashboardTooltip;
