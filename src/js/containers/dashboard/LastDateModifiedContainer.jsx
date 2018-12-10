/**
 * LastDateModifiedContainer.jsx
 * Created by Kwadwo Opoku-Debrah 9/30/18
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import _ from 'lodash';

import * as lastDateModifiedActions from '../../redux/actions/lastDateModifiedActions';
import * as lastDateModifiedHelper from '../../helpers/lastDateModifiedHelper';

import CalendarRangeDatePicker from '../../components/SharedComponents/CalendarRangeDatePicker';

const propTypes = {
    setLastDateModifiedList: PropTypes.func,
    lastDateModifiedList: PropTypes.object,
    detached: PropTypes.bool,
    selectedFilters: PropTypes.object,
    type: PropTypes.string,
    table: PropTypes.string,
    placeholder: PropTypes.string,
    onSelect: PropTypes.func
};

const defaultProps = {
    setLastDateModifiedList: () => {},
    lastDateModifiedList: {},
    detached: true,
    selectedFilters: [],
    table: '',
    type: '',
    placeholder: '',
    onSelect: () => {}
};

class LastDateModifiedContainer extends React.Component {
    loadData() {
        if (_.isEmpty(this.props.lastDateModifiedList.lastDateModified)) {
            // we need to populate the list and load on mounting the component
            lastDateModifiedHelper.fetchLastDateModified()
                .then((data) => {
                    const payload = [];
                    data.forEach((value) => {
                        payload.push(new Date(value.last_modified));
                    });
                    this.props.setLastDateModifiedList(payload);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    render() {
        // Temporary min/max dates workaround until backend is ready
        const finalPayload = {
            minDate: new Date('01/01/2016'),
            maxDate: new Date()
        };

        return (
            <CalendarRangeDatePicker minmaxDates={finalPayload} {...this.props} />
        );
    }
}

LastDateModifiedContainer.propTypes = propTypes;
LastDateModifiedContainer.defaultProps = defaultProps;

export default connect(
    (state) => ({
        lastDateModifiedList: state.lastDateModifiedList,
        selectedFilters: state.dashboardFilters
    }),
    (dispatch) => bindActionCreators(lastDateModifiedActions, dispatch),
)(LastDateModifiedContainer);
