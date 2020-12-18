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

class ResendLimit extends Component{

  render(){

    if(this.props.step.resend_switch == "on"){
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
                  if(this.props.step.index == 1){

                    this.props.campaignFieldChanged({ prop: "resend_limit", value: value })
                  }else{
                    //edit campaign step other than one
                    this.props.editCampaignStep({
                      id: this.props.step.id,
                      index: this.props.step.index,
                      prop: "resend_limit",
                      value: value
                    });
                  }
                }}
                value={this.props.step.resend_limit ? this.props.step.resend_limit.toString() : ""}
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

export default ResendLimit;
