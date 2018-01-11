/**
  * DeleteLink.jsx
  * Created by Minahm Kim 02/09/17
  */

import React, { PropTypes } from 'react';
import * as Icons from '../../SharedComponents/icons/Icons';

import DeleteModal from './DeleteModal';

const propTypes = {
    reload: PropTypes.func,
    warning: PropTypes.func,
    account: PropTypes.object,
    item: PropTypes.object,
    submissionId: PropTypes.number,
    confirm: PropTypes.bool
};

const defaultProps = {
    reload: null,
    warning: null,
    account: null,
    item: null,
    submissionId: null,
    confirm: false
};

export default class DeleteLink extends React.Component {
    constructor(props) {
        super(props);
        this.load = false;

        this.state = {
            active: false,
            delete: false
        };
    }

    componentDidMount() {
        this.didUnmount = false;
        this.canDelete();
    }

    componentDidUpdate() {
        if (!this.load) {
            this.canDelete();
        }
    }

    componentWillUnmount() {
        this.didUnmount = true;
    }

    confirm() {
        this.setState({
            active: true
        });
    }

    canDelete() {
        if (!this.props.account) {
            return;
        }
        this.load = true;

        let deletable = (this.props.account.website_admin || !this.props.account.helpOnly);

        if (!deletable) {
            this.props.account.affiliations.forEach((aff) => {
                if (aff.agency_name === this.props.item.agency && (aff.permission === "writer" ||
                    aff.permission === 'submitter')) {
                    deletable = true;
                    return;
                }
            });
        }

        this.setState({
            delete: deletable,
            active: this.props.confirm
        });
    }

    delete() {
        this.props.reload();
    }

    reset() {
        this.props.warning(-1);
        this.setState({
            active: false
        });
    }

    render() {
        let button = 'N/A';
        let modal = null;
        if (this.state.delete) {
            button = (
                <div onClick={this.confirm.bind(this)} className="trash-icon">
                    <Icons.Trash alt="Delete" />
                </div>);
            modal = (<DeleteModal
                isOpen={this.state.active}
                closeModal={this.reset.bind(this)}
                delete={this.delete.bind(this)}
                id={this.props.submissionId} />);
        }

        return (
            <div>
                <div className="usa-da-recent-activity-link" >
                    {button}
                </div>
                {modal}
            </div>
        );
    }
}

DeleteLink.propTypes = propTypes;
DeleteLink.defaultProps = defaultProps;
