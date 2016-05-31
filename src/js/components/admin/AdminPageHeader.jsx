/**
 * AdminPageHeader.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';

export default class AdminPageHeader extends React.Component {
    render() {
        return (
            <div className="usa-da-content-dark mb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-40 mb-20">
                            <div className="display-2">
                                Administration
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}