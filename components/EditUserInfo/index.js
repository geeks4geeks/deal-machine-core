import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  initUpdateUser,
  updateUserFieldChange,
  updateUser,
  setModal,
  toggleModal,
  uploadProfileAnimation,
  toggleActionSheet,
  appRedirect,
  changeTab,
  selectPhoto,
  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

var md5 = require('js-md5');

class EditUserInfo extends Component{

  componentDidMount(){
    this.props.initUpdateUser({user: this.props.user});

    if(!this.props.user.image || this.props.user.image == ""){
      var hash = md5(this.props.user.email);
      const url = "https://www.gravatar.com/avatar/"+hash+"?s=100.jpg&d=mm";
      this.props.updateUserFieldChange({ prop: "image", value: url });
    }

    this.props.changeTab("settings");

  }

  checkIfNeedsToSave(){
    if(this.props.user.firstname != this.props.editUser.firstname ||
      this.props.user.lastname != this.props.editUser.lastname ||
      this.props.user.username != this.props.editUser.username ||
      this.props.user.company != this.props.editUser.company ||
      this.props.user.image != this.props.editUser.image ||
      this.props.user.user_phone != this.props.editUser.user_phone
    ){
      return true;
    }

    return false;
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();

    if(this.props.upload_photo.uploading || this.props.upload_photo.did_upload){
      this.props.setModal({
        title: 'Make sure to save!',
        description: "You've just uploaded your photo. Make sure to save to confirm your changes.",
        icon: "error",
        submit: 'Dismiss',
        onPress: ()=>{},
        cancel: 'Exit without saving',
        onCancel: ()=>{
          this.props.appRedirect({redirect: "goBack", payload:{type: "account"}})
        }
      });
      this.props.toggleModal({show: true, type: "normal"});
    }else{
      this.props.appRedirect({redirect: "goBack", payload:{type: "account"}})
    }
  }

  saveUserInfo(){
    /*mobile*/
    dismissMobileKeyboard();

    if(!this.props.upload_photo.uploading){
      const { firstname, lastname, username, company, user_phone, image } = this.props.editUser;
      this.props.updateUser({
        token: this.props.token,
        type: user_phone != this.props.user.phone ? "update_user_information_phone" : "update_user_information",
        payload: {
          firstname,
          lastname,
          username,
          company,
          phone: user_phone,
          check_phone: 1,
          image,
          use_image: this.props.user.use_image
        }});
    }else{
      this.props.setModal({
        title: 'Uploading...',
        description: 'Please wait while your photo uploads before continuing.',
        icon: "error",
        submit: 'Dismiss',
        onPress: ()=>{},
        cancel: '',
        onCancel: ()=>{}
      });

      this.props.toggleModal({show: true, type: "normal"});
    }
  }

  render(){
    return(
      <Container>
        <Header
          title="Update User Information"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveUserInfo() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            saveUserInfo={this.saveUserInfo.bind(this)}
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
  const { editUser, upload_photo } = settings;

  return { token, user, device, editUser, upload_photo }
}



export default connect(mapStateToProps, {
  initUpdateUser,
  updateUserFieldChange,
  updateUser,
  setModal,
  toggleModal,
  uploadProfileAnimation,
  toggleActionSheet,
  appRedirect,
  changeTab,
  selectPhoto
})(EditUserInfo);
