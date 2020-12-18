import React, { Component } from 'react';
import { Wrapper, Input } from 'app/NativeComponents/common';

class CustomText extends Component{



  render(){

    return (
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
    );

  }
}

export default CustomText;
