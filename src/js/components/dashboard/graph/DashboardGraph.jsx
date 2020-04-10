/**
 * DashboardGraph.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, startCase } from 'lodash';
import { formatNumberWithPrecision } from 'helpers/moneyFormatter';
import { significanceColors } from 'dataMapping/dashboard/fileLabels';
import NoResultsMessage from 'components/SharedComponents/NoResultsMessage';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import BarChartStacked from './BarChartStacked';
import DashboardGraphTooltip from './DashboardGraphTooltip';
import SignificanceGraph from './SignificanceGraph';
import CategoryButton from './CategoryButton';

const propTypes = {
    xSeries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ySeries: PropTypes.arrayOf(PropTypes.object),
    allY: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.oneOf(['historical', 'active']),
    description: PropTypes.string,
    errorLevel: PropTypes.oneOf(['error', 'warning']).isRequired
};

const graphHeight = 540;
const spaceBetweenStacks = 2;

export default class DashboardGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            showTooltip: false,
            tooltipData: null,
            tooltipX: 0,
            tooltipY: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth && this.graphDiv) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.graphDiv.offsetWidth
            });
        }
    }

    showTooltip(data) {
        this.setState({
            showTooltip: true,
            tooltipData: data
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    toggleTooltip(data) {
        if (this.state.showTooltip) {
            this.hideTooltip();
        }
        else {
            this.showTooltip(data);
        }
    }

    generateCategoryButtons() {
        if (this.props.type === 'historical') {
            return null;
        }
        const categories = Object.keys(significanceColors);
        const buttons = categories.map((category) => (
            <CategoryButton
                key={category}
                disabled
                label={category}
                color={significanceColors[category]} />
        ));
        return (
            <div className="category-buttons">
                {buttons}
            </div>
        );
    }

    render() {
        let tooltip = null;
        if (this.state.showTooltip) {
            tooltip = this.props.type === 'historical' ? (
                <DashboardGraphTooltip
                    description={this.state.tooltipData.description}
                    position={this.state.tooltipData.position}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Time Period</th>
                                <td>{this.state.tooltipData.xValue}</td>
                            </tr>
                            <tr>
                                <th># of Rule Instances</th>
                                <td>{formatNumberWithPrecision(this.state.tooltipData.value, 0)}</td>
                            </tr>
                            <tr>
                                <th>Total # of Warnings</th>
                                <td>{formatNumberWithPrecision(this.state.tooltipData.totalWarnings, 0)}</td>
                            </tr>
                            <tr>
                                <th>% of all Warnings</th>
                                <td>{this.state.tooltipData.percent}%</td>
                            </tr>
                        </tbody>
                    </table>
                </DashboardGraphTooltip>
            ) :
                (
                    <DashboardGraphTooltip
                        description={this.state.tooltipData.label}
                        position={this.state.tooltipData.position}>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Impact</th>
                                    <td>{startCase(this.state.tooltipData.impact)}</td>
                                </tr>
                                <tr>
                                    <th>Category</th>
                                    <td>{startCase(this.state.tooltipData.category)}</td>
                                </tr>
                                <tr>
                                    <th>{`Total # of ${startCase(this.props.errorLevel)}s`}</th>
                                    <td>{formatNumberWithPrecision(this.state.tooltipData.totalInstances, 0)}</td>
                                </tr>
                                <tr>
                                    <th># of Rule Instances</th>
                                    <td>{formatNumberWithPrecision(this.state.tooltipData.yValue, 0)}</td>
                                </tr>
                                <tr>
                                    <th>{`% of all ${startCase(this.props.errorLevel)}s`}</th>
                                    <td>{this.state.tooltipData.percent}%</td>
                                </tr>
                            </tbody>
                        </table>
                    </DashboardGraphTooltip>
                );
        }
        const empty = (this.props.ySeries.length === 0);

        let graphContent = <LoadingMessage />;
        if (!this.props.loading) {
            if (this.props.error) {
                graphContent = <ErrorMessageOverlay />;
            }
            else if (empty) {
                graphContent = <NoResultsMessage />;
            }
            else {
                graphContent = this.props.type === 'historical' ? (
                    <BarChartStacked
                        {...this.props}
                        width={this.state.visualizationWidth}
                        height={graphHeight}
                        spaceBetweenStacks={spaceBetweenStacks}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip}
                        toggleTooltip={this.toggleTooltip} />
                ) : (
                    <SignificanceGraph
                        {...this.props}
                        width={this.state.visualizationWidth}
                        height={graphHeight}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip}
                        toggleTooltip={this.toggleTooltip} />
                );
            }
        }
        const graphTitle = this.props.type === 'historical' ? (
            <h3 className="dashboard-viz__heading">Warnings Information</h3>
        ) : (
            <h4 className="dashboard-viz__heading">Significance</h4>
        );

        return (
            <div className={`dashboard-viz dashboard-graph-section dashboard-graph-section_${this.props.type}`}>
                {graphTitle}
                <p>{this.props.description}</p>
                {this.generateCategoryButtons()}
                <div
                    className="dashboard-graph"
                    ref={(div) => {
                        this.graphDiv = div;
                    }}>
                    {tooltip}
                    {graphContent}
                </div>
            </div>
        );
    }
}

DashboardGraph.propTypes = propTypes;
