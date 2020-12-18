import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  /*common functions */
  focusNextField,
  getStateName
} from 'app/NativeActions';

class AddOwnerFields extends Component{

  render(){
    //get state name Array
    var state_data = [];
    for(var i = 0; i<this.props.states.length; i++){
      state_data.push({
        key: i,
        label: this.props.states[i].name,
        value: this.props.states[i].abbr,
      });
    }

    return (
      <Wrapper>


        <Card>
          <Input
            ref="address"
            name="address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Address"
            onChange={value => this.props.updateField({ prop: "address", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "address2")}
            value={this.props.fields.address}
            type="text"
          />
          <Input
            ref="address2"
            name="address2"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Address Line 2"
            onChange={value => this.props.updateField({ prop: "address2", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "city")}
            value={this.props.fields.address2}
            type="text"
          />
        </Card>
        <Card>
          <Input
            ref="city"
            name="city"
            returnKeyType="next"
            blurOnSubmit={true}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="City"
            onChange={value => this.props.updateField({ prop: "city", value })}
            onSubmitEditing={()=>{}}
            value={this.props.fields.city}
            type="text"
          />
          <Select
            item_ref={"owner_state"}
            items={state_data}
            title="State"
            label="Select a state"
            value={this.props.fields.state}
            text={
              this.props.fields.state ?
              getStateName(this.props.fields.state) :
              "Not Selected"
            }
            onSelect={item => {
              this.props.updateField({prop: "state", value: item})
            }}
            hasBorder
          />

          <Input
            ref="zip"
            name="zip"
            blurOnSubmit={true}
            autoCapitalize="none"
            returnKeyType={"done"}
            keyboardType="numeric"
            placeholder="Zip Code"
            maxLength={5}
            onChange={value => this.props.updateField({ prop: "zip", value: value })}
            onSubmitEditing={()=>this.props.saveInfo()}
            value={this.props.fields.zip}
            type="number"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default AddOwnerFields;
