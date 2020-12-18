import React, { Component } from 'react';
import { Wrapper, Card } from 'app/NativeComponents/common';
import { MenuButton } from 'app/NativeComponents/snippets';

import StepBody from './StepBody';
import RemoveButton from './RemoveButton';

class CampaignStep extends Component{

  renderStepTitle(step){
    var title = step.template_title;
    if(step.template_id > 0 && step.template_id){
      if(step.index != 1){
        if(step.send_after > 0){
          if(step.send_after == 1){
            title += " - Send after 1 day";
          }else{
            title += " - Send after "+step.send_after+" days";
          }
        }
      }

      if(step.resend_switch == "on"){
        title += " - Repeat every";
        if(step.resend_freq == 1){
          title += " day";
        }else{
          title += " "+step.resend_freq+" days";
        }

        if(step.resend_limit == 1){
          title += "; 1 time";
        }else{
          title += "; "+step.resend_limit+" times";
        }
      }
    }else{
      title = "No template selected";
    }

    return title;
  }

  render(){

    return (
      <Wrapper>
        <Card>
          <MenuButton
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid",
              backgroundColor: this.props.editCampaign.current_step != this.props.step.index ? this.props.colors.background_color : "transparent"

            }}
            onPress={()=>this.props.campaignFieldChanged({prop: "current_step", value: this.props.editCampaign.current_step == this.props.step.index ? null : this.props.step.index})}
            title={"Step "+this.props.step.index+":"}
            text={this.props.editCampaign.current_step != this.props.step.index ? this.renderStepTitle(this.props.step) : ""}
            icon={this.props.editCampaign.steps.length > 0 ? this.props.editCampaign.current_step == this.props.step.index ? "keyboard-arrow-up" : "keyboard-arrow-down" : ""}
          />
          <StepBody {...this.props}/>


        </Card>
        <RemoveButton {...this.props} />
      </Wrapper>
    )
  }
}

export default CampaignStep;
