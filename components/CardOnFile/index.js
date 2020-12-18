import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, KeyboardView, ModalContainer, CardBody, Wrapper, Title, Copy, InternalImage } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {

  saveCard,
  resetBilling,
  resetSelectedPlan,
  billingFieldChanged,
  toggleOnboarding,

  changeTab,
  appRedirect,

  /*common functions*/
  dismissMobileKeyboard

} from 'app/NativeActions';

class CardOnFile extends Component{

  constructor(props){
    super(props);

    this.state = {
      address:{
        name: this.props.user.firstname ? this.props.user.firstname+" "+this.props.user.lastname : "",
        address: this.props.user.address ? this.props.user.address : "",
        address2: this.props.user.address2 ? this.props.user.address2 : "",
        city: this.props.user.address_city ? this.props.user.address_city : "",
        state: this.props.user.address_state ? this.props.user.address_state : "",
        zip: this.props.user.address_zip ? this.props.user.address_zip : ""
      }
    }
  }

  editAddressField({prop, value}){
    this.setState({
      address: {
        ...this.state.address,
        [prop]: value
      }
    })
  }

  componentDidMount(){

    if(this.props.user.team_owner != 1){
      this.handleBack();
    }else{
      this.props.resetBilling();
      this.props.resetSelectedPlan({
        plan: this.props.stats.billing.plan,
        frequency: this.props.stats.billing.frequency,
        price: this.props.stats.billing.price,
        plans: this.props.stats.plans
      });
    }

    this.props.changeTab("settings");

  }
  componentWillUnmount(){
    this.props.resetBilling();
  }

  handleBack(){
    /* mobile*/
    dismissMobileKeyboard();
    if(this.props.onboarding){
      this.props.toggleOnboarding(false);
      if(this.props.card_info.bad_card == 1){
        this.props.appRedirect({redirect: "goBack", payload:{remove: "update-card"}});
      }else{
        this.props.appRedirect({redirect: "goBack", payload:{remove: "add-card"}});
      }
    }else{
      this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}});
    }
  }

  saveBilling(card_token, error){
    dismissMobileKeyboard();

    if(card_token || error){
      this.props.saveCard({
        token: this.props.token,
        card_token: card_token,
        error: error,
        price: this.props.price,
        plan: this.props.selected_plan.id,
        frequency: this.props.frequency,
        type: this.props.onboarding ? this.props.card_info.bad_card == 1 ? "reactivate_card" : "onboarding_add_card" : "update_card",
        device: this.props.platform,
        address: this.state.address
      });
    }else{
      const { number, expMonth, expYear, cvc } = this.props.card;
      this.props.saveCard({
        token: this.props.token,
        number,
        expMonth,
        expYear,
        cvc,
        price: this.props.price,
        plan: this.props.selected_plan.id,
        frequency: this.props.frequency,
        type: this.props.onboarding ? this.props.card_info.bad_card == 1 ? "reactivate_card" : "onboarding_add_card" : "update_card",
        device: this.props.platform,
        address: this.state.address
      });
    }

  }

  checkIfNeedsToSave(){
    if(
      (this.props.card.number && this.props.card.number.length > 0 &&
      this.props.card.expMonth && this.props.card.expMonth.length > 0 &&
      this.props.card.expYear && this.props.card.expYear.length > 0 &&
      this.props.card.cvc && this.props.card.cvc.length > 0)
    ){
      return true;
    }

    return false
  }

  render(){

    if(this.props.platform == "ios"){
      return(
        <ModalContainer>
          <Header
            title={"Credit Card Required"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={this.handleBack.bind(this)}
          />
          <KeyboardView>
            <Wrapper style={{
              padding: 20,
              alignItems: "center",
              justifyContent: "center"
            }}>
              <InternalImage
                style={{
                  resizeMode: "contain",
                  width: 200,
                  height: this.props.device == "desktop" ? 150 : 150
                }}
                source={this.props.device == "mobile" ? require("app/assets/images/DealCredits.png") : null}
                image={this.props.device == "desktop" ? "/assets/images/DealCredits.svg" : ""}

              />
            </Wrapper>
            <CardBody>
              <Title style={{textAlign: "center"}}>
                You need more DealCredit
              </Title>
              <Copy style={{textAlign: "center"}}>
                To continue to send mailers or skip trace your leads, your need to add a credit card on your account. You can't do this from the the app. We know it's a hassle. Add your card on our web app and come back to start sending mailers and skip tracing leads.
              </Copy>
            </CardBody>
          </KeyboardView>
        </ModalContainer>
      );
    }

    if(this.props.onboarding){
      return(
        <ModalContainer>
          <Header
            title={this.props.card_info.bad_card == 1 ? "Update The Card On Your Account" : "Add A Card To Your Account"}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={this.handleBack.bind(this)}
          />
          <KeyboardView>
            <Body
              {...this.props}
              address={this.state.address}
              editAddressField={this.editAddressField.bind(this)}
              saveBilling={this.saveBilling.bind(this)}
              checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            />
          </KeyboardView>
        </ModalContainer>
      );
    }

    return(
      <ModalContainer>
        <Header
          title={"Card On File"}
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
        />
        <KeyboardView>
          <Body
            {...this.props}
            address={this.state.address}
            editAddressField={this.editAddressField.bind(this)}
            saveBilling={this.saveBilling.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          />
        </KeyboardView>
      </ModalContainer>
    );
  }
}

const mapStateToProps = ({ auth, native, billing, drawer, settings }) => {
  const { token, user, onboarding } = auth;
  const { device, platform } = native;
  const { card, price, selected_plan, frequency, loading, card_info } = billing;
  const { states } = settings;
  const { stats } = drawer;

  return {
    token,
    user,
    onboarding,
    device,
    platform,
    card,
    price,
    selected_plan,
    frequency,
    stats,
    loading,
    card_info,
    states
  }
}



export default connect(mapStateToProps, {

  saveCard,
  resetBilling,
  resetSelectedPlan,
  billingFieldChanged,
  toggleOnboarding,

  changeTab,
  appRedirect
})(CardOnFile);
