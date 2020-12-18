import React, { Component } from 'react';
import {
  Wrapper,
  Card,
  MultiLineInput,
  CardBody,
  Copy
} from 'app/NativeComponents/common';

class Disclaimer extends Component{


  render(){
    return(
      <Wrapper>
        <CardBody>
          <Copy>
            If you're a realtor, you may be required to disclose your MLS identification on your mail. Feel free to include that here.
          </Copy>
        </CardBody>
        <Card>
          <MultiLineInput
            ref="disclaimer"
            name="disclaimer"
            autoCapitalize="sentences"
            blurOnSubmit={true}
            returnKeyType="done"
            keyboardType="default"
            placeholder={"Enter your disclosure here."}
            label={"Disclosure (Optional)"}
            onChange={value => this.props.signatureFieldChanged({ prop: "disclaimer", value })}
            value={this.props.editSignature.disclaimer ? this.props.editSignature.disclaimer : ""}
            type={"text"}
          />
        </Card>


      </Wrapper>
    );

    return <Wrapper />
  }
}

export default Disclaimer;
