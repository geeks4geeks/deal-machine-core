import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  initUpdateUser,
  updateUserFieldChange,
  updateUser,
  appRedirect,
  changeTab,
  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class EditEmail extends Component{

  componentDidMount(){
    this.props.initUpdateUser({user: this.props.user});
    this.props.changeTab("settings");
  }

  checkIfNeedsToSave(){
    if((this.props.editUser.email != "" && this.props.user.email != this.props.editUser.email) ||
      this.props.editUser.password != ""){
      return true;
    }

    return false;
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload:{type: "account"}})

  }

  saveEmail(){
    /*mobile*/
    dismissMobileKeyboard();

    const { email, password } = this.props.editUser;
    this.props.updateUser({token: this.props.token, type: "change_email", payload: { email, password }});
  }

  render(){

    return(
      <Container>
        <Header
          title="Change Email"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveEmail() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            saveEmail={this.saveEmail.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, settings }) => {
  const { token, user } = auth;
  const { device } = native;
  const { editUser } = settings;

  return { token, user, device, editUser }
}



export default connect(mapStateToProps, {
  initUpdateUser,
  updateUserFieldChange,
  updateUser,
  appRedirect,
  changeTab
})(EditEmail);
