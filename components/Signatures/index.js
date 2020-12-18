import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer, Spinner } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  appRedirect,
  changeTab,
  getSignatures,
  signatureInit,
  toggleOnboarding,

  setEditReturnLocation

} from 'app/NativeActions';

class Signatures extends Component{

  componentDidMount(){


    /*mobile*/
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false)
    }

    this.props.setEditReturnLocation(null);
    this.props.changeTab("mailers");

    if(this.props.user.team_clearance_level > 1 || (this.props.user.team_clearance_level == 1 && this.props.user.can_edit_templates == 1)){

      if(this.props.user.team_set_signature != 1 && !this.props.onboarding){
        this.props.toggleOnboarding(true);
        this.props.appRedirect({redirect: "goForward", payload:{add: "onboarding-signature"}});
      }

      if(this.props.signatures.length == 0){
        this.props.getSignatures({ token: this.props.token, type: "load" });
      }
    }else{
      this.props.appRedirect({redirect: "dashboard"});
    }

  }

  handleBack(){
    if(this.props.device == "mobile"){
      this.props.lockDrawer(false);
    }
    this.props.appRedirect({redirect: "goBack", payload:{type: "templates"}});
  }

  newSignature(){
    const signature_number = this.props.signatures.length + 1;
    const signature = {
      title: "Signature #"+signature_number,
      signature_text: "Sincerely,",
      signature_user_id: this.props.user.team_id,
      signature_other_name: this.props.user.firstname+" "+this.props.user.lastname,
      email: this.props.user.team_email,
      phone: this.props.user.team_phone,
      other_contact: "",
      include_image: this.props.user.image != "" && this.props.user.image ? 1 : 0,
      signature_image: "",

      address: "",
      address2: "",
      city: "",
      state: "",
      zip: "",

      disclaimer: ""
    }
    this.props.signatureInit({signature: signature});
    this.props.appRedirect({redirect: "newSignature"})

  }

  render(){
    if(!this.props.signature_loading){
      return(
        <Container>
          <Header
            title="Signatures"
            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop" ? ()=>{} : ()=>this.props.toggleDrawer("open")
            }
            rightButtonIcon="add"
            rightButtonAction={()=>{
              this.newSignature();
            }}

          />
          <WebContainer>
            <Body
              {...this.props}
              newSignature={this.newSignature.bind(this)}
            />
          </WebContainer>
        </Container>
      );
    }

    return(
      <Container>
        <Header
          title="Loading Signatures..."
          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={
            this.props.device == "desktop" ? ()=>{} : ()=>this.props.toggleDrawer("open")
          }

        />
        <Spinner />
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, native, drawer, signature }) => {
  const { token, user, onboarding } = auth;
  const { device } = native;
  const { stats, open } = drawer;
  const { signatures, signature_loading, refreshing } = signature;

  return {
    token,
    user,
    onboarding,
    device,
    stats,
    open,
    signatures,
    signature_loading,
    refreshing
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  appRedirect,
  changeTab,
  getSignatures,
  signatureInit,
  toggleOnboarding,

  setEditReturnLocation
})(Signatures);
