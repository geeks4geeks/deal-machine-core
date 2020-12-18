import React, { Component } from 'react';
import {
  Wrapper,
  CenterLeft,
  Title,
  Copy,
  Split,
  Stretch,
  Input,
  CardBody,
  Bold
} from 'app/NativeComponents/common';

class RepeatLimitNumber extends Component{

  render(){
    if(this.props.select_default_sending_options){
      if(this.props.editUser.default_resend_limit_switch == "off"){
        return(
          <Wrapper>
            <Split>
              <Stretch>
                <CenterLeft style={{paddingLeft: 20}}>
                  <Title>Total mailers to send:</Title>
                </CenterLeft>
              </Stretch>
              <Stretch>

                <Input
                  last={true}
                  ref="resend_limit"
                  name="resend_limit"
                  blurOnSubmit={true}
                  autoCapitalize="none"
                  returnKeyType={"default"}
                  keyboardType="numeric"
                  type="number"
                  placeholder="Mailer(s)"
                  onChange={value => {
                    this.props.updateUserFieldChange({ prop: "default_resend_limit", value: value })
                  }}
                  value={this.props.editUser.default_resend_limit ? this.props.editUser.default_resend_limit.toString() : ""}
                  type="number"
                />

              </Stretch>
            </Split>

          </Wrapper>
        );
      }
    }

    if(this.props.editHouse.resend_limit_switch == "off"){
      return(
        <Wrapper>
          <Split>
            <Stretch>
              <CenterLeft style={{paddingLeft: 20}}>
                <Title>Total mailers to send:</Title>
              </CenterLeft>
            </Stretch>
            <Stretch>

              <Input
                last={true}
                ref="resend_limit"
                name="resend_limit"
                blurOnSubmit={true}
                autoCapitalize="none"
                returnKeyType={"default"}
                keyboardType="numeric"
                placeholder="Mailer(s)"
                onChange={value => {
                  this.props.editHouseFieldChange({ prop: "resend_limit", value: value })
                }}
                value={this.props.editHouse.resend_limit ? this.props.editHouse.resend_limit.toString() : ""}
                type="number"
              />

            </Stretch>
          </Split>
    
        </Wrapper>
      );
    }

    return <Wrapper />
  }

}

export default RepeatLimitNumber;
