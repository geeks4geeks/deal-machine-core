import React, { Component } from 'react';
import { Wrapper } from 'app/NativeComponents/common';
import { ToggleSwitch } from 'app/NativeComponents/snippets';

import ResendFreq from './ResendFreq';
import ResendLimit from './ResendLimit';

class RepeatStepOptions extends Component{

  render(){


    if(this.props.step.template_id && this.props.step.template_id != 0){
      return (
        <Wrapper>

          <ToggleSwitch
            onChange={value => {
              if(this.props.step.index == 1){
                this.props.campaignFieldChanged({ prop: "resend_switch", value: value == true ? "on" : "off" })
                this.props.campaignFieldChanged({ prop: "resend_freq", value: value == true ? 21 : 0 });
                this.props.campaignFieldChanged({ prop: "resend_limit", value: value == true ? 3 : 0 });
              }else{
                //edit campaign step other thatn 1
                this.props.editCampaignStep({
                  id: this.props.step.id,
                  index: this.props.step.index,
                  prop: "resend_switch",
                  value: value == true ? "on" : "off"
                });
                this.props.editCampaignStep({
                  id: this.props.step.id,
                  index: this.props.step.index,
                  prop: "resend_freq",
                  value: value == true ? 21 : 0
                });
                this.props.editCampaignStep({
                  id: this.props.step.id,
                  index: this.props.step.index,
                  prop: "resend_limit",
                  value: value == true ? 3 : 0
                });
              }

            }}
            value={this.props.step.resend_switch == "on" ? true : false}
            title={"Repeat Step?"}
            text={"This will resend this mailer based on the selected values."}
          />

          <ResendFreq {...this.props}/>
          <ResendLimit {...this.props}/>

        </Wrapper>
      )
    }


    return <Wrapper />
  }
}

export default RepeatStepOptions;
