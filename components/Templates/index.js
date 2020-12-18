import React, { Component } from "react";
import { connect } from "react-redux";

import { Container, WebContainer, Spinner } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Body from "./Body";

import {
  toggleCanPop,
  toggleDrawer,
  lockDrawer,
  appRedirect,
  changeTab,
  getTemplates,
  templateInit,
  setEditReturnLocation
} from "app/NativeActions";

class Templates extends Component {
  componentDidMount() {
    /*mobile*/
    if (this.props.device == "mobile") {
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
      if (this.props.templates) {
        if (this.props.templates.length == 0) {
          this.props.getTemplates({ token: this.props.token, type: "load" });
        }
      } else {
        this.props.getTemplates({ token: this.props.token, type: "load" });
      }
    } else {
      this.props.appRedirect({ redirect: "dashboard" });
    }
  }

  newTemplate() {
    //get default sig if length = 1
    var signature = null;
    if (this.props.signatures.length > 0) {
      signature = this.props.signatures[0];
    }

    const template_number = this.props.templates.length + 1;
    const template = {
      name: "Template #" + template_number,
      template_signature: signature,
      section_a: null,
      section_b: null,
      section_c: null,
      section_d: null,
      primary_color: null,
      secondary_color: null,
      html_template: null
    };
    this.props.templateInit({ template: template });
    this.props.appRedirect({ redirect: "newTemplate" });
  }

  render() {
    if (!this.props.template_loading) {
      return (
        <Container>
          <Header
            title="Templates"
            leftButtonIcon={this.props.device == "desktop" ? "logo" : "menu"}
            leftButtonAction={
              this.props.device == "desktop"
                ? () => {}
                : () => this.props.toggleDrawer("open")
            }
            rightButtonIcon="add"
            rightButtonAction={() => {
              this.newTemplate();
            }}
          />

          <WebContainer>
            <Body {...this.props} newTemplate={this.newTemplate.bind(this)} />
          </WebContainer>
        </Container>
      );
    }

    return (
      <Container>
        <Header
          title="Loading Templates..."
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

const mapStateToProps = ({ auth, native, drawer, template, signature }) => {
  const { token, user } = auth;
  const { device, platform } = native;
  const { stats, open } = drawer;
  const { signatures } = signature;
  const { templates, template_loading, refreshing } = template;

  return {
    token,
    user,
    device,
    platform,
    stats,
    open,
    signatures,
    templates,
    template_loading,
    refreshing
  };
};

export default connect(
  mapStateToProps,
  {
    toggleCanPop,
    toggleDrawer,
    lockDrawer,

    appRedirect,
    changeTab,
    getTemplates,
    templateInit,

    setEditReturnLocation
  }
)(Templates);
