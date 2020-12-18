import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, KeyboardView, Row, Wrapper, Card, Title } from "app/NativeComponents/common";
import { Header, MenuItem, ToggleSwitch } from "app/NativeComponents/snippets";

import {
  appRedirect,
  toggleActionSheet,
  getBilling,
  toggleDealCreditModal,
  toggleOnboarding,
  updateBillingAddon,
  setModal,
  toggleModal,
  setBillingDetails,
  setFeatureModal,
  updatePlan
} from "app/NativeActions";

import DealCredit from './DealCredit';
import CardOnFile from './CardOnFile';

import PlanModules from './PlanModules';

import BillingAddons from './BillingAddons';

class BillingDashboard extends Component {
  componentDidMount() {

    if(this.props.user.team_clearance_level < 2 && this.props.user.team_owner != 1){
      this.handleBack();
    }

    this.props.getBilling({
      token: this.props.token,
      type: "lead_limits"
    })
  }


  handleBack() {
    this.props.appRedirect({
      redirect: "goBack",
      payload: { type: "settings" }
    });
  }

  renderFrequencySwitch(){

    let showSwitch = false;
    for(let i = 0; i<this.props.plan_modules.length; i++){
      if(this.props.plan_modules[i].canceled != 1){
        showSwitch = true;
      }
    }

    if(showSwitch == false){
      for(let i = 0; i<this.props.billing_addons.length; i++){
        if(this.props.billing_addons[i].team_has_addon == 1){
          showSwitch = true;
        }
      }
    }


    if(showSwitch){
      return(
        <ToggleSwitch
          style={{
            borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid"
          }}
          value={this.props.plan_frequency == "annually" ? true : false}
          onChange={value => {
            this.props.setModal({
              title: this.props.plan_frequency == "annually" ? "Pay Monthly?" : "Pay Annually?",
              description: this.props.plan_frequency == "annually" ? "Do you want to switch to monthly payments? This will not take effect until your next billing cycle." : "Do you want to switch to annual payments? This will not take effect until your next billing cycle.",
              submit: this.props.plan_frequency == "annually" ? "Switch To Monthly? Payments" : "Switch To Annual Payments",
              onPress: ()=>{
                this.props.updatePlan({
                  token: this.props.token,
                  plan: null,
                  frequency: this.props.plan_frequency == "annually" ? "monthly" : "annually",
                  slug: null,
                  type: "update_plan_frequency" });
              },
              cancel: 'Not right now.',
              onCancel: ()=>{}
            });
            this.props.toggleModal({show: true, type: "normal"});
          }}
          title={'Pay Annually'}
          text={'Save 17% (2 months free) by paying annually.'}
        />
      )
    }
  }

  render() {
    return (
      <Container>
        <Header
          title={"Billing"}
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}

        />
        <KeyboardView>
          <CardOnFile {...this.props}/>
          <DealCredit {...this.props}/>

          <PlanModules {...this.props}/>

          <BillingAddons {...this.props}/>


          <Card>
            <MenuItem
              style={{
                borderBottomWidth: 1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
              to="/app/settings/billing/update-card"
              onPress={()=>this.props.appRedirect({redirect:"cardOnFile"})}
              title="Update Card On File"
              text={!this.props.card_info.has_card ? "You do not have a card on file." : "Card ending in "+this.props.card_info.last4}
            />
            <MenuItem
              style={{
                borderBottomWidth: 1,
                borderBottomColor: this.props.colors.border_color,
                borderBottomStyle: "solid"
              }}
              to="/app/settings/billing/invoices"
              onPress={()=>this.props.appRedirect({redirect:"invoices"})}
              title="Invoices"
              text={"View your past invoices."}
            />
            {this.renderFrequencySwitch()}
          </Card>

        </KeyboardView>
      </Container>
    );
  }
}

const mapStateToProps = ({
  auth,
  native,
  settings,
  billing,
}) => {
  const { token, user } = auth;
  const { device, platform, isMobile } = native;
  const { colors } = settings;

  const {
    card_info,
    plan_modules,
    deal_credits,
    deal_credits_loading,
    plan_frequency,
    billing_addons,

    loading_lead_limits,
    total_lead_count,
    current_lead_limit,
    additional_limit_price,
    current_billing_cycle_driving_lead_count,
    driving_lead_limit
  } = billing;
  return {
    token,
    user,
    colors,
    card_info,
    plan_modules,
    deal_credits,
    deal_credits_loading,
    plan_frequency,
    billing_addons,
    loading_lead_limits,
    total_lead_count,
    current_lead_limit,
    additional_limit_price,
    current_billing_cycle_driving_lead_count,
    driving_lead_limit,
    device, platform, isMobile
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    getBilling,
    toggleActionSheet,
    toggleDealCreditModal,
    toggleOnboarding,
    updateBillingAddon,
    setModal,
    toggleModal,
    setBillingDetails,
    setFeatureModal,
    updatePlan
  }
)(BillingDashboard);
