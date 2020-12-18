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

class ResendFreq extends Component{

  render(){
    if(this.props.step.resend_switch == "on"){
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
                if(this.props.step.index == 1){
                  this.props.campaignFieldChanged({ prop: "resend_freq", value: value })
                }else{
                  //edit campaign step other thatn 1
                  this.props.editCampaignStep({
                    id: this.props.step.id,
                    index: this.props.step.index,
                    prop: "resend_freq",
                    value: value
                  });
                }
              }}
              value={this.props.step.resend_freq ? this.props.step.resend_freq.toString() : ""}
              type="number"
            />

          </Stretch>
        </Split>
      );
    }

    return <Wrapper />
  }

}

export default ResendFreq;
