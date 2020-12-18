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
  toggleActionSheet,

  creditPurchaseChanged,
  initEditCreditPurchase,

  /*common functions*/
  dismissMobileKeyboard

} from 'app/NativeActions';

class PurchaseCredits extends Component{

  componentDidMount(){

    if(this.props.user.team_owner != 1 && this.props.user.team_clearance_level < 2){
      this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
    }else{

      this.props.initEditCreditPurchase({
        credit_amount: this.props.user.team_default_credit_reload
      });

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

  handleBack(){
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}});
  }

  purchaseCredits(card_token, error){

    dismissMobileKeyboard();
    this.props.toggleActionSheet("purchase_credits");

  }

  checkIfNeedsToSave(){
    return true;
  }

  render(){

    return(
      <ModalContainer>
        <Header
          title={"Add DealCredit To Account"}
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}

          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? this.purchaseCredits.bind(this) : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            purchaseCredits={this.purchaseCredits.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </ModalContainer>
    );
  }
}

const mapStateToProps = ({ auth, native, billing, drawer }) => {
  const { token, user, onboarding } = auth;
  const { device, platform } = native;
  const {
    editCreditPurchase
  } = billing;
  const { stats } = drawer;

  return {
    token,
    user,
    onboarding,
    device,
    platform,
    editCreditPurchase,
    stats
  }
}



export default connect(mapStateToProps, {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,

  changeTab,
  appRedirect,
  toggleActionSheet,

  creditPurchaseChanged,
  initEditCreditPurchase
})(PurchaseCredits);
