import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class SendingQueueFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "in_sending_queue",
        label: "In Sending Queue"
      },
      {
        value: "within_24_hours",
        label: "Will send mailer(s) within 24 hours"
      },
      {
        value: "within_48_hours",
        label: "Will send mailer(s within 48 hours"
      },
      {
        value: "within_7_days",
        label: "Will send mailer(s within 7 days"
      },
      {
        value: "within_14_days",
        label: "Will send mailer(s within 14 days"
      },
      {
        value: "within_21_days",
        label: "Will send mailer(s within 21 days"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Sending Queue:"
              filter_options={this.state.options}
              filter_value={this.props.filters.sending_queue}
              filter_prop={"sending_queue"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default SendingQueueFilter;
