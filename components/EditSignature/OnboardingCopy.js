import React, { Component } from 'react';
import { Wrapper, InternalImage, CardBody, Copy } from 'app/NativeComponents/common';

class OnboardingCopy extends Component{

  render(){
    if(this.props.onboarding){
      return (
        <Wrapper>
          <Wrapper style={{
            padding: 20,
            paddingBottom: 0,
            alignItems: "center",
            justifyContent: "center"
          }}>
            <InternalImage
              style={{
                resizeMode: "contain",
                width: 200,
                height: this.props.device == "desktop" ? 150 : 150
              }}
              source={this.props.device == "mobile" ? require("app/assets/images/PostcardSig.png") : null}
              image={this.props.device == "desktop" ? "/assets/images/PostcardSig.svg" : ""}

            />
          </Wrapper>
          <CardBody>
            <Copy>
              Set up a signature for your outgoing mail. Add your return address. Provide a phone number, email, and website to give owners a way to contact you.
            </Copy>
          </CardBody>
        </Wrapper>
      );
    }

    return <Wrapper />
  }
}

export default OnboardingCopy;
