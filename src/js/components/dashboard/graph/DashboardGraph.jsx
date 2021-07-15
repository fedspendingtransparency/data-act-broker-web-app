/**
 * DashboardGraph.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { significanceColors } from 'dataMapping/dashboard/fileLabels';
import NoResultsMessage from 'components/SharedComponents/NoResultsMessage';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import BarChartStacked from './historical/BarChartStacked';
import DashboardGraphTooltip from './DashboardGraphTooltip';
import SignificanceGraph from './active/SignificanceGraph';
import CategoryButton from './active/CategoryButton';
import HistoricalDashboardTooltip from './historical/HistoricalDashboardTooltip';
import ActiveDashboardTooltip from './active/ActiveDashboardTooltip';

const propTypes = {
    xSeries: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ySeries: PropTypes.arrayOf(PropTypes.object),
    allY: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.number)]),
    loading: PropTypes.bool,
    error: PropTypes.bool,
    type: PropTypes.oneOf(['historical', 'active']),
    description: PropTypes.string,
    errorLevel: PropTypes.oneOf(['error', 'warning']).isRequired
};

const defaultProps = {
    description: null
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
            tooltipData: {},
            tooltipX: 0,
            tooltipY: 0,
            hovered: '',
            categories: ['accuracy', 'completeness', 'existence']
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.toggleTooltip = this.toggleTooltip.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
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
            tooltipData: data,
            hovered: data.xValue
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false,
            hovered: ''
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

    filterCategory(category) {
        let categories = [...this.state.categories];
        if (categories.includes(category)) {
            // remove this category from the graph
            categories = categories.filter((cat) => cat !== category);
        }
        else {
            // add this category to the graph
            categories.push(category);
        }

        this.setState({
            categories
        });
    }

    generateCategoryButtons() {
        if (this.props.type === 'historical') {
            return null;
        }
        const categories = Object.keys(significanceColors);
        const buttons = categories.map((category) => {
            const rules = this.props.ySeries.filter((rule) => rule.category === category);
            return (
                <CategoryButton
                    filterCategory={this.filterCategory}
                    key={category}
                    disabled={rules.length === 0}
                    active={this.state.categories.includes(category)}
                    label={category}
                    color={significanceColors[category]} />
            );
        });
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
                    shape="bar"
                    position={this.state.tooltipData.position}
                    itemWidth={this.state.tooltipData.itemWidth}
                    xValue={this.state.tooltipData.xValue} >
                    <HistoricalDashboardTooltip {...this.state.tooltipData} />
                </DashboardGraphTooltip>
            ) :
                (
                    <DashboardGraphTooltip
                        shape="circle"
                        description={this.state.tooltipData.label}
                        itemWidth={this.state.tooltipData.itemWidth}
                        {...this.state.tooltipData}>
                        <ActiveDashboardTooltip {...this.state.tooltipData} errorLevel={this.props.errorLevel} />
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
                        toggleTooltip={this.toggleTooltip}
                        hovered={this.state.hovered} />
                ) : (
                    <SignificanceGraph
                        {...this.props}
                        categories={this.state.categories}
                        width={this.state.visualizationWidth}
                        height={graphHeight}
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip}
                        toggleTooltip={this.toggleTooltip} />
                );
            }
        }
        const graphTitle = this.props.type === 'historical' ? (
            null
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
DashboardGraph.defaultProps = defaultProps;
