import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  Input
} from 'app/NativeComponents/common';
import {
  CardLabel
} from 'app/NativeComponents/snippets';

class ContactInfo extends Component{


  render(){
    return(
      <Wrapper>
        <Card>
          <CardLabel
            title={"Contact Information:"}
            icon={"info"}
            hasButton={false}
            onPress={()=>{}}
            hasBorder={true}
          />
          <Input
            ref="phone"
            name="phone"
            mask_type={'cel-phone'}
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Phone Number"
            onChange={value => this.props.signatureFieldChanged({ prop: "phone", value })}
            value={this.props.editSignature.phone ? this.props.editSignature.phone : ""}
            type="text"
            mask={"(999) 999-9999"}
            onSubmitEditing={()=>{}}
          />
          <Input
            ref="email"
            name="email"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            onChange={value => this.props.signatureFieldChanged({ prop: "email", value })}
            onSubmitEditing={()=>{}}
            value={this.props.editSignature.email ? this.props.editSignature.email : ""}
            type="text"
          />
          <Input
            ref="other_contact"
            name="other_contact"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="default"
            placeholder="Website URL (Optional)"
            onChange={value => this.props.signatureFieldChanged({ prop: "other_contact", value })}
            onSubmitEditing={()=>{}}
            value={this.props.editSignature.other_contact ? this.props.editSignature.other_contact : ""}
            type="text"
          />
        </Card>


      </Wrapper>
    );

    return <Wrapper />
  }
}

export default ContactInfo;
