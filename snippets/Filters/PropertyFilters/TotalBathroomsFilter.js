import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

class TotalBathroomsFilter extends Component {

  constructor(props){

    super(props);

    let bathrooms_array = [{
      value: -1,
      label: "Any"
    }];

    for(let i = 1; i<=5; i++){
      bathrooms_array.push({
        value: i.toString(),
        label: i.toString()
      })
    }

    this.state = {
      options: bathrooms_array
    }
  }

  render(){

    return <NumberFilter
              filter_title="Bathrooms"
              filter_type=""
              filter_options={this.state.options}
              filter_min={this.props.filters.min_bathrooms}
              filter_min_prop={"min_bathrooms"}
              filter_max={this.props.filters.max_bathrooms}
              filter_max_prop={"max_bathrooms"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"bathrooms_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default TotalBathroomsFilter;
