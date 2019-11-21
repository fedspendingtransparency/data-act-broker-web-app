/**
 * WarningsInfoGraph.jsx
 * Created by Lizzie Salita 11/14/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, uniq } from 'lodash';
import { buildLegend } from 'helpers/stackedBarChartHelper';
import BarChartStacked from './BarChartStacked';

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool
};

const graphHeight = 540;
const legendSpacing = 30;

export default class WarningsInfoGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
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

    generateLegend() {
        const yData = this.props.data.yData && this.props.data.yData[0];
        let rules = [];
        if (yData) {
            rules = yData.map((rule) => Object.values(rule)[0]);
        }
        // Remove any duplicate rules
        rules = uniq(rules);
        return buildLegend(rules, legendSpacing);
    }

    render() {
        const legend = this.generateLegend();
        const chart = this.props.loading ? (<p>Loading...</p>) : (
            <BarChartStacked
                width={this.state.visualizationWidth}
                height={graphHeight}
                data={this.props.data}
                legend={legend}
                legendSpacing={legendSpacing} />
        );
        return (
            <div className="dashboard-viz warnings-info">
                <h3 className="dashboard-viz__heading">Warnings Information</h3>
                <p>Hover over the color to see details for each quarterly warning.</p>
                <div
                    className="warnings-info-graph"
                    ref={(div) => {
                        this.graphDiv = div;
                    }}>
                    {chart}
                </div>
            </div>
        );
    }
}

WarningsInfoGraph.propTypes = propTypes;
