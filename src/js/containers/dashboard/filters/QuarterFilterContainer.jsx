/**
 * QuarterFilterContainer.jsx
 * Created by Lizzie Salita 10/15/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filterActions from 'redux/actions/dashboard/dashboardFilterActions';

import QuarterPicker from 'components/dashboard/filters/QuarterPicker';

const propTypes = {
    updateGenericFilter: PropTypes.func,
    selectedQuarters: PropTypes.object
};

export class QuarterFilterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.pickedQuarter = this.pickedQuarter.bind(this);
    }

    pickedQuarter(quarter) {
        this.props.updateGenericFilter('quarters', quarter);
    }

    render() {
        return (
            <QuarterPicker
                pickedQuarter={this.pickedQuarter}
                selectedQuarters={this.props.selectedQuarters.toArray()} />
        );
    }
}

QuarterFilterContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        selectedQuarters: state.dashboardFilters.quarters
    }),
    (dispatch) => bindActionCreators(filterActions, dispatch),
)(QuarterFilterContainer);
