import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class TotalBedroomsFilter extends Component {

  constructor(props){

    super(props);

    let bedrooms_array = [{
      value: -1,
      label: "Any"
    }];

    for(let i = 1; i<=5; i++){
      bedrooms_array.push({
        value: i.toString(),
        label: i.toString()
      })
    }

    this.state = {
      options: bedrooms_array
    }
  }

  render(){

    return <NumberFilter
              filter_title="Bedrooms"
              filter_type=""
              filter_options={this.state.options}
              filter_min={this.props.filters.min_bedrooms}
              filter_min_prop={"min_bedrooms"}
              filter_max={this.props.filters.max_bedrooms}
              filter_max_prop={"max_bedrooms"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"bedrooms_empty"}
              include_empty={false}
              show_empty={true}
          />
  }

}


export default TotalBedroomsFilter;
