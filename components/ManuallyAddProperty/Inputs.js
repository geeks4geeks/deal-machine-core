import React, { Component } from 'react';
import { Wrapper, Card, Input, Row, Spin, Copy, Bold, Button } from 'app/NativeComponents/common';
import { Select } from 'app/NativeComponents/snippets';

import {
  /*common functions */
  focusNextField,
  getStateName
} from 'app/NativeActions';

class Inputs extends Component{


  renderAutoComplete(){
    if(this.props.autocomplete_loading){
      return(
        <Wrapper style={{
          borderTopWidth: 1,
        borderTopColor: this.props.colors.border_color,
        borderTopStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid",
        backgroundColor: this.props.colors.background_color, padding:20, paddingTop: 10, paddingBottom: 10}}>
          <Row>
            <Spin size="small" /><Copy style={{marginLeft:10}}>Loading Suggestions...</Copy>
          </Row>
        </Wrapper>
      )
    }else if(this.props.autocomplete_items.length > 0 && this.props.address.length > 3){
      return(
        <Wrapper style={{backgroundColor: this.props.colors.background_color,
        borderTopWidth: 1,
        borderTopColor: this.props.colors.border_color,
        borderTopStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: this.props.colors.border_color,
        borderBottomStyle: "solid"
      }}>
          <Wrapper style={{padding:20, paddingTop: 10, paddingBottom: 10}}>
            <Copy><Bold>Suggestions:</Bold></Copy>
          </Wrapper>
          {this.props.autocomplete_items.map((item, i)=>{
            return(
              <Button key={i} style={{padding:20, paddingTop: 10, paddingBottom: 10}} onPress={()=>{

                this.props.setAddressFields({
                  address: item.property_address,
                  address2: item.property_address2,
                  city: item.property_address_city,
                  state: item.property_address_state,
                  zip: item.property_address_zip,

                })
                this.props.clearAutocomplete();
              }}>
                <Copy>
                  {item.property_address_full}
                </Copy>
              </Button>
            )
          })}
        </Wrapper>
      )
    }
  }

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
          <Wrapper>
            <Input
              ref="address"
              name="address"
              returnKeyType="next"
              blurOnSubmit={false}
              autoCapitalize="words"
              keyboardType="default"
              placeholder="Address"
              onChange={value => {
                this.props.triggerAutocomplete(value);
                this.props.updateAddressState({ prop: "address", value })
              }}

              onSubmitEditing={()=>focusNextField(this.refs, "address2")}
              value={this.props.address}
              type="text"
            />
            {this.renderAutoComplete()}
          </Wrapper>
          <Input
            ref="address2"
            name="address2"
            returnKeyType="next"
            blurOnSubmit={false}
            onFocus={()=>this.props.clearAutocomplete()}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Address Line 2"
            onChange={value => this.props.updateAddressState({ prop: "address2", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "city")}
            value={this.props.address2}
            type="text"
          />
        </Card>
        <Card>
          <Input
            ref="city"
            name="city"
            returnKeyType="next"
            onFocus={()=>this.props.clearAutocomplete()}

            blurOnSubmit={true}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="City"
            onChange={value => this.props.updateAddressState({ prop: "city", value })}
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
              this.props.updateAddressState({prop: "state", value: item})
            }}
          />

          <Input
            ref="zip"
            name="zip"
            blurOnSubmit={true}
            autoCapitalize="none"
            onFocus={()=>this.props.clearAutocomplete()}

            returnKeyType={"done"}
            keyboardType="numeric"
            placeholder="Zip Code"
            maxLength={5}
            onChange={value => this.props.updateAddressState({ prop: "zip", value: value })}
            value={this.props.zip}
            onSubmitEditing={()=>this.props.addProperty()}

            type="number"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
