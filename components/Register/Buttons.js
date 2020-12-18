import React, { Component } from 'react';
import { Wrapper, Card, PrimaryButton, Button, Copy, Bold } from 'app/NativeComponents/common';
import { TextButton, CheckBoxInput } from 'app/NativeComponents/snippets';

import {
  openUrl,
  displayIntercom
} from 'app/NativeActions';


class Buttons extends Component{

  renderTermsOfServiceText(){

    if(this.props.affiliate_partner){
      return(
        <Wrapper>
          <Copy style={{textAlign: "left"}}>By checking this box, you agree to our</Copy>
          <Button onPress={()=>{
            openUrl("https://dealmachine.com/affiliate-partner-terms-of-service")
          }}>
            <Copy style={{textAlign: "left", textDecorationLine: "underline"}}>
              <Bold>
              affilite terms of service.
              </Bold>
            </Copy>
          </Button>
        </Wrapper>
      )
    }


      return(
        <Wrapper>
          <Copy style={{textAlign: "left"}}>By checking this box, you agree to our</Copy>
          <Button onPress={()=>{
            openUrl("https://dealmachine.com/terms-of-service")
          }}>
            <Copy style={{textAlign: "left", textDecorationLine: "underline"}}>
              <Bold>
              terms of service.
              </Bold>
            </Copy>
          </Button>
        </Wrapper>
      )

  }



  render(){
    return (
      <Wrapper>
        <CheckBoxInput
          onPress={()=>this.props.authFieldChanged({ prop: "accepted_terms", value: this.props.accepted_terms == 1 ? 0 : 1 })}
          value={this.props.accepted_terms == 1 ? true : false}
          title={""}
          componentView={
            ()=>{
              return (
                <Wrapper style={{
                  alignItems: "flex-start",
                  justfyContent: "center"
                }}>
                  {this.renderTermsOfServiceText()}
                </Wrapper>
              )
            }
          }
        />

        <Card>
          <PrimaryButton
            formButton
            onPress={()=>this.props.register()}
          >
            {
              this.props.user_info.signup_type == "team_invite" ?
              "Join Team" :
                this.props.no_container ?
                  this.props.buttonText && this.props.buttonText != "" ? this.props.buttonText :
                    this.props.affiliate_partner ? "Join Our Affiliate Program" :
                    "Sign Up Today For Free" :
                      "Complete Sign Up"
            }
          </PrimaryButton>
        </Card>

        <Button onPress={()=>displayIntercom()} id="intercom_button">
          <Wrapper style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 20

          }}>
            <Copy style={{
              textAlign: "center"
            }}>Need help? Chat with us.</Copy>
          </Wrapper>
        </Button>

      </Wrapper>
    );

  }

}

export default Buttons;
