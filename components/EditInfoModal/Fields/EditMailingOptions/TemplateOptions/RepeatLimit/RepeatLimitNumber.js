import React, { Component } from 'react';
import {
  Wrapper,
  CenterLeft,
  Title,
  Split,
  Stretch,
  Input,
} from 'app/NativeComponents/common';

class RepeatLimitNumber extends Component{

  render(){
    if(this.props.fields.resend_limit_switch === "off"){
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
                  this.props.updateField({ prop: "resend_limit", value: value })
                }}
                value={this.props.fields.resend_limit ? this.props.fields.resend_limit.toString() : ""}
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
