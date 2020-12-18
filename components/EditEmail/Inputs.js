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
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="email-address"
            placeholder="Email Address"
            onChange={value => this.props.updateUserFieldChange({ prop: "email", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "password")}
            value={this.props.editUser.email}
            type="text"
          />
          <Input
            ref="password"
            name="password"
            returnKeyType={"done"}
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Password"
            secureTextEntry
            onChange={value => this.props.updateUserFieldChange({ prop: "password", value })}
            onSubmitEditing={()=>this.props.saveEmail()}
            value={this.props.editUser.password}
            type="password"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
