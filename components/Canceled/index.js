import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, WebContainer, Wrapper, Title, Copy } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import {
  /*mobile*/
  toggleCanPop,
  appRedirect,
  toggleActionSheet,
  updateUser,
  saveCard,
  logout,
  billingFieldChanged,
  authFieldChanged,
  updatePlan,
  resetSelectedPlan,
  resetBilling,
  selectPlan,
  togglePlanFrequency,
  dismissMobileKeyboard
} from "app/NativeActions";

class Canceled extends Component {
  componentDidMount() {
    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
    }

    if (this.props.user.canceled != 1) {
      this.props.appRedirect({ redirect: "dashboard" });
    }
  }

  handleBack(){
    this.props.logout({token: this.props.token});
  }


  renderCopy(){
    if(this.props.user.paused_account == 1){
      return(
        <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20}}>
          <Title>You have paused your DealMachine Account. Your data is still intact.</Title>
          <Copy>Please talk to customer support if you wish to reactivate.</Copy>
        </Wrapper>
      )
    }else{
      return(
        <Wrapper style={{alignItems: "center", justifyContent: "center", padding: 20}}>
          <Title>You have canceled your DealMachine Account.</Title>
          <Copy>Please talk to customer support if you wish to reactivate.</Copy>
        </Wrapper>
      )
    }
  }
  render(){
    return(
      <Container>
          <Header
            title="Canceled"
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack.bind(this)}

          />
        <WebContainer>
          {this.renderCopy()}
        </WebContainer>
      </Container>
    );
  }

}

const mapStateToProps = ({ auth, native, billing, drawer }) => {
  const { token, user, accepted_terms } = auth;
  const { device, platform } = native;
  const { card, price, selected_plan, frequency, loading } = billing;
  const { stats } = drawer;

  return {
    token,
    user,
    device,
    platform,
    card,
    price,
    selected_plan,
    frequency,
    stats,
    loading,
    accepted_terms
  };
};

export default connect(
  mapStateToProps,
  {
    /*mobile*/
    toggleCanPop,

    appRedirect,
    toggleActionSheet,
    updatePlan,
    updateUser,
    saveCard,
    logout,
    billingFieldChanged,
    authFieldChanged,
    resetSelectedPlan,
    resetBilling,
    selectPlan,
    togglePlanFrequency
  }
)(Canceled);
