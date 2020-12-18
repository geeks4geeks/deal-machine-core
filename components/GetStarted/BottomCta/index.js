import React, { Component } from 'react';
import {
  Wrapper,
  Title,
  Card,
  PrimaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import Disclaimer from './Disclaimer';

import {
  /*common functions*/
  displayIntercom
} from 'app/NativeActions';

class BottomCta extends Component{

  renderSignUpTextAndButton(){
    if(this.props.platform != "ios"){
      return(
        <Wrapper>
          <Card>
            <PrimaryButton
              onPress={()=>this.props.appRedirect({redirect: "register"})}
            >
              {
                this.props.user_info.signup_type == "team_invite" ?
                "Join "+this.props.user_info.team_name+"'s Team" : "Start Today For Free"
              }
            </PrimaryButton>
          </Card>

          <Disclaimer {...this.props}/>
        </Wrapper>
      )
    }
  }

  render(){
    if(this.props.device == "desktop"){
      return(
        <Wrapper>
          <Title style={{
            marginBottom:5,
            marginTop: 20,
            textAlign: "center"
          }}>
            {
              this.props.user_info.signup_type == "team_invite" ?
              "Join "+this.props.user_info.team_name+"'s Team" : "Start Today For Free"
            }
          </Title>

          <Disclaimer {...this.props}/>

        </Wrapper>
      )
    }



    return (
      <Wrapper>
        {this.renderSignUpTextAndButton()}
        <TextButton
          onPress={()=>displayIntercom()}
          text="Need help? Chat with us."
          id="intercom_button"
        />
      </Wrapper>
    );
  }

}

export default BottomCta;
