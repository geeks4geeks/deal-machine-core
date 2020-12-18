import React, { Component } from "react";
import { connect } from "react-redux";

import {
  ModalContainer,
  WebContainer,
  Wrapper,
  Spin
} from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Body from "./Body";

import {
  toggleActionSheet,
  appRedirect,
  changeTab,
  getPausePlanInfo,
  sellLeads,
  getDeals,
  cancelSellLeads,
  updateUserFieldChange,
  setModal,
  toggleModal,
  /*common functions*/
  dismissMobileKeyboard
} from "app/NativeActions";

class SellLeads extends Component {
  componentDidMount() {
    /*mobile*/
    if(this.props.user.team_owner != 1 || !this.props.billing_details){
      this.props.appRedirect({
        redirect: "billing"
      });
    }else{
      this.props.getPausePlanInfo({ token: this.props.token, module_type: this.props.billing_details.slug });
      this.props.changeTab("settings");
    }
  }

  handleBack() {
    this.props.appRedirect({
      redirect: "goBack",
      payload: { type: "billing" }
    });
  }

  render() {
    if(this.props.billing_details){
      if (this.props.pause_plan_info_loading) {
        return (
          <ModalContainer>
            <Header
              title="Opportunity to Sell Your Leads"
              leftButtonIcon="close"
              leftButtonAction={this.handleBack.bind(this)}
            />
            <WebContainer>
              <Wrapper
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20
                }}
              >
                <Spin />
              </Wrapper>
            </WebContainer>
          </ModalContainer>
        );
      }

      return (
        <ModalContainer>
          <Header
            title="Opportunity to Sell Your Leads"
            leftButtonIcon="close"
            leftButtonAction={this.handleBack.bind(this)}
          />
          <WebContainer>
            <Body {...this.props} />
          </WebContainer>
        </ModalContainer>
      );
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, drawer, native, billing, settings }) => {
  const { token, user } = auth;
  const { stats } = drawer;
  const { device } = native;
  const { editUser } = settings;

  const { pause_plan_info, pause_plan_info_loading, billing_details } = billing;

  return {
    token,
    user,
    stats,
    device,
    pause_plan_info,
    pause_plan_info_loading,
    billing_details,
    editUser
  };
};

export default connect(
  mapStateToProps,
  {
    toggleActionSheet,
    appRedirect,
    changeTab,
    getPausePlanInfo,
    sellLeads,
    getDeals,
    cancelSellLeads,
    updateUserFieldChange,
    setModal,
    toggleModal
  }
)(SellLeads);
