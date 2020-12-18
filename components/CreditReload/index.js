import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ModalContainer, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';


import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  changeTab,
  appRedirect,

  getInvoices,
  editCredits,

  /*common functions*/
  dismissMobileKeyboard

} from 'app/NativeActions';

class CreditReload extends Component{


  constructor(props){
    super(props);

    this.state = {
      credit_amount: props.user.team_default_credit_reload
    }
  }

  componentDidMount(){

    if(this.props.user.team_owner != 1 && this.props.user.team_clearance_level < 2){
      this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
    }else{

      if(this.props.device == "mobile"){
        if(this.props.onboarding){
          this.props.toggleCanPop("");
        }else{
          this.props.toggleCanPop("normal");
        }
        this.props.toggleDrawer("close");
        this.props.lockDrawer(true);
      }
      this.props.changeTab("settings");

    }
  }

  componentWillUnmount(){

  }

  editCreditAmount(amount){
    this.setState({
      credit_amount: amount
    })
  }

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}});
  }

  saveDefaultCreditAmount(card_token, error){

    dismissMobileKeyboard();

    this.props.editCredits({
      token: this.props.token,
      type: this.props.onboarding ? "set_default_credit_reload_onboarding" : "set_default_credit_reload",
      payload:{
        amount: this.state.credit_amount ? this.state.credit_amount : 0
      }
    })

  }

  checkIfNeedsToSave(){
    if(this.props.onboarding ||
      this.state.credit_amount != this.props.user.team_default_credit_reload
    ){
      return true;
    }

    return false
  }

  render(){
    return(
      <ModalContainer>
        <Header
          title={this.props.onboarding ? "Set Reload Amount" : "Set Reload Amount"}
          titleLength={33}
          subtitle={this.props.onboarding ? "Step #4" : ""}
          leftButtonIcon={this.props.onboarding ? "logo" : "arrow-back"}
          leftButtonAction={this.props.onboarding ? ()=>{} : this.handleBack.bind(this)}

          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? this.saveDefaultCreditAmount.bind(this) : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            credit_amount={this.state.credit_amount}
            editCreditAmount={this.editCreditAmount.bind(this)}
            saveDefaultCreditAmount={this.saveDefaultCreditAmount.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </ModalContainer>
    );
  }
}

const mapStateToProps = ({ auth, native, billing }) => {
  const { token, user, onboarding } = auth;
  const { device, platform } = native;
  const {
    invoices,
    invoices_loading,
    invoices_error,
  } = billing;

  return {
    token,
    user,
    onboarding,
    device,
    platform,
    invoices,
    invoices_loading,
    invoices_error
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  changeTab,
  appRedirect,

  getInvoices,
  editCredits
})(CreditReload);
