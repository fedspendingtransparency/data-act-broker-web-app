/**
 * ActiveDashboardImpactsContainer.jsx
 * Created by Daniel 4/1/2020
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import { connect } from 'react-redux';

import * as DashboardHelper from 'helpers/dashboardHelper';
import ActiveDashboardImpacts from 'components/dashboard/impacts/ActiveDashboardImpacts';
import DashboardImpactsModal from 'components/dashboard/impacts/DashboardImpactsModal';

const propTypes = {
    appliedFilters: PropTypes.object.isRequired,
    errorLevel: PropTypes.oneOf(['error', 'warning']),
    submissionID: PropTypes.string
};

export class ActiveDashboardImpactsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submissionData: {},
            inFlight: false,
            hasFailed: false,
            showModel: false,
            modelData: [],
            modelLevel: ''
        };

        this.getImpacts = this.getImpacts.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.getImpacts();
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.getImpacts();
        }
    }

    getImpacts() {
        this.setState({
            inFlight: true
        });
        const submissionId = parseInt(this.props.submissionID, 10);
        const fileType = this.props.appliedFilters.file;
        const errorLevel = this.props.errorLevel;
        DashboardHelper.fetchActiveImpacts(submissionId, fileType, errorLevel)
            .then((res) => {
                this.setState({
                    hasFailed: false,
                    submissionData: res.data,
                    inFlight: false
                });
            })
            .catch((err) => {
                console.error(err);
                this.setState({
                    hasFailed: true,
                    inFlight: false
                });
            });
    }

    openModal(data, level) {
        this.setState({
            showModal: true,
            modalData: data,
            modalLevel: level
        });
    }

    closeModal() {
        this.setState({
            showModal: false,
            modalData: []
        });
    }

    render() {
        let modal = null;
        if (this.state.showModal) {
            modal = (
                <DashboardImpactsModal
                    data={this.state.modalData}
                    level={this.state.modalLevel}
                    closeModal={this.closeModal}
                    isOpen={this.state.showModal} />);
        }
        return (
            <>
                <ActiveDashboardImpacts
                    submissionData={this.state.submissionData}
                    openModal={this.openModal}
                    inFlight={this.state.inFlight}
                    hasFailed={this.state.hasFailed}
                    errorLevel={this.props.errorLevel} />
                {modal}
            </>
        );
    }
}

ActiveDashboardImpactsContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        appliedFilters: state.appliedDashboardFilters.filters.active
    })
)(ActiveDashboardImpactsContainer);
