import React, { Component } from 'react';
import {
  Wrapper,
  CenterLeft,
  Title,
  Split,
  Stretch,
  Input
} from 'app/NativeComponents/common';

class RepeatFreqNumber extends Component{

  render(){
      if(this.props.fields.resend_freq_switch === "on"){
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
                  this.props.updateField({ prop: "resend_freq", value: value })
                }}
                value={this.props.fields.resend_freq ? this.props.fields.resend_freq.toString() : ""}
                type="number"

              />

            </Stretch>
          </Split>
        );
      }

      return <Wrapper />

    }
}

export default RepeatFreqNumber;
