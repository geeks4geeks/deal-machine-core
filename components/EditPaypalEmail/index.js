import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  initUpdatePartner,
  updatePartnerFieldChange,
  appRedirect,
  changeTab,
  savePartnerInfo,
  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class EditPaypalEmail extends Component{

  componentDidMount(){
    this.props.initUpdatePartner({partner_info: this.props.partner_info});
    this.props.changeTab("partner");
  }

  checkIfNeedsToSave(){
    if(this.props.editPartner.paypal_email != "" && this.props.partner_info.paypal_email != this.props.editPartner.paypal_email){
      return true;
    }else{

    return false;
    }
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();

    this.props.appRedirect({redirect: "goBack", payload:{type: "partner"}})

  }

  savePartnerInfo(){
    this.props.savePartnerInfo({
      token: this.props.token,
      type: "change_paypal_email",
      payload: {
        partner_id: this.props.partner_info.id,
        paypal_email: this.props.editPartner.paypal_email
      }
    });
  }

  render(){
    return(
      <ModalContainer>
        <Header
          title="Edit Paypal Email"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.savePartnerInfo() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            savePartnerInfo={this.savePartnerInfo.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </ModalContainer>
    );
  }
}

const mapStateToProps = ({ auth, native, partner }) => {
  const { token, user } = auth;
  const { device } = native;
  const { editPartner, partner_info } = partner;

  return { token, user, device, editPartner, partner_info }
}



export default connect(mapStateToProps, {
  initUpdatePartner,
  updatePartnerFieldChange,
  savePartnerInfo,
  appRedirect,
  changeTab
})(EditPaypalEmail);
