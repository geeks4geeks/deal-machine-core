import React, { Component } from 'react';
import { Scroll, Card, CardBody, Copy, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class Inputs extends Component{


  render(){

    return (
      <Card>
        <Input
          ref="email"
          name="email"
          returnKeyType="done"
          blurOnSubmit={true}
          autoCapitalize="none"
          autoFocus
          blurOnSubmit={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          onChange={value => this.props.teamFieldChanged({ prop: "invite_email", value })}
          onSubmitEditing={()=>this.props.requestTeam()}
          value={this.props.invite_email ? this.props.invite_email : ""}
          type="text"
        />
      </Card>
    );
  }

}

export default Inputs;
