/**
 * DashboardImpactsModal.jsx
 * Created by Daniel Boos 11/13/19
 */

import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    data: PropTypes.array,
    level: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    isOpen: PropTypes.bool
};

const DashboardImpactsModal = (props) => (
    <Modal
        mounted={props.isOpen}
        onExit={props.closeModal}
        verticallyCenter
        underlayClickExits
        initialFocus="#close-button"
        titleId="dashboard-page-rule-modal">
        <div className="usa-da-modal-page">
            <div id="dashboard-page-rule-modal" className="dashboard-page__modal">
                <button
                    id="close-button"
                    className="close-button"
                    onClick={props.closeModal}
                    aria-label="close-modal-button">
                    <FontAwesomeIcon icon="xmark" />
                </button>
                <h4>Degree of Impact - <span className="capitalize">{props.level}</span></h4>
                <hr />
                {
                    (props.data.length && props.data.length > 0) ? props.data.map((rule, index) => (
                        <div key={rule.rule_label}>
                            <div className="row">
                                <div className="left-modal-col col-md-6">
                                    {index > 0 ? '' : <h5>Rule Details</h5>}
                                    <div className="detail-row">
                                        <div className="detail-name">
                                            Rule
                                        </div>
                                        <div className="detail-content">
                                            {rule.rule_label}
                                        </div>
                                    </div>
                                    <div className="detail-row">
                                        <div className="detail-name">
                                            Number of Instances
                                        </div>
                                        <div className="detail-content">
                                            {rule.instances}
                                        </div>
                                    </div>
                                </div>
                                <div className="right-modal-col col-md-6">
                                    {index > 0 ? '' : <h5>Rule Description</h5>}
                                    <p>{rule.rule_description}</p>
                                </div>
                            </div>
                            {index === props.data.length - 1 ? '' : <hr className="modal-row" />}
                        </div>
                    )) : ''
                }
            </div>
        </div>
    </Modal>
);

DashboardImpactsModal.propTypes = propTypes;
export default DashboardImpactsModal;
