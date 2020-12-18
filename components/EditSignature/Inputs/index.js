import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  CardBody,
  Copy,
  Input
} from 'app/NativeComponents/common';

import SelectUser from './SelectUser';
import ContactInfo from './ContactInfo';
import ReturnAddress from './ReturnAddress';
import Disclaimer from './Disclaimer';

class Inputs extends Component{


  render(){
    return(
      <Wrapper>
        <Card>
          <Input
            ref="title"
            name="title"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Label"
            onChange={value => this.props.signatureFieldChanged({ prop: "title", value })}
            value={this.props.editSignature.title}
          />


        </Card>
        <Card>
          <Input
            ref="signature_text"
            name="signature_text"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Signature Sign Off"
            onChange={value => this.props.signatureFieldChanged({ prop: "signature_text", value })}
            value={this.props.editSignature.signature_text}
          />
          <Input
            ref="signature_name"
            name="signature_name"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Signature Name"
            onChange={value => this.props.signatureFieldChanged({ prop: "signature_other_name", value })}
            value={this.props.editSignature.signature_other_name ? this.props.editSignature.signature_other_name : ""}
          />
        </Card>
  
        <SelectUser {...this.props}/>
        <ContactInfo {...this.props}/>
        <ReturnAddress {...this.props}/>
        <Disclaimer {...this.props}/>

      </Wrapper>
    );

    return <Wrapper />
  }
}

export default Inputs;
