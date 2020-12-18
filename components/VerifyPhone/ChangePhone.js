import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, WebContainer, Wrapper, Copy, Input, Card, Row, Spin, Bold, Button, Form} from "app/NativeComponents/common";
import { Header, PillButton } from "app/NativeComponents/snippets";


import {
  dismissMobileKeyboard
} from "app/NativeActions";


class ChangePhone extends Component {

  constructor(props){
    super(props);
    this.state={
      phone_number: ""
    }
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.changePhoneToggle(false)
  }

  changePhone(){
    dismissMobileKeyboard();

    this.props.changePhoneToggle(false);
    this.props.updateUser({
      token: this.props.token,
      type: "change_verify_phone",
      payload:{
        phone: this.state.phone_number
      }
    })
  }

  renderSaveButton(){
    if(this.state.phone_number && this.state.phone_number != ""){
      return(
        <Row style={{justifyContent: "flex-end"}}>
          <PillButton
            formButton
            onPress={()=>{
              this.changePhone()
          }} primary={true}>
            Change Phone Number
          </PillButton>
        </Row>
      )
    }
  }

  render() {
    if(this.props.change_phone_toggle){
      return(
        <ModalContainer>
          <Header
            title="Change Phone Number"
            leftButtonIcon={"arrow-back"}
            leftButtonAction={()=>this.handleBack()}
          />
          <WebContainer>
            <Wrapper style={{marginBottom: 20}}>

              <Wrapper style={{padding: 15}}>
                <Copy>Enter a new phone number to change the phone number associated with your account. We'll then send a new verification code via SMS to that number.</Copy>
              </Wrapper>
              <Form onSubmit={()=>{
                this.changePhone();
              }}>
                <Card>
                  <Input
                    ref="code"
                    name="code"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    placeholder="New Phone Number"
                    onChange={value => {
                      this.setState({phone_number: value})
                    }}
                    keyboardType="numeric"
                    mask_type={'cel-phone'}
                    mask={"(999) 999-9999"}
                    onSubmitEditing={()=>{}}
                    value={this.state.phone_number}
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


export default ChangePhone
