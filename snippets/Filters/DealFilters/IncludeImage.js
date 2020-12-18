import React, { Component } from 'react';

import SelectFilter from '../SelectFilter'

class IncludeImage extends Component {

  constructor(props){

    super(props);

    this.state = {
      options: [{
        value: -1,
        label: "N/A"
      },
      {
        value: "image",
        label: "Lead does include image"
      },
      {
        value: "no_image",
        label: "Lead does not include image"
      }]
    }
  }

  render(){

    return <SelectFilter
              filter_title="Include Image?"
              filter_options={this.state.options}
              filter_value={this.props.filters.include_image}
              filter_prop={"include_image"}
              filter_search={this.props.filter_search}
              editLeadFilter={this.props.editLeadFilter}
          />
  }

}


export default IncludeImage;
