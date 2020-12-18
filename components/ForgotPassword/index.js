import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import {
  /*mobile*/
  toggleCanPop,

  authFieldChanged,
  forgotPassword,
  appRedirect,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

import Body from './Body';

class ForgotPassword extends Component{

  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }
  }

  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
    }


  }

  handleBack(){
    /* mobile */
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload: {type: "login"}})
  }

  forgot(){
    /* mobile */
    dismissMobileKeyboard();

    const { email } = this.props;
    this.props.forgotPassword({email});
  }

  checkIfNeedsToSave(){
    if(this.props.email && this.props.email != ""){
      return true;
    }

    return false;
  }

  render(){

    return(
      <Container>

        <Header
          title="Forgot Password"
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? this.forgot.bind(this) : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            forgot={this.forgot.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, native }) => {
  const { email } = auth;
  const { device } = native;
  return {
    email,
    device
  };
}

export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  appRedirect,

  authFieldChanged,
  forgotPassword
})(ForgotPassword);
