/**
 * LastModifiedCell.jsx
 * Created by Alisa Burdeyny 10/09/20
 */

import PropTypes from 'prop-types';
import moment from 'moment';
import { TooltipWrapper } from 'data-transparency-ui';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as UtilHelper from 'helpers/util';
import ExpirationTooltip from 'components/SharedComponents/SimpleTooltips';

const propTypes = {
    expirationDate: PropTypes.string,
    lastModified: PropTypes.string
};

const LastModifiedCell = ({expirationDate = '', lastModified = ''}) => {
    const calculateExpiration = () => {
        // if there's no expiration date, we don't show it
        if (expirationDate === null) {
            return null;
        }
        const today = moment().format('YYYY-MM-DD');
        const expiration = moment(expirationDate, 'YYYY-MM-DD');
        const daysLeft = Math.floor(moment.duration(expiration.diff(today)).asDays());

        // if there are less than 0 days left (it expired earlier and the script hasn't been run yet), show 0
        if (daysLeft < 0) {
            return 0;
        }
        // if there are more than 30 days left, don't show it
        else if (daysLeft > 30) {
            return null;
        }
        return daysLeft;
    };

    let expirationText = '';
    const expiresIn = calculateExpiration();
    const dayText = expiresIn === 1 ? ' day' : ' days';
    if (expiresIn !== null) {
        expirationText = (
            <div className="expiration-notice">
                <TooltipWrapper tooltipPosition="left" tooltipComponent={<ExpirationTooltip />} width={220}>
                    <FontAwesomeIcon icon={['far', 'clock']} />
                </TooltipWrapper>
                Expires in {expiresIn} {dayText}
            </div>);
    }

    return (
        <div className="usa-da-last-modified-cell">
            {UtilHelper.convertToLocalDate(lastModified)}
            {expirationText}
        </div>
    );
};

LastModifiedCell.propTypes = propTypes;
export default LastModifiedCell;
