import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class SaleDateFilter extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "Any"
      },
      {
        value: "over_3_years",
        label: "Sold over 3 years ago"
      },
      {
        value: "over_5_years",
        label: "Sold over 5 years ago"
      },
      {
        value: "over_10_years",
        label: "Sold over 10 years ago"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Sale Date"
              filter_options={this.state.options}
              filter_value={this.props.filters.saledate_dropdown}
              filter_prop={"saledate_dropdown"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}

              show_empty={true}
              include_empty={this.props.filters.saledate_dropdown_empty}
              empty_prop={"saledate_dropdown_empty"}
          />
  }

}


export default SaleDateFilter;
