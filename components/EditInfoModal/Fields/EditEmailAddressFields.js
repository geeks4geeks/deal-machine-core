import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';
import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class EditEmailAddressFields extends Component{

  render(){
    //get state name Array

    return (
      <Wrapper>

        <Card>
          <Input
            ref={"email_address"}
            name={"email_address"}
            placeholder={"Email Address"}
            keyboardType="email-address"
            onChange={value => this.props.updateField({ prop: "email_address", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "email_label")}
            value={this.props.fields.email_address}
            type="text"
          />
          <Input
            ref="email_label"
            name="email_label"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Description"
            onChange={value => this.props.updateField({ prop: "email_label", value })}
            onSubmitEditing={()=>this.props.saveInfo()}
            value={this.props.fields.email_label}
            type="text"
          />

        </Card>

      </Wrapper>
    );
  }

}

export default EditEmailAddressFields;
