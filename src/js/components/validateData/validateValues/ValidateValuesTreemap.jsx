/**
  * ValidateValuesTreemap.jsx
  * Created by Kevin Li 4/11/2016
  */

import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Treemap from '../treemap/Treemap';
import TreemapHelp from './ValidateValuesTreemapHelp';
import TreemapHelpPlaceholder from './ValidateValuesTreemapHelpPlaceholder';

const propTypes = {
    colors: PropTypes.object,
    data: PropTypes.array,
    type: PropTypes.string
};

const ValidateValuesTreemap = ({ colors = {}, data = [], type = '' }) => {
    const [selected, setSelected] = useState(null);
    const [activeCell, setActiveCell] = useState(-1);
    const [treemapWidth, setTreemapWidth] = useState(100);
    const [formattedData, setFormattedData] = useState({
        data: {},
        max: 0,
        min: 0
    });
    const treemapRef = useRef();
    // const throttledResize = useRef(throttle(() => handleWindowResize(), 50));

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        formatData();

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        formatData();
    }, [data]);

    const handleWindowResize = () => {
        if (treemapRef !== undefined && treemapRef.current !== undefined) {
            setTreemapWidth(treemapRef.current.clientWidth * 0.75);
        }
    };

    const formatData = () => {
        const tmpData = [];

        let maxCount = null;
        let minCount = null;

        data.forEach((item) => {
            let detail = null;

            let name = item.field_name;
            if (item.error_name === 'rule_failed') {
                detail = item.rule_failed;
                name = `Rule ${item.original_label}`;
                if (item.original_label === '') {
                    name = 'Unknown Rule';
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

            tmpData.push({
                name,
                value: occurrences,
                field: item.field_name,
                description: item.error_description,
                detail,
                type: 'leaf'
            });
        });

        // sort by descending value
        // perform sorting here and then let the D3 treemap deal with sorting by index key to prevent random reshuffles
        const sortedData = _.orderBy(tmpData, ['value', 'name'], 'desc');
        let i = 0;
        sortedData.forEach((item) => {
            const tmpItem = item;
            tmpItem.index = i;
            i += 1;
        });
        let tmpTreemapWidth = 100;
        if (treemapRef !== undefined && treemapRef.current !== undefined) {
            tmpTreemapWidth = treemapRef.current.clientWidth * 0.75;
        }

        setTreemapWidth(tmpTreemapWidth);
        setFormattedData({
            data: {
                type: 'node',
                name: type,
                children: sortedData
            },
            min: minCount,
            max: maxCount
        });
    };

    const clickedItem = (item) => {
        setSelected(item);
        setActiveCell(item.cellId);
    };

    let help = <TreemapHelpPlaceholder type={type} />;
    if (selected) {
        help = (<TreemapHelp
            {...selected}
            type={type} />);
    }

    return (
        <div
            className="treemap-wrapper"
            ref={treemapRef}>
            <div className="row">
                <div className="col-md-9">
                    <Treemap
                        formattedData={formattedData}
                        width={treemapWidth}
                        clickedItem={clickedItem}
                        colors={colors}
                        activeCell={activeCell} />
                </div>
                <div className="col-md-3">
                    {help}
                </div>
            </div>
        </div>
    );
};

ValidateValuesTreemap.propTypes = propTypes;

export default ValidateValuesTreemap;
