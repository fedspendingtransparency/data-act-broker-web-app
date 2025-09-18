/**
 * ActiveDashboard.jsx
 * Created by Lizzie Salita 3/10/20
 */

import PropTypes from 'prop-types';
import { useState } from 'react';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { errorLevels } from 'dataMapping/dashboard/fileLabels';
import ActiveDashboardOverviewContainer from 'containers/dashboard/ActiveDashboardOverviewContainer';
import ActiveDashboardImpactsContainer from 'containers/dashboard/ActiveDashboardImpactsContainer';
import SignificanceGraphContainer from 'containers/dashboard/graph/SignificanceGraphContainer';
import ActiveDashboardTableContainer from 'containers/dashboard/table/ActiveDashboardTableContainer';
import TabItem from 'components/SharedComponents/TabItem';

const propTypes = {
    submissionID: PropTypes.string,
    numResults: PropTypes.number,
    backToList: PropTypes.func
};

const ActiveDashboard = (props) => {
    const [errorLevel, setErrorLevel] = useState('error');
    return (
        <div className="dashboard-page-active">
            <div className="tabs">
                <div className="tabs__content">
                    {errorLevels.map((level) => (
                        <TabItem
                            key={level}
                            id={level}
                            label={`${startCase(level)}s`}
                            onClick={setErrorLevel}
                            active={errorLevel === level} />
                    ))}
                </div>
            </div>
            <div className="dashboard-page__content">
                {props.numResults > 1 ?
                    <button
                        onClick={props.backToList}
                        className="back-button">
                        <div className="button-wrapper">
                            <div className="button-icon">
                                <FontAwesomeIcon icon="angle-left" />
                            </div>
                            <div className="button-content">
                                Dashboard Submission Selection
                            </div>
                        </div>
                    </button> : null}
                <ActiveDashboardOverviewContainer errorLevel={errorLevel} submissionID={props.submissionID} />
            </div>
            <div className="dashboard-page__content dashboard-page__content_below">
                <h2>Active Submission Summary</h2>
                <hr />
                <ActiveDashboardImpactsContainer errorLevel={errorLevel} submissionID={props.submissionID} />
                <SignificanceGraphContainer errorLevel={errorLevel} submissionID={props.submissionID} />
                <ActiveDashboardTableContainer errorLevel={errorLevel} submissionID={props.submissionID} />
            </div>
        </div>
    );
};


ActiveDashboard.propTypes = propTypes;
export default ActiveDashboard;
