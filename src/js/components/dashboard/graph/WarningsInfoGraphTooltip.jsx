/**
 * WarningsInfoGraphTooltip.jsx
 * Created by Lizzie Salita 11/27/19
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    data: PropTypes.object
};

export default class WarningsInfoGraphTooltip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            tooltipWidth: 0,
            xOffset: 0
        };
    }

    render() {
        const data = this.props.data;
        return (
            <div
                className="tooltip warnings-info-graph__tooltip"
                ref={(div) => {
                    this.div = div;
                }}>
                <div
                    className="tooltip-pointer"
                    ref={(div) => {
                        this.pointerDiv = div;
                    }} />
                <div className="tooltip__title">
                    {data.description}
                </div>
                <hr />
                <div className="tooltip__body">
                    <table>
                        <tbody>
                            <tr>
                                <th>Time Period</th>
                                <td>{data.xValue}</td>
                            </tr>
                            <tr>
                                <th># of Rule Instances</th>
                                <td>{data.value}</td>
                            </tr>
                            <tr>
                                <th>Total # of Warnings</th>
                                <td>TODO</td>
                            </tr>
                            <tr>
                                <th>% of all Warnings</th>
                                <td>{data.percent}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

WarningsInfoGraphTooltip.propTypes = propTypes;
