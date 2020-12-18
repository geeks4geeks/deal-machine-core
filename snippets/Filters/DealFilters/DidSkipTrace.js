import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class DidSkipTrace extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        label: "Skip trace was done for lead",
        value: "did_skip_trace"
      },
      {
        label: "Skip trace was not done for lead",
        value: "did_not_skip_trace"
      },
      {
        label: "Skip trace was successful",
        value: "skip_trace_successful"
      },
      {
        label: "Skip trace was not successful",
        value: "skip_trace_unsuccessful"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Skip Trace"
              filter_options={this.state.options}
              filter_value={this.props.filters.did_skip_trace}
              filter_prop={"did_skip_trace"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default DidSkipTrace;
