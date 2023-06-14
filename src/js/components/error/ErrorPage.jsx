import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../SharedComponents/navigation/NavigationComponent';

const propTypes = {
    type: PropTypes.string,
    helpOnly: PropTypes.bool
};

const defaultProps = {
    type: '',
    helpOnly: false
};

export default class ErrorPage extends React.Component {
    render() {
        return (
            <div className="site_wrap usa-da-error-page">
                <Navbar type={this.props.type} logoOnly={this.props.helpOnly} />
                <div className="site_content pending-page">
                    <div className="usa-da-content-dark">
                        <div className="container">
                            <div className="row usa-da-content-add-data usa-da-page-title">
                                <div className="col-md-7 mt-50 mb-50">
                                    <div className="display-2">Page Not Found</div>
                                    <p>No page exists at this address.</p>
                                    <p><a href="/">Click here</a> to return home.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorPage.propTypes = propTypes;
ErrorPage.defaultProps = defaultProps;
