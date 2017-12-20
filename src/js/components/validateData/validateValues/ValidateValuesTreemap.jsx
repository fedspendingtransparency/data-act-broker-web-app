/**
  * ValidateValuesTreemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import React, { PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import _ from 'lodash';
import Treemap from '../treemap/Treemap';
import TreemapHelp from './ValidateValuesTreemapHelp';
import TreemapHelpPlaceholder from './ValidateValuesTreemapHelpPlaceholder';

const propTypes = {
    colors: PropTypes.object,
    data: PropTypes.array,
    containerWidth: PropTypes.number,
    type: PropTypes.string
};

const defaultProps = {
    colors: {},
    data: [],
    containerWidth: 100,
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
            }
        };
    }

    componentDidMount() {
        this.formatData();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps.data, this.props.data)) {
            this.formatData();
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
                title = 'Rule ' + item.original_label;
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

        this.setState({
            formattedData: {
                data: sortedData,
                min: minCount,
                max: maxCount
            }
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
            <div className="row">
                <div className="col-md-9">
                    <Treemap
                        formattedData={this.state.formattedData}
                        width={this.props.containerWidth * 0.75}
                        clickedItem={this.clickedItem.bind(this)}
                        colors={this.props.colors}
                        activeCell={this.state.activeCell} />
                </div>
                <div className="col-md-3">
                    {help}
                </div>
            </div>
        );
    }
}

ValidateValuesTreemap.propTypes = propTypes;
ValidateValuesTreemap.defaultProps = defaultProps;

export default Dimensions()(ValidateValuesTreemap);
