import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class SalePriceFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "Any"
      },
      {
        value: "0",
        label: "$0"
      },
      {
        value: 50000,
        label: "$50,000"
      },
      {
        value: 100000,
        label: "$100,000"
      },
      {
        value: 200000,
        label: "$200,000"
      },
      {
        value: 300000,
        label: "$300,000"
      },
      {
        value: 400000,
        label: "$400,000"
      },
      {
        value: 500000,
        label: "$500,000"
      },
      {
        value: 600000,
        label: "$600,000"
      },
      {
        value: 700000,
        label: "$700,000"
      },
      {
        value: 800000,
        label: "$800,000"
      },
      {
        value: 900000,
        label: "$900,000"
      },
      {
        value: 1000000,
        label: "$1,000,000"
      }]
    }
  }

  render(){

    return <NumberFilter
              filter_title="Sale Price"
              filter_type="money"
              filter_options={this.state.options}
              filter_min={this.props.filters.min_saleprice}
              filter_min_prop={"min_saleprice"}
              filter_max={this.props.filters.max_saleprice}
              filter_max_prop={"max_saleprice"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"saleprice_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default SalePriceFilter;
