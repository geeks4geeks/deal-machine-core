import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

import ProfileImage from './ProfileImage';

class Inputs extends Component{

  renderCompany(){
    if(this.props.user.team_owner == 1){
      return (

        <Card>
          <Input
            ref="company"
            name="company"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Company"
            onChange={value => this.props.updateUserFieldChange({ prop: "company", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "phone")}
            value={this.props.editUser.company ? this.props.editUser.company : ""}
            type="text"
          />
        </Card>
      );
    }
  }
  render(){

    return (
      <Wrapper>
        <ProfileImage {...this.props}/>
        <Card>
          <Input
            ref="firstname"
            name="firstname"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="First Name"
            onChange={value => this.props.updateUserFieldChange({ prop: "firstname", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "lastname")}
            value={this.props.editUser.firstname}
            type="text"
          />
          <Input
            ref="lastname"
            name="lastname"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Last Name"
            onChange={value => this.props.updateUserFieldChange({ prop: "lastname", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "username")}
            value={this.props.editUser.lastname}
            type="text"
          />
          <Input
            ref="username"
            name="username"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Username"
            onChange={value => this.props.updateUserFieldChange({ prop: "username", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "phone")}
            value={this.props.editUser.username}
            type="text"
          />
          <Input
            ref="phone"
            name="phone"
            mask_type={'cel-phone'}
            returnKeyType={this.props.user.team_owner == 1 ? "next" : "done"}
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Phone Number"
            onChange={value => this.props.updateUserFieldChange({ prop: "user_phone", value })}
            onSubmitEditing={this.props.user.team_owner == 1 ? ()=>focusNextField(this.refs, "company") : ()=>this.props.saveUserInfo()}
            value={this.props.editUser.user_phone}
            type="text"
            mask={"(999) 999-9999"}
          />
        </Card>
        {this.renderCompany()}
      </Wrapper>
    );
  }

}

export default Inputs;
