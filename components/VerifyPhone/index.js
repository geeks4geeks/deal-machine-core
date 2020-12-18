import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, KeyboardView, Wrapper, Copy, Input, Card, Row, Spin, Bold, Button, Form} from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";

import ChangePhone from './ChangePhone';

import OnboardingText from "app/DealMachineCore/snippets/OnboardingText";

import {
  appRedirect,
  updateUser,

  dismissMobileKeyboard,
  displayIntercom
} from "app/NativeActions";


class VerifyPhone extends Component {

  constructor(props){
    super(props);
    this.state={
      verification_code: "",
      change_phone_toggle: false
    }
  }

  changePhoneToggle(toggle){
    this.setState({
      change_phone_toggle: toggle
    })
  }

  componentDidMount() {
    if(this.props.user.phone_verified == 1){
      this.handleBack();
    }else if(this.props.user.phone_sent == 0){
      if(!this.props.loading){
        this.props.updateUser({
          token: this.props.token,
          type: "send_verify_phone"
        })
      }
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "dashboard"})
  }

  verifyPhone(){
    dismissMobileKeyboard();

    if(this.state.verification_code && !this.props.loading){
      this.props.updateUser({
        token: this.props.token,
        type: "verify_phone",
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
          this.verifyPhone()
        }} primary={true}>
          {"Verify Phone Number"}
        </PillButton>
      )
    }
  }

  render() {

    if(this.state.change_phone_toggle){
      return <ChangePhone
                {...this.props}
                changePhoneToggle={this.changePhoneToggle.bind(this)}
                change_phone_toggle={this.state.change_phone_toggle}
              />
    }

    return(
      <ModalContainer>
        <Header
          title="Verify Phone Number"
          leftButtonIcon={"blank"}
          leftButtonAction={()=>{}}
        />
        <KeyboardView>
          <Wrapper style={{marginBottom: 20}}>
            <Wrapper style={{padding: 15}}>
              <OnboardingText
                slug="verifyPhone"
                style={{
                  padding: 0
                }}
                innerStyle={{
                  padding: 20
                }}
              />
              <Copy>We sent a verification code via SMS to your phone number: <Bold>{this.props.user.phone}.</Bold> Do not share this code with anyone.</Copy>
              <Row>
                <PillButton
                  style={{marginLeft: 0}}
                  onPress={()=>{

                    dismissMobileKeyboard();
                    if(!this.props.loading){
                      this.props.updateUser({
                        token: this.props.token,
                        type: "resend_verify_phone"
                      })
                    }
                  }}
                >
                  Resend SMS
                </PillButton>

                <PillButton
                  style={{marginLeft: 0}}
                  onPress={()=>{
                    this.changePhoneToggle(true)
                  }}
                >
                  Use A Different Phone Number
                </PillButton>
              </Row>
            </Wrapper>
          <Form onSubmit={()=>{
            this.verifyPhone();
          }}>
            <Card>
              <Input
                autoCorrect={true}
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
)(VerifyPhone);
