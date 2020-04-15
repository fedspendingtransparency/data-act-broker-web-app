/**
 * SettingsModal.jsx
 * Created by Alisa Burdeyny 04/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from 'data-transparency-ui';

import SettingsAgencySelectContainer from 'containers/settings/SettingsAgencySelectContainer';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool
};

const defaultProps = {
    isOpen: false
};

export default class SettingsModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            agencyCode: '',
            selectedRule: 'A'
        };

        this.updateAgency = this.updateAgency.bind(this);
        this.updateRule = this.updateRule.bind(this);
    }

    updateAgency(agencyCode) {
        this.setState({
            agencyCode
        });
    }

    updateRule(rule) {
        this.setState({
            selectedRule: rule
        });
    }

    render() {
        const validationRules = [
            { value: 'A', label: 'File A' },
            { value: 'B', label: 'File B' },
            { value: 'C', label: 'File C' },
            { value: 'cross-AB', label: 'Cross: A/B' },
            { value: 'cross-BC', label: 'Cross: B/C' },
            { value: 'cross-CD1', label: 'Cross: C/D1' },
            { value: 'cross-CD2', label: 'Cross: C/D2' }];
        const ruleList = validationRules.map((rule) =>
            ({
                name: rule.label,
                onClick: () => this.updateRule(rule.value)
            }));
        return (
            <Modal
                mounted={this.props.isOpen}
                onExit={this.props.closeModal}
                verticallyCenter
                underlayClickExits
                initialFocus="#close-button"
                titleId="settings-modal">
                <div className="usa-da-modal-page">
                    <div id="settings-modal" className="settings-modal">
                        <button
                            id="close-button"
                            className="close-button"
                            onClick={this.props.closeModal}
                            aria-label="close-modal-button">
                            <FontAwesomeIcon icon="times" />
                        </button>
                        <div className="settings-modal__content">
                            <div className="settings-modal__sidebar">
                                <h1>Settings</h1>
                                <h2><FontAwesomeIcon icon="filter" /> Agency</h2>
                                <SettingsAgencySelectContainer
                                    updateAgency={this.updateAgency}
                                    selectedAgency={this.state.agencyCode} />
                            </div>
                            <div className="settings-modal__main">
                                <h2>Rule Settings</h2>
                                <div className="rule-settings-top">
                                    <div className="description">
                                        Change the Significance and Impact settings to alter the weight of your
                                        agency&apos;s respective rules in the Active Dashboard chart.
                                    </div>
                                    <div className="validation-rule-select">
                                        <h2><FontAwesomeIcon icon="filter" /> Validation Rules</h2>
                                        <Picker
                                            options={ruleList}
                                            selectedOption={this.state.selectedRule}
                                            sortFn={() => 0}
                                            isFixedWidth />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

SettingsModal.defaultProps = defaultProps;
SettingsModal.propTypes = propTypes;
