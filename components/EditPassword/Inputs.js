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
            ref="new_password"
            name="new_password"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="New Password"
            secureTextEntry

            onChange={value => this.props.updateUserFieldChange({ prop: "new_password", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "new_password_confirm")}
            value={this.props.editUser.new_password}
            type="password"
          />
          <Input
            ref="new_password_confirm"
            name="new_password_confirm"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Confirm New Password"
            secureTextEntry

            onChange={value => this.props.updateUserFieldChange({ prop: "new_password_confirm", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "password")}
            value={this.props.editUser.new_password_confirm}
            type="password"
          />
        </Card>
        <Card>

          <Input
            ref="password"
            name="password"
            returnKeyType={"done"}
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Current Password"
            secureTextEntry

            onChange={value => this.props.updateUserFieldChange({ prop: "password", value })}
            onSubmitEditing={()=>this.props.savePassword()}
            value={this.props.editUser.password}
            type="password"
          />
        </Card>
      </Wrapper>
    );
  }

}

export default Inputs;
