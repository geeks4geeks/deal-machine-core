import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  changeTab,
  toggleActionSheet,
  appRedirect,
  templateInit,


  updateHouseLocal,
  updateHouse,
  updateUser,
  initUpdateUser,
  initEditHouse,
  updateUserFieldChange,
  editHouseFieldChange,
  selectDefaultSendingOptions,

  setEditReturnLocation,
  setModal,
  toggleModal,

  getTemplates,
  getCampaigns,

  dismissMobileKeyboard
} from 'app/NativeActions';

class SendingOptions extends Component{

  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }

    this.props.selectDefaultSendingOptions(false)

  }

  componentDidMount(){


    if(this.props.info.id == 0 && this.props.match && this.props.select_default_sending_options != true){
      if(this.props.match.params.id && this.props.match.params.id != 0){
        this.props.appRedirect({redirect: "goBack", payload: {type: "deal", deal_id: this.props.match.params.id}})
      }else{

        /*mobile*/
        if(this.props.device == "mobile"){
          this.props.toggleCanPop("normal");
          this.props.toggleDrawer("close");
          this.props.lockDrawer(true);
        }

        this.props.selectDefaultSendingOptions(true);
        this.props.initUpdateUser({user: this.props.user});
        this.props.changeTab("settings");

      }
    }else{
      if(this.props.select_default_sending_options){

        /*mobile*/
        if(this.props.device == "mobile"){
          this.props.toggleCanPop("normal");
          this.props.toggleDrawer("close");
          this.props.lockDrawer(true);
        }

        this.props.initUpdateUser({user: this.props.user});
        this.props.changeTab("settings");
      }else{
        this.props.initEditHouse({info: this.props.info, owner: this.props.owner});
        this.props.changeTab("deals");
      }
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.select_default_sending_options != prevProps.select_default_sending_options){
      if(this.props.select_default_sending_options){

        /*mobile*/
        if(this.props.device == "mobile"){
          this.props.toggleCanPop("normal");
          this.props.toggleDrawer("close");
          this.props.lockDrawer(true);
        }

        this.props.initUpdateUser({user: this.props.user});
        this.props.changeTab("settings");
      }else{
        this.props.initEditHouse({info: this.props.info, owner: this.props.owner});
        this.props.changeTab("deals");
      }
    }
  }


  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
  }

  handleBack(){
    /*mobile*/
    dismissMobileKeyboard();

    if(this.props.select_default_sending_options){
      this.props.appRedirect({redirect: "goBack", payload: {type: "settings"}});
    }else{
      this.props.appRedirect({redirect: "goBack", payload: {type: "deal", deal_id: this.props.info.id}})
    }
  }

  saveOptions(){
    /*mobile*/
    dismissMobileKeyboard();

    if(this.props.select_default_sending_options){

      const {
        default_campaign_id,
        default_template_id,
        default_resend_freq,
        default_resend_freq_switch,
        default_resend_limit,
        default_resend_limit_switch
      } = this.props.editUser;

      this.props.updateUser({
        token: this.props.token,
        type: "default_mailing_options",
        payload: {
          campaign_id: default_campaign_id,
          mail_template_id: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_template_id,
          resend_freq: default_campaign_id != 0 && default_campaign_id != null ? 0 : default_resend_freq_switch == "off" ? 0 : default_resend_freq,
          resend_limit: default_campaign_id != 0 && default_campaign_id != null ? 0 :default_resend_freq_switch == "off" ? 0 :
            default_resend_limit_switch == "on" ? 0 : default_resend_limit
        }
      });

    }else{
      const {
        campaign_id,
        mail_template_id,
        resend_freq,
        resend_freq_switch,
        resend_limit,
        resend_limit_switch
      } = this.props.editHouse;

      this.props.updateHouse({
        token: this.props.token,
        type: "mailing_options",
        deal_id: this.props.info.id,
        payload: {
          campaign_id: campaign_id,
          mail_template_id: campaign_id != 0 && campaign_id != null ? 0 : mail_template_id,
          resend_freq: campaign_id != 0 && campaign_id != null ? 0 : resend_freq_switch == "off" ? 0 : resend_freq,
          resend_limit: campaign_id != 0 && campaign_id != null ? 0 : resend_limit_switch == "on" ? 0 : resend_limit
        }
      });
    }
  }

  checkIfNeedsToSave(){
    if(this.props.onboarding){
      return true;
    }else{
      if(this.props.select_default_sending_options){
        if(parseInt(this.props.user.default_resend_freq) != parseInt(this.props.editUser.default_resend_freq) ||
          parseInt(this.props.user.default_resend_limit) != parseInt(this.props.editUser.default_resend_limit) ||
          this.props.user.default_campaign_id != this.props.editUser.default_campaign_id ||
          this.props.user.default_template_id != this.props.editUser.default_template_id
        ){
          return true;
        }else{
          return false;
        }
      }else{
        if(parseInt(this.props.info.resend_freq) != parseInt(this.props.editHouse.resend_freq) ||
        parseInt(this.props.info.resend_limit) != parseInt(this.props.editHouse.resend_limit) ||
        this.props.info.campaign_id != this.props.editHouse.campaign_id ||
        this.props.info.mail_template_id != this.props.editHouse.mail_template_id
      ){
          return true;
        }else{
          return false;
        }
      }
    }

    return false
  }

  render(){
    return(
      <Container>
        <Header
          title={this.props.select_default_sending_options ? this.props.onboarding ? "Set Repeating Mail Options" : "Default Mailing Options" : "Mailing Options"}
          titleLength={33}
          subtitle={this.props.onboarding ? "Last Step!" : ""}
          leftButtonIcon={this.props.onboarding ? "logo" : "arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave()  ? this.saveOptions.bind(this) : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            saveOptions={this.saveOptions.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, house, settings, template, campaign, signature, drawer }) => {
  const { token, user, onboarding } = auth;
  const { device } = native;

  const { stats } = drawer;


  const { info, owner, editHouse } = house;
  const { editUser, select_default_sending_options } = settings;

  const { templates } = template;
  const { campaigns } = campaign;
  const { signatures } = signature;

  return {
    token,
    user,
    device,
    onboarding,
    info,
    owner,
    editHouse,
    editUser,
    select_default_sending_options,
    templates,
    signatures,
    campaigns,
    stats
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  lockDrawer,
  toggleDrawer,
  changeTab,
  toggleActionSheet,
  appRedirect,
  templateInit,

  updateHouseLocal,
  updateHouse,
  updateUser,
  initUpdateUser,
  initEditHouse,
  updateUserFieldChange,
  editHouseFieldChange,
  selectDefaultSendingOptions,

  setEditReturnLocation,
  setModal,
  toggleModal,

  getTemplates,
  getCampaigns

})(SendingOptions);
