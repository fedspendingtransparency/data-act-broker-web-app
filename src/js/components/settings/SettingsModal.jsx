/**
 * SettingsModal.jsx
 * Created by Alisa Burdeyny 04/10/20
 */

import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'react-aria-modal';
import { startCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NewPicker } from 'data-transparency-ui';

import { errorLevels, validationRules } from 'dataMapping/dashboard/fileLabels';
import SettingsAgencySelectContainer from 'containers/settings/SettingsAgencySelectContainer';
import SettingsTableContainer from 'containers/settings/SettingsTableContainer';
import TabItem from 'components/SharedComponents/TabItem';
import SaveSettingsButton from './SaveSettingsButton';

const propTypes = {
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool
};

const SettingsModal = ({isOpen = false, ...props}) => {
    const [errorLevel, setErrorLevel] = useState('error');
    const [agency, setAgency] = useState({
        code: '',
        name: ''
    });
    const [selectedRule, setSelectedRule] = useState({
        value: 'A',
        label: 'File A'
    });

    const updateErrorLevel = (newErrorLevel) => {
        setErrorLevel(newErrorLevel);
    };

    const updateAgency = (newAgency) => {
        setAgency(newAgency);
    };

    const updateRule = (newRule) => {
        setSelectedRule(newRule);
    };

    const ruleList = validationRules.map((rule) =>
        ({
            value: rule.value,
            name: rule.label,
            onClick: () => updateRule(rule)
        }));
    return (
        <Modal
            mounted={isOpen}
            onExit={props.closeModal}
            verticallyCenter
            underlayClickExits
            initialFocus="#close-button"
            titleId="settings-modal">
            <div className="usa-da-modal-page">
                <div id="settings-modal" className="settings-modal">
                    <button
                        id="close-button"
                        className="close-button"
                        onClick={props.closeModal}
                        aria-label="close-modal-button">
                        <FontAwesomeIcon icon="xmark" />
                    </button>
                    <div className="settings-modal__content">
                        <div className="settings-modal__sidebar">
                            <h1>Settings</h1>
                            <h2><FontAwesomeIcon icon="filter" /> Agency</h2>
                            <SettingsAgencySelectContainer
                                updateAgency={updateAgency}
                                selectedAgency={agency} />
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
                                    <NewPicker
                                        enabled
                                        classname="validation-rule-picker-dropdown"
                                        id="validation-rules-picker"
                                        options={ruleList}
                                        selectedOption={selectedRule.label}
                                        sortFn={() => 0} />
                                </div>
                            </div>
                            <div className="tabs">
                                <div className="tabs__content">
                                    {errorLevels.map((level) => (
                                        <TabItem
                                            key={level}
                                            id={level}
                                            label={`${startCase(level)}s`}
                                            onClick={updateErrorLevel}
                                            active={errorLevel === level} />
                                    ))}
                                </div>
                            </div>
                            <SettingsTableContainer
                                agencyCode={agency.code}
                                file={selectedRule.value}
                                errorLevel={errorLevel} />
                            <SaveSettingsButton
                                agencyCode={agency.code}
                                file={selectedRule.value} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

SettingsModal.propTypes = propTypes;
export default SettingsModal;
