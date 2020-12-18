import React, { Component } from 'react';

import NumberFilter from '../NumberFilter'

import {
  numberFormat
} from 'app/NativeActions';

class BuildingSizeFilter extends Component {

  constructor(props){

    super(props);

    let square_feet_array = [{
      value: -1,
      label: "Any"
    },
    {
      value: 0,
      label: "0 sq ft"
    }];

    for(let i = 1; i<40; i++){
      square_feet_array.push({
        value: (i*100).toString(),
        label: numberFormat((i*100))+" sq ft"
      })
    }

    for(let i = 4; i<=10; i++){
      square_feet_array.push({
        value: i*1000,
        label: numberFormat((i*1000))+" sq ft"
      })
    }

    this.state = {
      options: square_feet_array
    }
  }

  render(){

    return <NumberFilter
              filter_title="Square Feet"
              filter_type="square_feet"
              filter_options={this.state.options}
              filter_min={this.props.filters.min_building_size}
              filter_min_prop={"min_building_size"}
              filter_max={this.props.filters.max_building_size}
              filter_max_prop={"max_building_size"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
              toggle_highlight_filters={this.props.toggle_highlight_filters}
              colors={this.props.colors}

              empty_prop={"building_size_empty"}
              include_empty={false}
              show_empty={true}

          />
  }

}


export default BuildingSizeFilter;
