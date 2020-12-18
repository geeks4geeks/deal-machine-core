import React, { Component } from "react";

import { Wrapper, Card, Input } from "app/NativeComponents/common";
import { Select } from 'app/NativeComponents/snippets';
import {
  getStateName
} from 'app/NativeActions';

class ZipInput extends Component {


  render() {
    if(this.props.location_type == "city"){

      var state_data = [];
      for(var i = 0; i<this.props.states.length; i++){
        state_data.push({
          key: i,
          label: this.props.states[i].name,
          value: this.props.states[i].abbr,
        });
      }


      return (
        <Card>
          <Input
            ref="city"
            name="city"
            blurOnSubmit={true}
            autoCapitalize="words"
            returnKeyType={"done"}
            placeholder="Enter a City Name"
            maxLength={5}
            onChange={value => this.props.editListBuilderField({ prop: "city", value: value })}
            onSubmitEditing={()=>{}}
            value={this.props.city}
            type="text"
          />
          <Select
            item_ref={"state"}
            items={state_data}
            title="State"
            label="Select a state"
            value={this.props.state}
            text={
              this.props.state ?
              getStateName(this.props.state) :
              "Not Selected"
            }
            onSelect={item => {
              this.props.editListBuilderField({prop: "state", value: item})
            }}
            hasBorder
          />

        </Card>
      )
    }

    return <Wrapper />

  }
}


export default ZipInput;
