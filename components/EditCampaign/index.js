import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  KeyboardView,
  Spinner,
  Copy
} from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Body from "./Body";

import {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  /* actions */
  changeTab,
  appRedirect,
  setModal,
  toggleModal,
  toggleActionSheet,
  campaignFieldChanged,
  getCampaigns,
  saveCampaign,
  addCampaignStep,
  removeCampaignStep,
  editCampaignStep,
  setEditReturnLocation,
  templateInit,

  /* common functions */
  dismissMobileKeyboard
} from "app/NativeActions";

class EditCampaign extends Component {

  componentDidMount(){
    /*mobile*/
    if (this.props.device == "mobile") {
      this.props.toggleCanPop("normal");
      this.props.toggleDrawer("close");
      this.props.lockDrawer(true);
    }

    if (
      this.props.user.team_clearance_level == 0 ||
      (this.props.user.team_clearance_level == 1 &&
        this.props.user.can_edit_templates != 1)
    ) {
      this.props.appRedirect({ redirect: "dashboard" });
    } else {
      if (!this.props.editCampaign) {
        if (this.props.match) {
          if (this.props.match.params.id) {
            this.props.getCampaigns({
              token: this.props.token,
              type: "campaign",
              campaign_id: this.props.match.params.id
            });
          } else {
            this.props.appRedirect({ redirect: "campaigns" });
          }
        } else {
          this.props.appRedirect({ redirect: "campaigns" });
        }
      } else if (this.props.match) {
        if (
          this.props.match.params.id &&
          this.props.match.params.id != this.props.editCampaign.id &&
          this.props.match.params.id != "new"
        ) {
          this.props.getCampaigns({
            token: this.props.token,
            type: "campaign",
            campaign_id: this.props.match.params.id
          });
        }
      }
    }

    this.props.changeTab("mailers");
  }

  componentWillUnmount() {
    if (this.props.device == "mobile") {
      this.props.lockDrawer(false);
      this.props.toggleCanPop("");
    }
  }

  handleBack() {
    dismissMobileKeyboard();

    if (this.checkIfNeedsToSave()) {
      this.props.setModal({
        title: "Don't forget to save!",
        description:
          "You have unsaved changes to your campaign, are you sure you wish to exit?",
        icon: "error",
        submit: "Exit and don't save",
        onPress: () => {
          if (this.props.device == "mobile") {
            this.props.lockDrawer(false);
          }
          this.props.appRedirect({
            redirect: "goBack",
            payload: { type: "campaigns" }
          });
        },
        cancel: "Nevermind. I'm still working.",
        onCancel: () => {}
      });
      this.props.toggleModal({ show: true, type: "normal" });
    } else {
      if (this.props.device == "mobile") {
        this.props.lockDrawer(false);
      }
      this.props.appRedirect({
        redirect: "goBack",
        payload: { type: "campaigns" }
      });
    }
  }

  checkIfCanCopy() {
    if (!this.props.editCampaign.id) {
        return false;
    }
    else{
      return true;
    }
  }

  checkIfNeedsToSave() {
    if (this.props.editCampaign.id && this.props.editCampaign.id != 0) {
      if (
        this.props.originalCampaign.title != this.props.editCampaign.title ||
        this.props.originalCampaign.description !=
          this.props.editCampaign.description ||
        this.props.originalCampaign.original_template_id !=
          this.props.editCampaign.original_template_id ||
        this.props.originalCampaign.resend_freq !=
          this.props.editCampaign.resend_freq ||
        this.props.originalCampaign.resend_limit !=
          this.props.editCampaign.resend_limit
      ) {
        return true;
      } else if (
        this.props.originalCampaign.steps.length !=
        this.props.editCampaign.steps.length
      ) {
        return true;
      } else {
        for (var i = 0; i < this.props.editCampaign.steps.length; i++) {
          var edit_step = this.props.editCampaign.steps[i];
          var original_step = this.props.originalCampaign.steps[i];

          if (
            original_step.template_id != edit_step.template_id ||
            original_step.send_after != edit_step.send_after ||
            original_step.resend_freq != edit_step.resend_freq ||
            original_step.resend_limit != edit_step.resend_limit
          ) {
            return true;
          }
        }
      }
    } else {
      return true;
    }

    return false;
  }

  saveCampaign() {
    dismissMobileKeyboard();

    //check if user has this feature unlocked

    const {
      id,
      title,
      description,
      original_template_id,
      resend_freq,
      resend_limit,
      steps
    } = this.props.editCampaign;

    this.props.saveCampaign({
      token: this.props.token,
      type: this.props.editCampaign.id ? "update" : "create",
      campaign_id: id && id != 0 ? id : null,
      payload: {
        title: title,
        description: description,
        original_template_id: original_template_id,
        resend_freq: resend_freq,
        resend_limit: resend_limit,
        steps: steps
      }
    });
  }

  copyCampaign() {
    dismissMobileKeyboard();

    //check if user has this feature unlocked

    const {
      title,
      description,
      original_template_id,
      resend_freq,
      resend_limit,
      steps
    } = this.props.editCampaign;

    this.props.setModal({
      title: "Clone Campaign?",
      description: "Do you want to clone an exact duplicate of this campaign?",
      icon: "check",
      submit: "Clone campaign",
      onPress: () => {
        this.props.saveCampaign({
          token: this.props.token,
          type: "duplicate",
          campaign_id: null,
          payload: {
            title: title + " (Clone)",
            description: description,
            original_template_id: original_template_id,
            resend_freq: resend_freq,
            resend_limit: resend_limit,
            steps: steps
          }
        });
      },
      cancel: "Nevermind.",
      onCancel: () => {}
    });
    this.props.toggleModal({ show: true, type: "normal" });
  }

  render() {
    if (!this.props.campaign_loading && this.props.editCampaign) {
      return (
        <Container>
          <Header
            title={
              this.props.editCampaign.id
                ? "Edit Campaign"
                : "Create New Campaign"
            }
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack.bind(this)}
            rightButtonTitle={
              this.checkIfNeedsToSave() ? (
                <Copy style={{ fontSize: 16 }}>Save</Copy>
              ) : (
                <Copy style={{ fontSize: 16 }}>Clone</Copy>
              )
            }
            rightButtonAction={
              this.checkIfNeedsToSave()
                ? () => this.saveCampaign()
                : () => this.copyCampaign()
            }
            rightButtonFeatureLock={"campaigns"}
          />
          <KeyboardView>
            <Body
              {...this.props}
              saveCampaign={this.saveCampaign.bind(this)}
              copyCampaign={this.copyCampaign.bind(this)}
              checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
              checkIfCanCopy={this.checkIfCanCopy.bind(this)}
            />
          </KeyboardView>
        </Container>
      );
    }

    return (
      <Container>
        <Header
          title="Loading Campaign..."
          leftButtonIcon="arrow-back"
          leftButtonAction={this.handleBack.bind(this)}
        />
        <Spinner />
      </Container>
    );
  }
}

const mapStateToProps = ({
  auth,
  native,
  settings,
  drawer,
  campaign,
  template,
  signature
}) => {
  const { token, user } = auth;
  const { device } = native;
  const { colors } = settings;
  const { stats } = drawer;
  const { editCampaign, originalCampaign, campaign_loading } = campaign;
  const { templates } = template;
  const { signatures } = signature;
  return {
    token,
    user,
    device,
    colors,
    stats,
    editCampaign,
    originalCampaign,
    campaign_loading,
    templates,
    signatures
  };
};

export default connect(
  mapStateToProps,
  {
    /* mobile actions */
    toggleCanPop,
    lockDrawer,
    toggleDrawer,

    /* actions */
    changeTab,
    appRedirect,
    setModal,
    toggleModal,
    toggleActionSheet,
    campaignFieldChanged,
    getCampaigns,
    saveCampaign,

    addCampaignStep,
    removeCampaignStep,
    editCampaignStep,
    setEditReturnLocation,
    templateInit
  }
)(EditCampaign);
