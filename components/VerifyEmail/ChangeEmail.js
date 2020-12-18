import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, WebContainer, Wrapper, Copy, Input, Card, Row, Spin, Bold, Button, Form} from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";


import {
  dismissMobileKeyboard
} from "app/NativeActions";


class ChangeEmail extends Component {

  constructor(props){
    super(props);
    this.state={
      email_address: ""
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.changeEmailToggle(false)
  }

  changeEmail(){
    dismissMobileKeyboard();

    this.props.changeEmailToggle(false)
    this.props.updateUser({
      token: this.props.token,
      type: "change_verify_email",
      payload:{
        email: this.state.email_address
      }
    })
  }

  renderSaveButton(){
    if(this.state.email_address && this.state.email_address != ""){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
            formButton
            onPress={()=>{
              this.changeEmail()
          }} primary={true}>
            Change Email Address
          </PillButton>
        </Row>
      )
    }
  }

  render() {
    if(this.props.change_email_toggle){
      return(
        <ModalContainer>
          <Header
            title="Change Email Address"
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>this.handleBack()}
          />
          <WebContainer>
            <Wrapper style={{marginBottom: 20}}>

              <Wrapper style={{padding: 15}}>
                <Copy>Enter a new email address to change the email address of your account. We'll then send a new verification code to that address.</Copy>
              </Wrapper>
              <Form onSubmit={()=>{
                this.changeEmail();
              }}>
                <Card>
                  <Input
                    ref="code"
                    name="code"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    keyboardType="email-address"
                    placeholder="New Email Address"
                    onChange={value => {
                      this.setState({email_address: value})
                    }}
                    onSubmitEditing={()=>{}}
                    value={this.state.email_address}
                    type="text"
                  />
                </Card>

                {this.renderSaveButton()}
              </Form>


            </Wrapper>
          </WebContainer>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }
}


export default ChangeEmail
