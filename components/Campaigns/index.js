import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, WebContainer, Spinner } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Body from "./Body";

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  campaignInit,
  getCampaigns,
  appRedirect,
  changeTab,
  setEditReturnLocation
} from "app/NativeActions";

class Campaigns extends Component {

  componentDidMount(){

    if(this.props.device == "mobile"){
      this.props.toggleCanPop("");
      this.props.lockDrawer(false);
    }

    this.props.setEditReturnLocation(null);
    this.props.changeTab("mailers");

    if (
      this.props.user.team_clearance_level > 1 ||
      (this.props.user.team_clearance_level == 1 &&
        this.props.user.can_edit_templates == 1)
    ) {
      if (this.props.campaigns) {
        if (this.props.campaigns.length == 0) {
          this.props.getCampaigns({ token: this.props.token, type: "load" });
        }
      } else {
        this.props.getCampaigns({ token: this.props.token, type: "load" });
      }
    } else {
      this.props.appRedirect({ redirect: "dashboard" });
    }
  }

  newCampaign() {
    const campaign_number = this.props.campaigns.length + 1;
    const campaign = {
      title: "Campaign #" + campaign_number,
      description: "",
      current_step: 1,
      original_template_id: 0,
      original_template_title: "",
      resend_switch: "off",
      resend_freq: 0,
      resend_limit: 0,
      steps: []
    };
    this.props.campaignInit({ campaign: campaign });
    this.props.appRedirect({ redirect: "newCampaign" });
  }

  handleBack() {
    if (this.props.device == "mobile") {
      this.props.lockDrawer(false);
    }
    this.props.appRedirect({
      redirect: "goBack",
      payload: { type: "templates" }
    });
  }

  render() {
    if (!this.props.campaign_loading) {
      return (
        <Container>
          <Header
            title="Campaigns"
            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop"
                ? () => {}
                : () => this.props.toggleDrawer("open")
            }
            rightButtonIcon="add"
            rightButtonAction={() => {
              this.newCampaign();
            }}
          />

          <WebContainer>
            <Body {...this.props} newCampaign={this.newCampaign.bind(this)} />
          </WebContainer>
        </Container>
      );
    }

    return (
      <Container>
        <Header
          title="Loading Campaigns..."
          leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
          leftButtonAction={
            this.props.device == "desktop"
              ? () => {}
              : () => this.props.toggleDrawer("open")
          }
        />
        <Spinner />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, native, drawer, campaign }) => {
  const { token, user } = auth;
  const { device } = native;
  const { stats, open } = drawer;
  const { campaigns, campaign_loading, refreshing } = campaign;

  return {
    token,
    user,
    device,
    stats,
    open,
    campaigns,
    campaign_loading,
    refreshing
  };
};

export default connect(
  mapStateToProps,
  {
    toggleCanPop,
    toggleDrawer,
    lockDrawer,

    campaignInit,
    getCampaigns,

    appRedirect,
    changeTab,

    setEditReturnLocation
  }
)(Campaigns);
