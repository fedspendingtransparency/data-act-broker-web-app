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

const propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool
};

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

    render() {
        const chart = (
            <BarChartStacked
                width={this.state.visualizationWidth}
                height={540}
                data={this.props.data} />
        );
        const empty = (this.props.data.groups.length === 0);
        return (
            <div className="dashboard-viz warnings-info">
                <h3 className="dashboard-viz__heading">Warnings Information</h3>
                <p>Hover over the color to see details for each quarterly warning.</p>
                <div
                    className="warnings-info-graph"
                    ref={(div) => {
                        this.graphDiv = div;
                    }}>
                    {this.props.loading && <LoadingMessage />}
                    {!this.props.loading && this.props.error && <ErrorMessageOverlay />}
                    {!this.props.loading && !this.props.error && empty && <NoResultsMessage />}
                    {!this.props.loading && this.props.data && chart}
                </div>
            </div>
        );
    }
}

WarningsInfoGraph.propTypes = propTypes;
