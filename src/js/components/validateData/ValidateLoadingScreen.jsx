/**
  * ValidateLoadingScreen.jsx
  * Created by Kevin Li 04/13/16
  */

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ValidateDataFilePlaceholder from './ValidateDataFilePlaceholder';

import CommonOverlay from '../SharedComponents/overlays/CommonOverlay';
import LoadingBauble from '../SharedComponents/overlays/LoadingBauble';

export default class ValidateLoadingScreen extends React.Component {
    render() {
        const placeholders = [];

        for (let i = 0; i < 3; i++) {
            placeholders.push(<ValidateDataFilePlaceholder key={i} />);
        }

        return (
            <div className="container">
                <div className="row center-block usa-da-submission-items with-overlay">
                    <div className="usa-da-validate-items">
                        <ReactCSSTransitionGroup
                            transitionName="usa-da-validate-fade"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}>
                            <div>
                                {placeholders}
                            </div>
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
                <CommonOverlay
                    header="Gathering data..."
                    icon={<LoadingBauble />}
                    iconClass="overlay-animation"
                    showButtons={false} />
            </div>
        );
    }
}
