import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class PreforclosureFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "behind_on_taxes",
        label: "Tax Delinquent"
      },
      {
        value: "preforeclosure",
        label: "Preforeclosure"
      },
      {
        value: "foreclosure",
        label: "Foreclosure"
      },
      {
        value: "bank_owned",
        label: "Bank Owned"
      },
      {
        value: "no_preforeclosure",
        label: "Not In Preforeclosure"
      }]
    }
  }

  render(){

    return <SelectFilter
            filter_title="Preforeclosure Status"
            filter_options={this.state.options}
            filter_value={this.props.filters.preforeclosure_type}
            filter_prop={"preforeclosure_type"}
            filter_search={this.props.filter_search}
            editLeadFilter={this.props.editLeadFilter}
           />
  }

}


export default PreforclosureFilter;
