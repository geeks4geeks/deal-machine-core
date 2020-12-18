import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  /*common functions */
  focusNextField,
  getStateName
} from 'app/NativeActions';

class BillingAddress extends Component{

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
            ref="name"
            name="name"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Name On Card"
            onChange={value => this.props.editAddressField({ prop: "name", value })}
            onSubmitEditing={()=>{}}
            value={this.props.address.name}
            type="text"
          />
        </Card>
        <Card>
          <Input
            ref="address"
            name="address"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Billing Address"
            onChange={value => this.props.editAddressField({ prop: "address", value })}
            onSubmitEditing={()=>{}}
            value={this.props.address.address}
            type="text"
          />
          <Input
            ref="address2"
            name="address2"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Billing Address Line 2"
            onChange={value => this.props.editAddressField({ prop: "address2", value })}
            onSubmitEditing={()=>{}}
            value={this.props.address.address2}
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
            placeholder="Billing Address City"
            onChange={value => this.props.editAddressField({ prop: "city", value })}
            onSubmitEditing={()=>{}}
            value={this.props.address.city}
            type="text"
          />
          <Select
            item_ref={"state"}
            items={state_data}
            title="Billing Address State"
            label="Select a state"
            value={this.props.address.state}
            text={
              this.props.address.state ?
              getStateName(this.props.address.state) :
              "Not Selected"
            }
            onSelect={item => {
              this.props.editAddressField({prop: "state", value: item})
            }}
          />

          <Input
            ref="zip"
            name="zip"
            blurOnSubmit={true}
            autoCapitalize="none"
            returnKeyType={"done"}
            keyboardType="numeric"
            placeholder="Billing Address Zip Code"
            maxLength={5}
            onChange={value => this.props.editAddressField({ prop: "zip", value: value })}
            onSubmitEditing={()=>{}}
            value={this.props.address.zip}
            type="number"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default BillingAddress;
