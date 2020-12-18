import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Copy, SecondaryButton } from 'app/NativeComponents/common';
import { TextButton } from 'app/NativeComponents/snippets';

import {
  /*common functions*/
  displayIntercom
} from 'app/NativeActions';


class Buttons extends Component{


  render(){
    if(this.props.device == "mobile"){

      if(this.props.platform == "ios"){

        return (
          <Wrapper style={{
            marginBottom: 20
          }}>


            <Card>
              <SecondaryButton
                onPress={()=>this.props.appRedirect({redirect: "login"})}
              >
              Login To Your Account
              </SecondaryButton>
            </Card>
            <TextButton
              onPress={()=>displayIntercom()}
              color={this.props.colors.white_text_color}
              text="Need help? Chat with us."
              id="intercom_button"
            />
          </Wrapper>
        );

      }

      return (
        <Wrapper style={{paddingBottom: 25}}>
          <Card>
            <SecondaryButton
              onPress={()=>this.props.appRedirect({redirect: "register"})}
            >
              {
                this.props.user_info.signup_type == "team_invite" ?
                "Join "+this.props.user_info.team_name+"'s Team" : "Sign Up Today For Free"
              }
            </SecondaryButton>
          </Card>
          <TextButton
            to="/login"
            onPress={()=>this.props.appRedirect({redirect: "login"})}
            color={this.props.colors.white_text_color}
            text="Already have an account? Login."
          />
        </Wrapper>
      );
    }
    return <Wrapper />
  }

}

export default Buttons;
