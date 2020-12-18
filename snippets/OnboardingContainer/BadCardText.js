import React, { Component } from "react";

import { Wrapper, Title, Copy } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";

import Media from './Media';

class BadCardText extends Component {

  constructor(props){
    super(props);
  }


  render() {

    if(this.props.plan_module_info.canceled != 1 &&
      this.props.card_info.bad_card == 1 &&
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
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.badCardTitle}</Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.badCardText}</Copy>
          </Wrapper>
          <PillButton primary={true} style={{margin: 0}} onPress={()=>{
            this.props.toggleOnboarding(true);
            this.props.appRedirect({redirect: "goForward", payload:{add: "update-card"}})
          }}>
            {this.props.onboarding_info.badCardButtonText}
          </PillButton>
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default BadCardText;
