/**
 * WarningsInfoGraph.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import NoResultsMessage from 'components/SharedComponents/NoResultsMessage';
import LoadingMessage from 'components/SharedComponents/LoadingMessage';
import ErrorMessageOverlay from 'components/SharedComponents/ErrorMessageOverlay';
import BarChartStacked from './BarChartStacked';
import WarningsInfoGraphTooltip from './WarningsInfoGraphTooltip';

const propTypes = {
    xSeries: PropTypes.arrayOf(PropTypes.string),
    ySeries: PropTypes.arrayOf(PropTypes.object),
    allY: PropTypes.arrayOf(PropTypes.number),
    loading: PropTypes.bool,
    error: PropTypes.bool
};

const graphHeight = 540;
const spaceBetweenStacks = 2;

export default class WarningsInfoGraph extends React.Component {
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

    render() {
        const chart = (
            <BarChartStacked
                {...this.props}
                width={this.state.visualizationWidth}
                height={graphHeight}
                spaceBetweenStacks={spaceBetweenStacks}
                showTooltip={this.showTooltip}
                hideTooltip={this.hideTooltip}
                toggleTooltip={this.toggleTooltip} />
        );
        const tooltip = this.state.showTooltip ? (
            <WarningsInfoGraphTooltip data={this.state.tooltipData} />) : null;
        const empty = (this.props.xSeries.length === 0);
        return (
            <div className="dashboard-viz warnings-info">
                <h3 className="dashboard-viz__heading">Warnings Information</h3>
                <p>Hover over the color to see details for each quarterly warning.</p>
                <div
                    className="warnings-info-graph"
                    ref={(div) => {
                        this.graphDiv = div;
                    }}>
                    {tooltip}
                    {this.props.loading && <LoadingMessage />}
                    {!this.props.loading && this.props.error && <ErrorMessageOverlay />}
                    {!this.props.loading && !this.props.error && empty && <NoResultsMessage />}
                    {!this.props.loading && chart}
                </div>
            </div>
        );
    }
}

WarningsInfoGraph.propTypes = propTypes;
