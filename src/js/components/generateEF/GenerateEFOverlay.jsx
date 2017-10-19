/**
  * GenerateEFOverlay.jsx
  * Created by Kevin Li 8/24/16
  **/

import React from 'react';
import * as Icons from '../SharedComponents/icons/Icons.jsx';
import CommonOverlay from '../SharedComponents/overlays/CommonOverlay.jsx';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble.jsx';

import * as PermissionsHelper from '../../helpers/permissionsHelper.js';
import * as ReviewHelper from '../../helpers/reviewHelper.js';

export default class GenerateEFOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.isUnmounted = false;
    }

    componentDidMount() {
        this.isUnmounted = false;
        if (this.props.submissionID !== null) {
            ReviewHelper.fetchStatus(this.props.submissionID)
                .then((data) => {
                    data.ready = true;
                    if (!this.isUnmounted) {
                        this.setState(data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }
    clickedNext(e) {
        e.preventDefault();
        this.props.nextPage();
    }

    clickedGenerate(e) {
        e.preventDefault();
        this.props.generateFiles();
    }

    render() {
        let buttonClass = '-disabled';
        let buttonDisabled = true;
        let nextClass = '-disabled';
        let nextDisabled = true;

        let header = 'Generating files...';
        let detail = '';

        let icon = <LoadingBauble />;
        let iconClass = 'overlay-animation';

        if (this.props.isReady && !this.props.hasErrors) {
            header = 'Files E and F have been successfully generated.';
            detail = 'Click Next to review and publish your submission.';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = ' btn-primary';
            nextDisabled = false;

            icon = <Icons.CheckCircle />;
            iconClass = 'usa-da-successGreen';
        }
        else if (this.props.isReady && this.props.hasErrors) {
            header = 'Errors occurred while generating Files E and F.';
            detail = 'Refer to the error messages above for more details.';

            icon = <Icons.ExclamationCircle />;
            iconClass = 'usa-da-errorRed';

            buttonClass = ' btn-primary';
            buttonDisabled = false;
            nextClass = '-disabled';
            nextDisabled = true;
        }

        if (!PermissionsHelper.checkAgencyPermissions(this.props.session, this.state.agency_name)) {
            buttonClass = '-disabled';
            buttonDisabled = true;
        }


        return (
            <CommonOverlay
                header={header}
                detail={detail}
                showIcon={true}
                icon={icon}
                iconClass={iconClass}
                showButtons={true}>
                <div className="usa-da-btn-bg">
                    <button className={"usa-da-button" + buttonClass} disabled={buttonDisabled}
                        onClick={this.clickedGenerate.bind(this)}>Regenerate Files</button>
                    <button className={"usa-da-button usa-da-validation-overlay-review " + nextClass}
                        disabled={nextDisabled} onClick={this.clickedNext.bind(this)}>Next</button>
                </div>
            </CommonOverlay>
        );
    }
}
