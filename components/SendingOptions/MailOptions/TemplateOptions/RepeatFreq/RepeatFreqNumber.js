import React, { Component } from 'react';
import {
  Wrapper,
  CenterLeft,
  Title,
  Copy,
  Split,
  Stretch,
  Input
} from 'app/NativeComponents/common';

class RepeatFreqNumber extends Component{

  render(){
    if(this.props.select_default_sending_options){
      if(this.props.editUser.default_resend_freq_switch == "on"){
        return(
          <Split>
            <Stretch>
              <CenterLeft style={{paddingLeft: 20}}>
                <Title>Repeat Every:</Title>
              </CenterLeft>
            </Stretch>
            <Stretch>

              <Input
                last={true}
                ref="resend_freq"
                name="resend_freq"
                blurOnSubmit={true}
                autoCapitalize="none"
                returnKeyType={"default"}
                keyboardType="numeric"
                type="number"
                placeholder="Day(s)"
                onChange={value => {
                  this.props.updateUserFieldChange({ prop: "default_resend_freq", value: value })
                }}
                value={this.props.editUser.default_resend_freq ? this.props.editUser.default_resend_freq.toString() : ""}
                type="number"

              />

            </Stretch>
          </Split>
        );
      }
    }else {
      if(this.props.editHouse.resend_freq_switch == "on"){
        return(
          <Split>
            <Stretch>
              <CenterLeft style={{paddingLeft: 20}}>
                <Title>Repeat Every:</Title>
              </CenterLeft>
            </Stretch>
            <Stretch>

              <Input
                last={true}
                ref="resend_freq"
                name="resend_freq"
                blurOnSubmit={true}
                autoCapitalize="none"
                returnKeyType={"default"}
                keyboardType="numeric"
                placeholder="Day(s)"
                onChange={value => {
                  this.props.editHouseFieldChange({ prop: "resend_freq", value: value })
                }}
                value={this.props.editHouse.resend_freq ? this.props.editHouse.resend_freq.toString() : ""}
                type="number"
              />

            </Stretch>
          </Split>
        );
      }
    }

    return <Wrapper />
  }

}

export default RepeatFreqNumber;
