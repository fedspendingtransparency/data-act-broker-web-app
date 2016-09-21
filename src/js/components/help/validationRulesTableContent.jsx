/**
 * validationRulesTableContent.jsx
 * Created by Emily Gullo 9/15/2016
 **/

import React from 'react';
import $ from 'jquery';
import Reactable from 'reactable';
import Papa from 'papaparse';


export default class ValidationRulesTableContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
      this.scrollToTop();

      Papa.parse('./help/validations.csv', {
        download: true,
        header: true,
        complete: (results) => {
          // logic
          this.setState({
            data: results.data
          });
        }
      });

    }

    componentDidUpdate(prevProps, prevState) {
        this.scrollToTop();
    }

    scrollToTop() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);

    }



    render() {

        return (
            <div className="usa-da-help-content">
              <Reactable.Table className="table usa-da-table table-bordered" data={this.state.data} filterable={['Rule Detail']} sortable={['Rule']} filterPlaceholder="Filter by..." noDataText="No matching records found." />
           </div>
        );
    }
}
