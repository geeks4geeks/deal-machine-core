import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class TimesMailed extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "Any"
      },
      {
        value: "0",
        label: "0 Mailers"
      },
      {
        value: 1,
        label: "1 Mailer"
      },
      {
        value: 2,
        label: "2 Mailers"
      },
      {
        value: 3,
        label: "3 Mailers"
      },
      {
        value: 4,
        label: "4 Mailers"
      },
      {
        value: 5,
        label: "5 Mailers"
      },
      {
        value: 6,
        label: "6 Mailers"
      },
      {
        value: 7,
        label: "7 Mailers"
      },
      {
        value: 8,
        label: "8 Mailers"
      },
      {
        value: 9,
        label: "9 Mailers"
      },
      {
        value: 10,
        label: "10 Mailers"
      }]
    }
  }

  render(){

    return <NumberFilter
              colors={this.props.colors}
              filter_title="Mailers Sent"
              filter_options={this.state.options}
              filter_min={this.props.filters.times_mailed_min}
              filter_min_prop={"times_mailed_min"}
              filter_max={this.props.filters.times_mailed_max}
              filter_max_prop={"times_mailed_max"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
          />
  }

}


export default TimesMailed;
