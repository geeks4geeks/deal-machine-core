import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  Input
} from 'app/NativeComponents/common';
import {
  CardLabel,
  Select
} from 'app/NativeComponents/snippets';

import {
  /*common functions */
  focusNextField,
  getStateName
} from 'app/NativeActions';

class ReturnAddress extends Component{


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

    return(
      <Wrapper>
        <Card>
          <CardLabel
            title={"Return Address:"}
            icon={"mail"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
            <Input
              ref="address"
              name="address"
              returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="Address"
              onChange={value => this.props.signatureFieldChanged({ prop: "address", value })}
              onSubmitEditing={()=>focusNextField(this.refs, "address2")}
              value={this.props.editSignature.address ? this.props.editSignature.address : ""}

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
              onChange={value => this.props.signatureFieldChanged({ prop: "address2", value })}
              onSubmitEditing={()=>focusNextField(this.refs, "city")}
              value={this.props.editSignature.address2 ? this.props.editSignature.address2 : ""}

              type="text"
            />
            <Input
              ref="city"
              name="city"
              returnKeyType="next"
              blurOnSubmit={true}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="City"
              onChange={value => this.props.signatureFieldChanged({ prop: "city", value })}
              onSubmitEditing={()=>{}}
              value={this.props.editSignature.city ? this.props.editSignature.city : ""}
              type="text"
            />
            <Select
              item_ref={"state"}
              items={state_data}
              title="State"
              label="Select a state"
              value={this.props.editSignature.state}
              text={
                this.props.editSignature.state ?
                getStateName(this.props.editSignature.state) :
                "Not Selected"
              }
              onSelect={item => {
                this.props.signatureFieldChanged({prop: "state", value: item})
              }}
            />

            <Input
              ref="zipcode"
              name="zipcode"
              blurOnSubmit={true}
              autoCapitalize="none"
              returnKeyType={"done"}
              keyboardType="numeric"
              placeholder="Zip Code"
              maxLength={5}
              onChange={value => this.props.signatureFieldChanged({ prop: "zip", value: value })}
              value={this.props.editSignature.zip ? this.props.editSignature.zip : ""}
              type="number"
              onSubmitEditing={()=>{}}

            />

        </Card>


      </Wrapper>
    );

    return <Wrapper />
  }
}

export default ReturnAddress;
