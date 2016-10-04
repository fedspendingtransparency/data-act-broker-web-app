/**
 * validationRulesTablePage.jsx
 * Created by Emily Gullo 9/2/16
 **/

import React from 'react';
import Navbar from '../SharedComponents/navigation/NavigationComponent.jsx';
import HelpNav from './helpNav.jsx';
import ValidationRulesTableContent from './validationRulesTableContent.jsx';
import Footer from '../SharedComponents/FooterComponent.jsx';

import * as Icons from '../SharedComponents/icons/Icons.jsx';

export default class ValidationRulesTablePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="usa-da-help-style-page" name="top">
              <div className="usa-da-page-content">
                  <Navbar activeTab="help"/>
                  <div className="usa-da-content-dark mb-60">
                      <div className="container">
                          <div className="row">
                              <div className="col-md-12 mt-40 mb-20">
                                  <div className="display-2" data-contentstart="start" tabIndex={-1}>Help | DATA Act Broker
									  <HelpNav selected="Validations" />
								  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="container">
                      <div className="row usa-da-help-page">
                            <div className="col-md-12">
                                <ValidationRulesTableContent />
                            </div>
                          </div>
                      </div>
                  </div>
                  <Footer />
                  <div className="usa-da-help-top-button">
                      <a href="#/validations?section=top" aria-label="Back to top">
                          <div className="usa-da-icon">
                              <Icons.AngleUp alt="Arrow pointing up" />
                          </div>
                          <span className="hidden-label">Back to top</span>
                      </a>
                  </div>
              </div>
        );
    }
}
