import React, { Component } from "react";

import { Wrapper, Title, Copy, Button } from "app/NativeComponents/common";
import { PillButton } from "app/NativeComponents/snippets";
import Media from './Media';

import {
  openUrl
} from 'app/NativeActions';

class IOSText extends Component {

  constructor(props){
    super(props);
  }


  render() {
    if(this.props.platform === "ios"){
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
            <Title style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.iosTitle}</Title>
            <Copy style={{textAlign: this.props.isCard ? "left" : "center"}}>{this.props.onboarding_info.iosText}</Copy>
          </Wrapper>

        </Wrapper>
      )
    }

    return <Wrapper />

  }
}
export default IOSText;
