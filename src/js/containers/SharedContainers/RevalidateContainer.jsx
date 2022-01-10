/**
 * RevalidateContainer.jsx
 * Created by Alisa Burdeyny 1/07/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkAffiliations } from 'helpers/permissionsHelper';

import RevalidateDataModal from 'components/SharedComponents/revalidate/RevalidateDataModal';

const propTypes = {
    publishStatus: PropTypes.string,
    disabled: PropTypes.bool,
    refreshPage: PropTypes.bool
};

const defaultProps = {
    disabled: false,
    refreshPage: false
}

export class RevalidateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            revalidateModalOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            revalidateModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            revalidateModalOpen: false
        });
    }

    render() {
        let buttonText = 'You do not have permission to revalidate';
        let buttonAction;

        const hasPerms = (checkAffiliations(this.props.session, 'submitter', this.props.submission.info.agency_name) ||
            checkAffiliations(this.props.session, 'writer', this.props.submission.info.agency_name) ||
            this.props.session.admin);

        if (hasPerms) {
            buttonText = 'Revalidate Submission';
            buttonAction = this.openModal;
        }

        const blockedStatuses = ['reverting', 'publishing'];
        if (blockedStatuses.indexOf(this.props.publishStatus) > -1) {
            buttonText = `Cannot revalidate while ${this.props.publishStatus}`;
            buttonAction = null;
        }

        if (this.props.disabled) {
            buttonAction = null;
        }

        return (
            <React.Fragment>
                <button
                    onClick={buttonAction}
                    disabled={!buttonAction}
                    className="usa-da-button btn-primary-alt dabs-revalidate-button">
                    {buttonText}
                </button>
                <div id="revalidateDataModalHolder">
                    <RevalidateDataModal
                        {...this.props}
                        closeModal={this.closeModal}
                        isOpen={this.state.revalidateModalOpen}
                        submissionID={this.props.submission.id}
                        refreshPage={this.props.refreshPage} />
                </div>
            </React.Fragment>
        );
    }
}

RevalidateContainer.propTypes = propTypes;
RevalidateContainer.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
    submission: state.submission,
    session: state.session
});

export default connect(
    mapStateToProps
)(RevalidateContainer);
