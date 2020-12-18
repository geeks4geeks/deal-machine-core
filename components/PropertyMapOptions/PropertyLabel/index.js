import React, { Component } from 'react';
import {
  Wrapper,
} from 'app/NativeComponents/common';

import {
  ToggleSwitch,
  Select
} from 'app/NativeComponents/snippets';

class PropertyLabel extends Component{

  constructor(props){
    super(props);


    var label_options_array = [];

    label_options_array.push({
      key: 1,
      value: "owner_lastname",
      label: "Owner Last Name"
    });

    label_options_array.push({
      key: 2,
      value: "owner_name",
      label: "Owner Full Name"
    });

    label_options_array.push({
      key: 3,
      value: "property_address",
      label: "Property Address"
    });

    label_options_array.push({
      key: 4,
      value: "property_address_range",
      label: "Property Address Number"
    });

  

    /*
    label_options_array.push({
      key: 5,
      value: "parcel_id",
      label: "Parcel ID"
    });
    */
    this.state = {label_options_array: label_options_array}
  }


  renderTitle(property_label){
    var property_label_title = "";
    for(var i = 0; i<this.state.label_options_array.length; i++){
      if(property_label == this.state.label_options_array[i].value){
        property_label_title = this.state.label_options_array[i].label;
      }
    }
    return property_label_title;
  }


  renderLabelOptions(){
    if(this.props.property_map_options){
      if(this.props.property_map_options.show_property_label){
        return(
          <Select
            item_ref={"select_property_label"}
            items={this.state.label_options_array}
            title="Show label:"
            label="Select an option"
            value={this.props.property_map_options.property_label}
            text={this.props.property_map_options.property_label_title}
            onSelect={item => {
              this.props.editPropertyMapOptions({prop: "property_label", value: item});
              this.props.editPropertyMapOptions({prop: "property_label_title", value: this.renderTitle(item)});
            }}
          />
        )

      }
    }
    return <Wrapper />
  }


  render(){
    if(this.props.user.team_clearance_level > 0){
      return (
        <Wrapper>
          <ToggleSwitch
            onChange={value => {
              this.props.editPropertyMapOptions({prop: "show_property_label", value})
            }}
            value={this.props.property_map_options.show_property_label}
            title={'Show Label On Property'}
            text={"Select a label to overlay on properties. You'll want to zoom in to get good results."}
          />
          {this.renderLabelOptions()}
        </Wrapper>
      );
    }

    return <Wrapper />;
  }


}

export default PropertyLabel;
