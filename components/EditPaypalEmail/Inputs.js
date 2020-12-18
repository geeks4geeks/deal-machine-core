import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class Inputs extends Component{


  render(){

    return (
      <Wrapper>
        <Card>
          <Input
            ref="paypal_email"
            name="paypal_email"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="email-address"
            placeholder="Paypal Email Address"
            onChange={value => this.props.updatePartnerFieldChange({ prop: "paypal_email", value })}
            value={this.props.editPartner.paypal_email}
            type="text"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
