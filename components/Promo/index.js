import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  promoFieldChange,
  enterPromo,
  resetPromo,
  appRedirect,
  changeTab,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class Promo extends Component{
  componentWillUnmount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }
  }
  componentDidMount(){
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    this.props.resetPromo();
    this.props.changeTab("settings");
  }

  checkIfNeedsToSave(){
    if(this.props.promoText != "" && this.props.promoText != null){
      return true;
    }

    return false;
  }

  handleBack(){

    /*mobile*/
    dismissMobileKeyboard();
    this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}})

  }

  enterPromo(){
    /*mobile*/
    dismissMobileKeyboard();

    const { token, promoText } = this.props;
    this.props.enterPromo({ token, promo: promoText });
  }

  render(){
    return(
      <Container>
        <Header
          title="Enter Promo Code"
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={this.checkIfNeedsToSave() ? ()=>this.enterPromo() : ()=>{}}
        />
        <KeyboardView>
          <Body
            {...this.props}
            enterPromo={this.enterPromo.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, promo, settings }) => {
  const { token, user } = auth;
  const { device } = native;
  const { promoText } = promo;

  return { token, user, device, promoText }
}



export default connect(mapStateToProps, {
  /*mobile*/
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  promoFieldChange,
  enterPromo,
  resetPromo,
  appRedirect,
  changeTab
})(Promo);
