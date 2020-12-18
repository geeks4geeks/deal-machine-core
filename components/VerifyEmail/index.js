import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, KeyboardView, Wrapper, Copy, Input, Card, Row, Spin, Bold, Button, Form} from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";

import OnboardingText from "app/DealMachineCore/snippets/OnboardingText";

import ChangeEmail from './ChangeEmail';

import {
  appRedirect,
  updateUser,

  dismissMobileKeyboard,
  displayIntercom
} from "app/NativeActions";


class VerifyEmail extends Component {

  constructor(props){
    super(props);
    this.state={
      verification_code: "",
      change_email_toggle: false
    }
  }

  changeEmailToggle(toggle){
    this.setState({
      change_email_toggle: toggle
    })
  }

  componentDidMount() {
    if(this.props.user.email_verified == 1){
      this.handleBack();
    }else if(this.props.user.email_sent == 0){
      if(!this.props.loading){
        this.props.updateUser({
          token: this.props.token,
          type: "send_verify_email"
        })
      }
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "dashboard"})
  }

  verifyEmail(){
    dismissMobileKeyboard();

    if(this.state.verification_code && !this.props.loading){
      this.props.updateUser({
        token: this.props.token,
        type: "verify_email",
        payload:{
          verification_code: this.state.verification_code
        }
      })
    }
  }

  renderSaveButton(){
    if(this.state.verification_code && this.state.verification_code != ""){
      return(
        <PillButton
          formButton
          onPress={()=>{
          this.verifyEmail()
        }} primary={true}>
          {this.props.user.phone_verified == 1 || this.props.user.team_owner != 1 ? "Verify Email Address" : "Next: Verify Phone Number"}
        </PillButton>
      )
    }
  }

  render() {

    if(this.state.change_email_toggle){
      return <ChangeEmail
                {...this.props}
                changeEmailToggle={this.changeEmailToggle.bind(this)}
                change_email_toggle={this.state.change_email_toggle}
              />
    }

    return(
      <ModalContainer>
        <Header
          title="Verify Email Address"
          leftButtonIcon={"blank"}
          leftButtonAction={()=>{}}
        />
        <KeyboardView>
          <Wrapper style={{marginBottom: 20}}>
            <Wrapper style={{padding: 15}}>
              <OnboardingText
                slug="verifyEmail"
                style={{
                  padding: 0
                }}
                innerStyle={{
                  padding: 20
                }}
              />
              <Copy>We sent a verification code to your email address: <Bold>{this.props.user.email}.</Bold> If you have trouble finding the email, try checking your spam folder.</Copy>
              <Row>
                <PillButton
                  style={{marginLeft: 0}}
                  onPress={()=>{
                    dismissMobileKeyboard();
                    if(!this.props.loading){
                      this.props.updateUser({
                        token: this.props.token,
                        type: "resend_verify_email"
                      })
                    }
                  }}
                >
                  Resend Email
                </PillButton>

                <PillButton
                  style={{marginLeft: 0}}
                  onPress={()=>{
                    this.changeEmailToggle(true)
                  }}
                >
                  Use A Different Email
                </PillButton>
              </Row>
            </Wrapper>

          <Form onSubmit={()=>{
            this.verifyEmail();
          }}>
            <Card>
              <Input
                ref="code"
                name="code"
                returnKeyType="next"
                blurOnSubmit={false}
                autoCapitalize="words"
                keyboardType="default"
                placeholder="Enter Verification Code"
                onChange={value => {
                  this.setState({verification_code: value.toString().toUpperCase()})
                }}
                onSubmitEditing={()=>{}}
                value={this.state.verification_code}
                type="text"
              />
            </Card>

            <Row style={{justifyContent: "space-between"}}>
              <Button onPress={()=>displayIntercom()} id="intercom_button">
                <Wrapper style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 15

                }}>
                  <Copy style={{
                    textAlign: "center"
                  }}>Need help? Chat with us.</Copy>
                </Wrapper>
              </Button>
              {this.renderSaveButton()}
            </Row>
          </Form>

        </Wrapper>
        </KeyboardView>
      </ModalContainer>
    );



  }
}

const mapStateToProps = ({ auth, native, property_map, settings }) => {
  const { token, user, onboarding } = auth;
  const { device, platform, isMobile } = native;
  const { loading } = settings;
  return {
    token,
    user,
    onboarding,
    device,
    platform,
    loading
  }
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    updateUser
  }
)(VerifyEmail);
