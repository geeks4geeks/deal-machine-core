import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, ModalContainer, Button, KeyboardView, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  signatureInit,

  /* actions */
  toggleOnboarding,
  changeTab,
  appRedirect,
  toggleActionSheet,
  signatureFieldChanged,
  getSignatures,
  saveSignature,

  setModal,
  toggleModal,

  selectPhoto,

  setEditReturnLocation,

  /* common functions */
  dismissMobileKeyboard
} from 'app/NativeActions';

class EditSignature extends Component {

  componentDidMount(){
    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    if(this.props.user.team_clearance_level == 0 || (this.props.user.team_clearance_level == 1 && this.props.user.can_edit_templates != 1)){
      this.props.appRedirect({redirect: "dashboard"});
    }else{

      if(!this.props.editSignature){

        if(this.props.onboarding){

          this.props.signatureInit({signature: {
            title:
              this.props.user.firstname +
              " " +
              this.props.user.lastname +
              "'s Signature",
            signature_text: "Sincerely,",
            signature_user_id: this.props.user.team_id,
            signature_other_name:
              this.props.user.firstname + " " + this.props.user.lastname,
            email: this.props.user.team_email,
            phone: this.props.user.team_phone,
            other_contact: "",
            include_image: 0,
            signature_image: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            disclaimer: ""
          }});


        }else if(this.props.match){
          if(this.props.match.params.id){
              this.props.getSignatures({
                token: this.props.token,
                type: "signature",
                signature_id: this.props.match.params.id
              });
          }else{
            this.props.appRedirect({redirect: "dashboard"});
          }
        }else{
          this.props.appRedirect({redirect: "dashboard"});
        }

      }else if(this.props.match){
        if(this.props.match.params.id && this.props.match.params.id != this.props.editSignature.id && this.props.match.params.id != "new"){
          this.props.getSignatures({
            token: this.props.token,
            type: "signature",
            signature_id: this.props.match.params.id
          });
        }
      }
    }

    if(this.props.onboarding){
      this.props.toggleOnboarding(true);
    }else{
      this.props.changeTab("mailers");
    }

  }

  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.lockDrawer(false);
      this.props.toggleCanPop("");

      this.props.toggleOnboarding(false);

    }
  }

  handleBack(){
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

          if(this.props.onboarding){
            this.props.toggleOnboarding(false)
            this.props.appRedirect({redirect: "goBack", payload:{remove: "onboarding-signature"}});
          }else{
            if(this.props.edit_return_location == "templates"){
              this.props.setEditReturnLocation(null);
              this.props.appRedirect({redirect: "goBack", payload:{type: "editTemplate"}});
            }else if(this.props.edit_return_location == "campaigns"){
              this.props.appRedirect({redirect: "campaignsEditTemplate"})
            }else{
              this.props.appRedirect({redirect: "goBack", payload:{type: "signatures"}});
            }
          }

        }
      });
      this.props.toggleModal({show: true, type: "normal"});

    }else{

      if(this.props.device == "mobile"){
        this.props.lockDrawer(false);
      }
      if(this.props.onboarding){
        this.props.toggleOnboarding(false)
        this.props.appRedirect({redirect: "goBack", payload:{remove: "onboarding-signature"}});
      }else{
        if(this.props.edit_return_location == "templates"){
          this.props.setEditReturnLocation(null);
          this.props.appRedirect({redirect: "goBack", payload:{type: "editTemplate"}});
        }else if(this.props.edit_return_location == "campaigns"){
          this.props.appRedirect({redirect: "goBack", payload:{type: "campaignsEditTemplate"}});

        }else{
          this.props.appRedirect({redirect: "goBack", payload:{type: "signatures"}});
        }
      }
    }
  }

  checkIfNeedsToSave(){
    if(this.props.editSignature.id && this.props.editSignature.id != 0){
      if(this.props.editSignature.title != this.props.originalSignature.title ||
        this.props.editSignature.signature_text != this.props.originalSignature.signature_text ||
        this.props.editSignature.signature_other_name != this.props.originalSignature.signature_other_name ||
        this.props.editSignature.phone != this.props.originalSignature.phone ||
        this.props.editSignature.email != this.props.originalSignature.email ||
        this.props.editSignature.other_contact != this.props.originalSignature.other_contact ||
        this.props.editSignature.address != this.props.originalSignature.address ||
        this.props.editSignature.address2 != this.props.originalSignature.address2 ||
        this.props.editSignature.city != this.props.originalSignature.city ||
        this.props.editSignature.state != this.props.originalSignature.state ||
        this.props.editSignature.zip != this.props.originalSignature.zip ||
        this.props.editSignature.disclaimer != this.props.originalSignature.disclaimer ||
        this.props.editSignature.include_image != this.props.originalSignature.include_image ||
        this.props.editSignature.signature_image != this.props.originalSignature.signature_image
      ){
        return true;
      }
    }else{
      return true;
    }
    return false;
  }

  saveSignature(preview = false){
    dismissMobileKeyboard();

    if(!this.props.upload_photo.uploading){

      const {
        id,
        title,
        signature_text,
        signature_other_name,
        phone,
        email,
        other_contact,
        address,
        address2,
        city,
        state,
        zip,
        disclaimer,
        include_image,
        signature_image
      } = this.props.editSignature;

      this.props.saveSignature({
        token: this.props.token,
        type: this.props.onboarding ? "onboarding_new" : this.props.editSignature.id ? "update" : "create",
        signature_id: id,
        payload:{
          title: title,
          signature_text: signature_text,
          signature_other_name: signature_other_name,
          phone: phone,
          email: email,
          other_contact: other_contact,
          address: address,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          disclaimer: disclaimer,
          include_image: include_image,
          image: signature_image
        },
        edit_return_location: this.props.edit_return_location
      });

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
    if(!this.props.signature_loading && this.props.editSignature){

      if(this.props.onboarding){
        return(
          <ModalContainer>
            <Header
              title={"Effortlessly Send Direct Mail!"}
              titleLength={0}
              subtitle={""}
              leftButtonIcon={"arrow-back"}
              leftButtonAction={this.handleBack.bind(this)}
              rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
              rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveSignature() : ()=>{}}
            />
            <KeyboardView>
              <Body
                {...this.props}
                saveSignature={this.saveSignature.bind(this)}
                checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
              />
            </KeyboardView>
          </ModalContainer>
        )
      }

      return(
        <Container>

          <Header
            title={this.props.editSignature.id ? "Edit Signature" : "Create New Signature"}
            titleLength={0}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={this.handleBack.bind(this)}
            rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
            rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.saveSignature() : ()=>{}}
          />
          <KeyboardView>
            <Body
              {...this.props}
              saveSignature={this.saveSignature.bind(this)}
              checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            />
          </KeyboardView>
        </Container>

      )
    }

    return(
      <Container>
        <Header
          title="Loading Signature..."
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
        />
        <Spinner />
      </Container>
    )
  }
}



const mapStateToProps = ({ auth, native, drawer, signature, settings }) => {
  const { token, user, onboarding } = auth;
  const { device } = native;
  const { stats } = drawer;
  const { editSignature, originalSignature, signature_loading } = signature;
  const { states, edit_return_location, upload_photo, colors } = settings;

  return {
    token,
    user,
    onboarding,
    device,
    stats,
    editSignature,
    originalSignature,
    signature_loading,
    states,
    edit_return_location,
    upload_photo, colors
  };
}

export default connect(mapStateToProps, {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  /* actions */
  toggleOnboarding,
  changeTab,
  appRedirect,
  toggleActionSheet,
  signatureFieldChanged,
  getSignatures,
  saveSignature,
  setEditReturnLocation,
  signatureInit,

  setModal,
  toggleModal,

  selectPhoto
})(EditSignature);
