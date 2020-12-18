import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class EquityPercentFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "Any"
      },
      {
        value: "0",
        label: "0%"
      },
      {
        value: 5,
        label: "5%"
      },
      {
        value: 10,
        label: "10%"
      },
      {
        value: 15,
        label: "15%"
      },
      {
        value: 20,
        label: "20%"
      },
      {
        value: 25,
        label: "25%"
      },
      {
        value: 30,
        label: "30%"
      },
      {
        value: 35,
        label: "35%"
      },
      {
        value: 40,
        label: "40%"
      },
      {
        value: 45,
        label: "45%"
      },
      {
        value: 50,
        label: "50%"
      },
      {
        value: 55,
        label: "55%"
      },
      {
        value: 60,
        label: "60%"
      },
      {
        value: 65,
        label: "65%"
      },
      {
        value: 70,
        label: "70%"
      },
      {
        value: 75,
        label: "75%"
      },
      {
        value: 80,
        label: "80%"
      },
      {
        value: 85,
        label: "85%"
      },
      {
        value: 90,
        label: "90%"
      },
      {
        value: 95,
        label: "95%"
      },
      {
        value: 100,
        label: "100%"
      }]
    }
  }

  render(){

    return <NumberFilter
              filter_title="Equity Percent"
              filter_type="percent"
              filter_options={this.state.options}
              filter_min={this.props.filters.min_equity_percent}
              filter_min_prop={"min_equity_percent"}
              filter_max={this.props.filters.max_equity_percent}
              filter_max_prop={"max_equity_percent"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"equity_percent_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default EquityPercentFilter;
