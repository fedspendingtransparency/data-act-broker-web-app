/**
 * AdminPageContent.jsx
 * Created by Mike Bray 2/24/16
 **/

import React from 'react';
import { kGlobalConstants } from '../../GlobalConstants.js';
import Table from '../SharedComponents/table/TableComponent.jsx';
import Loader from 'react-loader';

import AdminUserTableContainer from '../../containers/admin/AdminUserTableContainer.jsx';

import * as AdminHelper from '../../helpers/adminHelper.js';




export default class AdminPageContent extends React.Component {

    render() {
        const headers = ['Name', 'Title', 'Agency', 'Email', 'Approve', 'Deny'];

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 usa-da-admin-message">
                        <h5 className="text-center">The following user(s) has requested access to the DATA Act Broker.</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="usa-da-admin-table-wrapper usa-da-registration col-md-12">
                        <ul>
                            <li>Click "Approve" to grant access. This will generate an email to the user with a link to complete registration.</li>
                            <li>Click "Deny" to prevent access. This will generate an email notifying the user that they have been denied access.</li>
                        </ul>

                        <AdminUserTableContainer />
                    </div>
                </div>
            </div>
        );
    }
}