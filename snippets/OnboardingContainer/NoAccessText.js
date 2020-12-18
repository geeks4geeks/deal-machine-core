import React, { Component } from "react";

import { Wrapper, Title, Copy, Button } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";
import Media from './Media';

import {
  openUrl
} from 'app/NativeActions';

class OnboardingText extends Component {

  constructor(props){
    super(props);
  }

  renderTalkButton(){
    if(this.props.user.team_clearance_level > 1 || this.props.user.team_owner == 1){
      return(
        <PillButton primary={true} style={{margin: 0}} onPress={()=>{
          openUrl(this.props.onboarding_info.noSeatButtonLink)
        }}>
          {this.props.onboarding_info.noSeatButtonText}
        </PillButton>
      )
    }
  }


  render() {
    if((
      this.props.plan_module_info.user_has_module == false && (
        this.props.user.team_clearance_level < 2 || (
          this.props.card_info.bad_card != 1 &&
          this.props.plan_module_info.canceled != 1 &&
          this.props.user.team_clearance_level > 1 &&
          (this.props.plan_module_info.approved_to_charge == 1 ||
          this.props.plan_module_info.is_trial_over == false)
        )
      ) &&
      this.props.platform !== "ios"
    )){
      return(
        <Wrapper style={{
          alignItems: this.props.isCard ? "flex-start" :"center",
          justifyContent: this.props.isCard ? "flex-start" : "center"}}
        >
          <Media {...this.props} />
          <Wrapper style={{
            paddingTop: 20,
            paddingBottom: 20,
            alignItems: this.props.isCard ? "flex-start" :"center",
            justifyContent: this.props.isCard ? "flex-start" : "center"
          }}>
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.noSeatTitle}</Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.noSeatText}</Copy>
          </Wrapper>
          {
            this.renderTalkButton()
          }
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default OnboardingText;
