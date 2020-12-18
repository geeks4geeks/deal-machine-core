import React, { Component } from 'react';
import { Wrapper, Card, Input } from 'app/NativeComponents/common';

import {
  /*common functions */
  focusNextField
} from 'app/NativeActions';

class Inputs extends Component{

  renderCompany(){
    if(this.props.user_info.signup_type != "team_invite" && !this.props.dealfinder){
      return(
        <Wrapper>
          <Input
            ref="company"
            name="company"
            icon="domain"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Company"
            onChange={value => this.props.authFieldChanged({ prop: "company", value })}
            value={this.props.company}
            type="text"
          />

        </Wrapper>
      );
    }else if(this.props.dealfinder){
      return(
        <Wrapper>
          <Input
            ref="city"
            name="city"
            icon="business"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Your City"
            onChange={value => this.props.authFieldChanged({ prop: "city", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "phone")}
            value={this.props.city ? this.props.city : ""}
            type="text"
          />
        </Wrapper>
      );
    }
  }

  renderPromo(){
    if(this.props.user_info.signup_type != "team_invite" && !this.props.dealfinder && !this.props.affiliate_partner){

      if(this.props.no_container){

        return (
          <Input
            ref="promo"
            name="promo"
            icon="blank"
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="characters"
            keyboardType="default"
            placeholder="Promo Code"
            onChange={value => this.props.handleChange(value)}
            onSubmitEditing={()=>this.props.register()}
            value={
              this.props.defaultPromoText && this.props.promoText == "" ? this.props.defaultPromoText : this.props.promoText}
            type="text"
            className="uppercase"
            autoComplete="off"
          />
        )
      }


    }
  }


  render(){
    if(this.props.no_container){
      return(
        <Wrapper>
          <Input
            ref="firstname"
            name="firstname"
            icon="account-circle"
            autoCompleteType={"name"}

            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="First Name"
            onChange={value => this.props.authFieldChanged({ prop: "firstname", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "lastname")}
            value={this.props.firstname}
            type="text"
            autoFocus={true}
          />
          <Input
            ref="lastname"
            name="lastname"
            autoCompleteType={"name"}

            icon="blank"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Last Name"
            onChange={value => this.props.authFieldChanged({ prop: "lastname", value })}
            onSubmitEditing={
              this.props.user_info.signup_type == "team_invite" ?
              ()=>focusNextField(this.refs, "password") :
              ()=>focusNextField(this.refs, "company")
            }
            value={this.props.lastname}
            type="text"
          />
          {this.renderCompany()}
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
            editable={this.props.user_info.signup_type == "team_invite" ? false : true}
            onChange={value => this.props.authFieldChanged({ prop: "email", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "email")}
            value={this.props.email && this.props.email != "" ? this.props.email : this.props.user_info.email}
            type="text"
          />
          <Input
            ref="phone"
            name="phone"
            icon="phone"
            autoCompleteType={"tel"}

            mask_type={'cel-phone'}
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Phone Number"
            onChange={value => this.props.authFieldChanged({ prop: "phone", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "password")}
            value={this.props.phone ? this.props.phone : ""}
            type="text"
            mask={"(999) 999-9999"}
          />
          <Input
            ref="password"
            name="password"
            autoCompleteType={"password"}

            icon="lock"
            returnKeyType={this.props.user_info.signup_type == "team_invite" ? "done" : "next"}
            blurOnSubmit={this.props.user_info.signup_type == "team_invite" ? true : false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Password"
            secureTextEntry
            onChange={value => this.props.authFieldChanged({ prop: "password", value })}
            onSubmitEditing={
              this.props.user_info.signup_type == "team_invite" ?
              ()=>this.props.register() :
              ()=>focusNextField(this.refs, "promo")
            }
            value={this.props.password}
            type="password"
          />
          {this.renderPromo()}
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        <Card>
          <Input
            ref="firstname"
            name="firstname"
            autoCompleteType={"name"}

            icon="account-circle"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="First Name"
            onChange={value => this.props.authFieldChanged({ prop: "firstname", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "lastname")}
            value={this.props.firstname}
            type="text"
          />
          <Input
            ref="lastname"
            name="lastname"
            autoCompleteType={"name"}

            icon="blank"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Last Name"
            onChange={value => this.props.authFieldChanged({ prop: "lastname", value })}
            onSubmitEditing={
              this.props.user_info.signup_type == "team_invite" ?
              ()=>focusNextField(this.refs, "password") :
              ()=>focusNextField(this.refs, "company")
            }
            value={this.props.lastname}
            type="text"
          />
          {this.renderCompany()}


        </Card>
        <Card>



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
            editable={this.props.user_info.signup_type == "team_invite" ? false : true}
            onChange={value => this.props.authFieldChanged({ prop: "email", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "phone")}
            value={this.props.email && this.props.email != "" ? this.props.email : this.props.user_info.email}
            type="text"
          />
          <Input
            ref="phone"
            name="phone"
            icon="phone"
            autoCompleteType={"tel"}

            mask_type={'cel-phone'}
            returnKeyType="done"
            blurOnSubmit={true}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Phone Number"
            onChange={value => this.props.authFieldChanged({ prop: "phone", value })}
            onSubmitEditing={()=>focusNextField(this.refs, "password")}
            value={this.props.phone ? this.props.phone : ""}
            type="text"
            mask={"(999) 999-9999"}
          />
          <Input
            ref="password"
            name="password"
            autoCompleteType={"password"}

            icon="lock"
            returnKeyType={this.props.user_info.signup_type == "team_invite" ? "done" : "next"}
            blurOnSubmit={this.props.user_info.signup_type == "team_invite" ? true : false}
            autoCapitalize="words"
            keyboardType="default"
            placeholder="Password"
            secureTextEntry
            onChange={value => this.props.authFieldChanged({ prop: "password", value })}
            onSubmitEditing={
              this.props.user_info.signup_type == "team_invite" ?
              ()=>this.props.register() :
              ()=>focusNextField(this.refs, "promo")
            }
            value={this.props.password}
            type="password"
          />
        </Card>

        {this.renderPromo()}
      </Wrapper>
    );
  }

}

export default Inputs;
