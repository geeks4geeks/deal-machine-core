import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  Select
} from 'app/NativeComponents/snippets';

class OwnerStatus extends Component{

  constructor(props){
    super(props);


    var owner_status_array = [];

    owner_status_array.push({
      key: 0,
      value: "none",
      label: "N/A"
    });

    owner_status_array.push({
      key: 1,
      value: "absentee_owner",
      label: "Absentee Owner"
    });

    owner_status_array.push({
      key: 2,
      value: "owner_occupied",
      label: "Owner Occupied"
    });

    owner_status_array.push({
      key: 3,
      value: "corporate_owner",
      label: "Corporate Owned"
    });

    this.state = {owner_status_array: owner_status_array}
  }


  renderTitle(owner_status){
    var owner_status_title = "";
    for(var i = 0; i<this.state.owner_status_array.length; i++){
      if(owner_status == this.state.owner_status_array[i].value){
        owner_status_title = this.state.owner_status_array[i].label;
      }
    }
    return owner_status_title;
  }


  render(){
    return (
      <Select
        item_ref={"select_owner_status"}
        items={this.state.owner_status_array}
        title="Owner Status:"
        label="Select an option"
        value={this.props.property_map_options.highlight_option_owner_status}
        text={this.props.property_map_options.highlight_option_owner_status_title}
        onSelect={item => {
          this.props.editPropertyMapOptions({prop: "highlight_option_owner_status", value: item});
          this.props.editPropertyMapOptions({prop: "highlight_option_owner_status_title", value: this.renderTitle(item)});

        }}
      />
    );
  }


}

export default OwnerStatus;
