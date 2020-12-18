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

class SendAfter extends Component{

  render(){
    if(this.props.step.template_id && this.props.step.template_id != 0 && this.props.step.index != 1){
      return(
        <Split>
          <Stretch>
            <CenterLeft style={{paddingLeft: 20}}>
              <Title>Send Mailer After:</Title>
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
                  //edit campaign step other than 1
                  this.props.editCampaignStep({
                    id: this.props.step.id,
                    index: this.props.step.index,
                    prop: "send_after",
                    value: value
                  });
              }}
              value={this.props.step.send_after ? this.props.step.send_after.toString() : ""}
              type="number"
            />

          </Stretch>
        </Split>
      );
    }

    return <Wrapper />
  }

}

export default SendAfter;
