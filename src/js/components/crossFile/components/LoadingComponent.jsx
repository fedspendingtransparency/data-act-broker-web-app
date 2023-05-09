/**
  * LoadingComponent.jsx
  * Created by Kevin Li 6/16/16
  */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LoadingComponent extends React.Component {
    render() {
        return (
            <div className="usa-da-item-comparison">
                <div className="under-layer">
                    <div className="loading-bubbles">
                        <div className="bubble off-0" />
                        <div className="bubble off-1" />
                        <div className="bubble off-2" />

                        <div className="center-pad" />

                        <div className="bubble off-2" />
                        <div className="bubble off-1" />
                        <div className="bubble off-0" />
                    </div>
                </div>

                <div className="center-item">
                    <div className="circle">
                        <div className="usa-da-icon loading">
                            <FontAwesomeIcon icon="search" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
