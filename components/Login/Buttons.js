import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, Button, CardBody, Copy } from 'app/NativeComponents/common';
import { TextButton } from 'app/NativeComponents/snippets';

import {
  displayIntercom
} from 'app/NativeActions';

class Buttons extends Component{

  renderChatButton(){
    if(this.props.platform == "ios"){
      return(
        <Button onPress={()=>displayIntercom()} id="intercom_button">
          <CardBody style={{
            paddingTop: 0
          }}>
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Copy style={{
                textAlign: "center"
              }}>Need help? Chat with us.</Copy>
            </Wrapper>
          </CardBody>
        </Button>
      );
    }
  }

  render(){
    return (
      <Wrapper>
        <Card>
          <PrimaryButton
            formButton
            onPress={()=>this.props.login()}
          >
            Login
          </PrimaryButton>
        </Card>
        <TextButton
        sty
          to="/forgot-password"
          onPress={()=>this.props.appRedirect({redirect: "forgotPassword"})}
          text="Forgot Password?"
        />
        {this.renderChatButton()}
      </Wrapper>
    );

  }

}

export default Buttons;
