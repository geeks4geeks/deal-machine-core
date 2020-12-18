import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'


import moment from 'moment';

class YearBuiltFilter extends Component {

  constructor(props){

    super(props);

    let lot_acreage_array = [{
      value: -1,
      label: "Any"
    }];

    const current_year = parseInt(moment().format("YYYY"));

    for(let i = current_year; i>(current_year-150); i--){
      lot_acreage_array.push({
        value: i,
        label: i
      })
    }

    this.state = {
      options: lot_acreage_array
    }
  }

  render(){

    return <NumberFilter
              filter_title="Year Built"
              filter_type="year"
              filter_options={this.state.options}
              filter_min={this.props.filters.min_year_built}
              filter_min_prop={"min_year_built"}
              filter_max={this.props.filters.max_year_built}
              filter_max_prop={"max_year_built"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"year_built_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default YearBuiltFilter;
