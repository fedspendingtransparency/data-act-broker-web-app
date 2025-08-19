/**
 * SettingsModal.jsx
 * Created by Alisa Burdeyny 04/10/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Picker } from 'data-transparency-ui';

import { errorLevels, validationRules } from 'dataMapping/dashboard/fileLabels';
import SettingsAgencySelectContainer from 'containers/settings/SettingsAgencySelectContainer';
import SettingsTableContainer from 'containers/settings/SettingsTableContainer';
import TabItem from 'components/SharedComponents/TabItem';
import SaveSettingsButton from './SaveSettingsButton';

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
            agency: {
                code: '',
                name: ''
            },
            selectedRule: {
                value: 'A',
                label: 'File A'
            },
            errorLevel: 'error'
        };

        this.updateAgency = this.updateAgency.bind(this);
        this.updateRule = this.updateRule.bind(this);
        this.setErrorLevel = this.setErrorLevel.bind(this);
    }

    setErrorLevel(errorLevel) {
        this.setState({
            errorLevel
        });
    }

    updateAgency(agency) {
        this.setState({
            agency
        });
    }

    updateRule(rule) {
        this.setState({
            selectedRule: rule
        });
    }

    render() {
        const ruleList = validationRules.map((rule) =>
            ({
                value: rule.value,
                name: rule.label,
                onClick: () => this.updateRule(rule)
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
                            <FontAwesomeIcon icon="xmark" />
                        </button>
                        <div className="settings-modal__content">
                            <div className="settings-modal__sidebar">
                                <h1>Settings</h1>
                                <h2><FontAwesomeIcon icon="filter" /> Agency</h2>
                                <SettingsAgencySelectContainer
                                    updateAgency={this.updateAgency}
                                    selectedAgency={this.state.agency} />
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
                                            id="validation-rules-picker"
                                            options={ruleList}
                                            selectedOption={this.state.selectedRule.label}
                                            sortFn={() => 0}
                                            isFixedWidth
                                            backgroundColor="#FFFFFF" />
                                    </div>
                                </div>
                                <div className="tabs">
                                    <div className="tabs__content">
                                        {errorLevels.map((level) => (
                                            <TabItem
                                                key={level}
                                                id={level}
                                                label={`${startCase(level)}s`}
                                                onClick={this.setErrorLevel}
                                                active={this.state.errorLevel === level} />
                                        ))}
                                    </div>
                                </div>
                                <SettingsTableContainer
                                    agencyCode={this.state.agency.code}
                                    file={this.state.selectedRule.value}
                                    errorLevel={this.state.errorLevel} />
                                <SaveSettingsButton
                                    agencyCode={this.state.agency.code}
                                    file={this.state.selectedRule.value} />
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
