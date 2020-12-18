import React, { Component } from 'react';
import { Wrapper, InternalImage, CardBody, Title, Copy } from 'app/NativeComponents/common';

class OnboardingText extends Component{

  render(){
    if(this.props.onboarding){
      return(
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            paddingBottom:0,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <InternalImage
              style={{
                resizeMode: "contain",
                width: 200,
                height: this.props.device == "desktop" ? 150 : 150
              }}
              source={this.props.device == "mobile" ? require("app/assets/images/RepeatingMail.png") : null}
              image={this.props.device == "desktop" ? "/assets/images/RepeatingMail.svg" : ""}

            />
          </Wrapper>
          <CardBody>
            <Title>What is Repeating Mail?</Title>
            <Copy>
              Repeating mail automatically sends follow up mailers to the property owner. We recommend sending every 21 days.
            </Copy>
          </CardBody>
        </Wrapper>
      );
    }

    return <Wrapper />
  }
}

export default OnboardingText;
