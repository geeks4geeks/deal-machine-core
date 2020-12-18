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

  renderLearnMoreButton(){
    if(this.props.onboarding_info.learnMoreButtonText && this.props.onboarding_info.learnMoreButtonLink){
      return(
        <Wrapper style={{paddingTop: 10}}>
          <Button
          onPress={()=>{
            openUrl(this.props.onboarding_info.learnMoreButtonLink)
          }}>
            <Copy>{this.props.onboarding_info.learnMoreButtonText}</Copy>
          </Button>
        </Wrapper>
      )
    }
  }


  render() {
    if((
      this.props.plan_module_info.canceled != 1 &&
      this.props.plan_module_info.paused != 1 &&
      this.props.card_info.bad_card != 1 &&
      (this.props.plan_module_info.team_has_module == false || this.props.plan_module_info.tier < this.props.require_tier) &&
      (
        this.props.plan_module_info.approved_to_charge == 1 || this.props.plan_module_info.approved_to_charge == null ||
      this.props.plan_module_info.is_trial_over == false || this.props.plan_module_info.is_trial_over == null
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
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.onboardingTitle}</Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.onboardingText}</Copy>
          </Wrapper>
          <PillButton primary={true} style={{margin: 0}} onPress={()=>{
            this.props.setFeatureModal({
              slug: this.props.slug,
              require_tier: this.props.require_tier ? this.props.require_tier : 1
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
          }}>
            {this.props.onboarding_info.onboardingButtonText}
          </PillButton>
          {this.renderLearnMoreButton()}
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default OnboardingText;
