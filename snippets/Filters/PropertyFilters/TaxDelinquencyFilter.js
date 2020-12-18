import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class TaxDelinquencyFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "behind_on_taxes",
        label: "Behind On Taxes"
      },
      {
        value: "not_behind_on_taxes",
        label: "Not Behind On Taxes"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Tax Delinquency"
              filter_options={this.state.options}
              filter_value={this.props.filters.tax_delinquency}
              filter_prop={"tax_delinquency"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default TaxDelinquencyFilter;
