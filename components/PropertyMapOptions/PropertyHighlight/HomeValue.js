import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  Select
} from 'app/NativeComponents/snippets';

class HomeValue extends Component{

  constructor(props){
    super(props);


    var home_value_array = [];

    home_value_array.push({
      key: 0,
      value: "none",
      label: "N/A"
    });

    home_value_array.push({
      key: 1,
      value: "under_50k",
      label: "Between $0-49k"
    });

    home_value_array.push({
      key: 2,
      value: "between_50k_199k",
      label: "Between $50k-199k"
    });

    home_value_array.push({
      key: 3,
      value: "between_200k_499k",
      label: "Between $200k-499k"
    });


    home_value_array.push({
      key: 4,
      value: "over_500k",
      label: "Over 500k"
    });



    this.state = {home_value_array: home_value_array}
  }


  renderTitle(home_value){
    var home_value_title = "";
    for(var i = 0; i<this.state.home_value_array.length; i++){
      if(home_value == this.state.home_value_array[i].value){
        home_value_title = this.state.home_value_array[i].label;
      }
    }
    return home_value_title;
  }


  render(){
    return (
      <Select
        item_ref={"select_home_value"}
        items={this.state.home_value_array}
        title="Property Value:"
        label="Select an option"
        value={this.props.property_map_options.highlight_option_home_value}
        text={this.props.property_map_options.highlight_option_home_value_title}
        onSelect={item => {
          this.props.editPropertyMapOptions({prop: "highlight_option_home_value", value: item});
          this.props.editPropertyMapOptions({prop: "highlight_option_home_value_title", value: this.renderTitle(item)});
        }}
      />
    );
  }


}

export default HomeValue;
