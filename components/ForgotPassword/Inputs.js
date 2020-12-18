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
            ref="email"
            name="email"
            icon="email"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            onChange={value => this.props.authFieldChanged({ prop: "email", value })}
            onSubmitEditing={()=>this.props.forgot()}
            value={this.props.email}
            type="text"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
