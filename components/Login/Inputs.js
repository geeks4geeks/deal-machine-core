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
        <Input
          ref="email"
          name="email"
          icon="email"
          autoCompleteType={"email"}
          returnKeyType="next"
          blurOnSubmit={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          onChange={value => this.props.authFieldChanged({ prop: "email", value })}
          onSubmitEditing={()=>focusNextField(this.refs, "password")}
          value={this.props.email}
          type="text"
          autoFocus={true}
        />
        <Input
          ref="password"
          name="password"
          icon="lock"
          returnKeyType={"done"}
          blurOnSubmit={false}
          autoCapitalize="words"
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChange={value => this.props.authFieldChanged({ prop: "password", value })}
          onSubmitEditing={()=>this.props.login()}
          value={this.props.password}
          type="password"
        />
      </Wrapper>
    );
  }

}

export default Inputs;
