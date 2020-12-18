import React, { Component } from "react";

import { Wrapper, Title, Copy } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";
import Media from './Media';

class CanceledText extends Component {

  constructor(props){
    super(props);
  }


  render() {

    if(this.props.plan_module_info.canceled == 1 &&
    this.props.user.team_clearance_level > 1 &&
    this.props.platform !== "ios"){
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
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>
            {this.props.onboarding_info.canceledTitle}
            </Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.canceledText}</Copy>
          </Wrapper>
          <PillButton primary={true} style={{margin: 0}} onPress={()=>{
            this.props.setFeatureModal({
              slug: this.props.slug,
              require_tier: this.props.require_tier ? this.props.require_tier : 1
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
          }}>
            {this.props.onboarding_info.canceledButtonText}
          </PillButton>
        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default CanceledText;
