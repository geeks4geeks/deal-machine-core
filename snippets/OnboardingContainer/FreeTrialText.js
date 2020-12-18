import React, { Component } from "react";

import { Wrapper, Title, Copy } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";
import Media from './Media';

import {
  openUrl
} from 'app/NativeActions';

class FreeTrialText extends Component {

  constructor(props){
    super(props);
  }


  render() {

    if(this.props.plan_module_info.canceled != 1 &&
      this.props.card_info.bad_card == 0 &&
      this.props.plan_module_info.approved_to_charge == 0 &&
      this.props.plan_module_info.is_trial_over == true &&
      this.props.user.team_clearance_level > 1 &&
      this.props.platform !== "ios"
    ){
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
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.salesTitle}</Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.salesText}</Copy>
          </Wrapper>
          <PillButton primary={true} style={{margin: 0}} onPress={()=>{
            openUrl(this.props.onboarding_info.salesButtonLink)
          }}>
            {this.props.onboarding_info.salesButtonText}
          </PillButton>
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default FreeTrialText;
