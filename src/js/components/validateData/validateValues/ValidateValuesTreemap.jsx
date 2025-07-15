/**
  * ValidateValuesTreemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React from 'react';
import PropTypes from 'prop-types';
import _, { throttle } from 'lodash';
import Treemap from '../treemap/Treemap';
import TreemapHelp from './ValidateValuesTreemapHelp';
import TreemapHelpPlaceholder from './ValidateValuesTreemapHelpPlaceholder';

const propTypes = {
    colors: PropTypes.object,
    data: PropTypes.array,
    type: PropTypes.string
};

const defaultProps = {
    colors: {},
    data: [],
    type: ''
};

class ValidateValuesTreemap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null,
            activeCell: -1,
            formattedData: {
                data: [],
                max: 0,
                min: 0
            },
            treemapWidth: 100
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
        this.formatData();
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.data, this.props.data)) {
            this.formatData();
        }
    }

    handleWindowResize() {
        if (this.treemapWrapper !== undefined) {
            this.setState({
                treemapWidth: this.treemapWrapper.clientWidth * 0.75
            });
        }
    }

    formatData() {
        const data = [];

        let maxCount = null;
        let minCount = null;

        this.props.data.forEach((item) => {
            let detail = null;

            let title = item.field_name;
            if (item.error_name === 'rule_failed') {
                detail = item.rule_failed;
                title = `Rule ${item.original_label}`;
                if (item.original_label === '') {
                    title = 'Unknown Rule';
                }
            }


            // calculate the max and min occurrences, this will be used by the treemap to determine the color/shade
            const occurrences = parseInt(item.occurrences, 10);
            if (!maxCount || maxCount < occurrences) {
                maxCount = occurrences;
            }
            if (!minCount || minCount > occurrences) {
                minCount = occurrences;
            }

            data.push({
                title,
                value: occurrences,
                field: item.field_name,
                description: item.error_description,
                detail
            });
        });

        // sort by descending value
        // perform sorting here and then let the D3 treemap deal with sorting by index key to prevent random reshuffles
        const sortedData = _.orderBy(data, ['value', 'title'], 'desc');
        let i = 0;
        sortedData.forEach((item) => {
            const tmpItem = item;
            tmpItem.index = i;
            i += 1;
        });

        let treemapWidth = 100;
        if (this.treemapWrapper !== undefined) {
            treemapWidth = this.treemapWrapper.clientWidth * 0.75;
        }

        this.setState({
            formattedData: {
                data: sortedData,
                min: minCount,
                max: maxCount
            },
            treemapWidth
        });
    }

    clickedItem(item) {
        this.setState({
            selected: item,
            activeCell: item.cellId
        });
    }

    render() {
        let help = <TreemapHelpPlaceholder type={this.props.type} />;
        if (this.state.selected) {
            help = (<TreemapHelp
                {...this.state.selected}
                type={this.props.type} />);
        }

        return (
            <div
                className="treemap-wrapper"
                ref={(div) => {
                    this.treemapWrapper = div;
                }}>
                <div className="row">
                    <div className="col-md-9">
                        <Treemap
                            formattedData={this.state.formattedData}
                            width={this.state.treemapWidth}
                            clickedItem={this.clickedItem.bind(this)}
                            colors={this.props.colors}
                            activeCell={this.state.activeCell} />
                    </div>
                    <div className="col-md-3">
                        {help}
                    </div>
                </div>
            </div>
        );
    }
}

ValidateValuesTreemap.propTypes = propTypes;
ValidateValuesTreemap.defaultProps = defaultProps;

export default ValidateValuesTreemap;
