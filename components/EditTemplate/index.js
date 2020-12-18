import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Button,
  KeyboardView,
  Spinner,
  Copy,
  Card,
  CardBody
} from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import Body from "./Body";
import EditTemplatePreview from "./EditTemplatePreview";

import {
  /* mobile actions */
  toggleCanPop,
  lockDrawer,
  toggleDrawer,

  /* actions */
  changeTab,
  appRedirect,
  toggleActionSheet,
  templateFieldChanged,
  getTemplates,
  saveTemplate,
  setPreviewType,
  setModal,
  toggleModal,
  showTemplatePreview,
  setEditReturnLocation,
  signatureInit,
  reloadPreviews,
  templateInit,

  /* common functions */
  dismissMobileKeyboard
} from "app/NativeActions";

class EditTemplate extends Component {
  constructor(props) {
    super(props);

    let type = null;
    if (this.props.editTemplate) {
      type = "postcard";
      if (this.props.editTemplate.html_template) {
        type = this.props.editTemplate.html_template.template_type;
      }
    }
    this.state = {
      template_type: type
    };
  }

  selectTemplateType(type) {
    if (type != this.state.template_type) {
      this.setState({ template_type: type });
      this.props.templateFieldChanged({ prop: "html_template", value: null });
    }
  }

  componentDidMount() {
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
      if (!this.props.editTemplate) {
        if (this.props.match) {
          if (this.props.match.params.id) {
            this.props.getTemplates({
              token: this.props.token,
              type: "template",
              template: this.props.match.params.id
            });
          } else {
            this.props.appRedirect({ redirect: "templates" });
          }
        } else {
          this.props.appRedirect({ redirect: "templates" });
        }
      } else if (this.props.match) {
        if (
          this.props.match.params.id &&
          this.props.match.params.id != this.props.editTemplate.id &&
          this.props.match.params.id != "new"
        ) {
          this.props.getTemplates({
            token: this.props.token,
            type: "template",
            template: this.props.match.params.id
          });
        }
      }
    }

    this.props.changeTab("campaigns");
  }

  componentWillUnmount() {
    if (this.props.device == "mobile") {
      this.props.lockDrawer(false);
      this.props.toggleCanPop("");
    }
  }

  handleBack() {
    dismissMobileKeyboard();

    if (this.props.device == "mobile") {
      this.props.lockDrawer(false);
    }
    if (this.props.edit_return_location == "campaigns") {
      this.props.setEditReturnLocation(null);
      this.props.appRedirect({
        redirect: "goBack",
        payload: { type: "campaigns" }
      });
    } else if (this.props.edit_return_location == "sending_options") {
      this.props.appRedirect({
        redirect: "goBack",
        payload: { type: "sending_options" }
      });
    } else if (this.props.edit_return_location == "mailing_options") {
      this.props.appRedirect({
        redirect: "goBack",
        payload: { type: "mailing_options", deal_id: this.props.info.id }
      });
    } else {
      this.props.appRedirect({
        redirect: "goBack",
        payload: { type: "templates" }
      });
    }
  }

  checkIfCanCopy() {
    if (!this.props.editTemplate.id) {
      if (this.props.editTemplate.html_template != null) {
        return false;
      }
    }

    if (this.props.editTemplate.html_template == null) {
      return false;
    }

    if (this.checkIfNeedsToSave()) {
      return false;
    }

    return true;
  }

  checkIfNeedsToSave() {
    if (!this.props.editTemplate.id) {
      if (this.props.editTemplate.html_template != null) {
        return true;
      }
    } else if (
      this.props.editTemplate.id &&
      this.props.editTemplate.template_signature &&
      this.props.editTemplate.html_template &&
      this.props.originalTemplate.template_signature &&
      this.props.originalTemplate.html_template
    ) {
      if (
        (this.props.originalTemplate.name != this.props.editTemplate.name &&
          this.props.editTemplate.name != "") ||
        this.props.originalTemplate.section_a !=
          this.props.editTemplate.section_a ||
        this.props.originalTemplate.section_b !=
          this.props.editTemplate.section_b ||
        this.props.originalTemplate.section_c !=
          this.props.editTemplate.section_c ||
        this.props.originalTemplate.section_d !=
          this.props.editTemplate.section_d ||
        this.props.originalTemplate.primary_color !=
          this.props.editTemplate.primary_color ||
        this.props.originalTemplate.secondary_color !=
          this.props.editTemplate.secondary_color ||
        this.props.originalTemplate.html_template.id !=
          this.props.editTemplate.html_template.id ||
        this.props.originalTemplate.template_signature.id !=
          this.props.editTemplate.template_signature.id
      ) {
        return true;
      }
    }
    return false;
  }

  saveTemplate(preview = false) {
    dismissMobileKeyboard();

    const {
      id,
      section_a,
      section_b,
      section_c,
      section_d,
      name,
      primary_color,
      secondary_color,
      template_signature
    } = this.props.editTemplate;

    this.props.saveTemplate({
      token: this.props.token,
      type: this.props.editTemplate.id ? "update" : "create",
      template_id: id,
      payload: {
        section_a: section_a
          ? section_a
          : this.props.editTemplate.html_template.section_a.default_text,
        section_b: section_b
          ? section_b
          : this.props.editTemplate.html_template.section_b.default_text,
        section_c: section_c
          ? section_c
          : this.props.editTemplate.html_template.section_c.default_text,
        section_d: section_d
          ? section_d
          : this.props.editTemplate.html_template.section_d.default_text,
        name: name,
        signature_id: template_signature
          ? template_signature.id
            ? template_signature.id
            : 0
          : 0,
        html_template_id: this.props.editTemplate.html_template.id,
        primary_color: primary_color
          ? primary_color
          : this.props.editTemplate.html_template.default_primary_color.hex,
        secondary_color: secondary_color
          ? secondary_color
          : this.props.editTemplate.html_template.default_secondary_color.hex
      },
      edit_return_location: this.props.edit_return_location,
      deal_id: this.props.info.id
    });
  }

  copyTemplate() {
    const {
      id,
      section_a,
      section_b,
      section_c,
      section_d,
      name,
      primary_color,
      secondary_color,
      template_signature
    } = this.props.editTemplate;

    this.props.setModal({
      title: "Clone Template?",
      description: "Do you want to clone an exact duplicate of this template?",
      icon: "check",
      submit: "Clone template",
      onPress: () => {
        this.props.saveTemplate({
          token: this.props.token,
          type: "duplicate",
          payload: {
            section_a: section_a
              ? section_a
              : this.props.editTemplate.html_template.section_a.default_text,
            section_b: section_b
              ? section_b
              : this.props.editTemplate.html_template.section_b.default_text,
            section_c: section_c
              ? section_c
              : this.props.editTemplate.html_template.section_c.default_text,
            section_d: section_d
              ? section_d
              : this.props.editTemplate.html_template.section_d.default_text,
            name: name + " (Clone)",
            signature_id: template_signature
              ? template_signature.id
                ? template_signature.id
                : 0
              : 0,
            html_template_id: this.props.editTemplate.html_template.id,
            primary_color: primary_color
              ? primary_color
              : this.props.editTemplate.html_template.default_primary_color.hex,
            secondary_color: secondary_color
              ? secondary_color
              : this.props.editTemplate.html_template.default_secondary_color
                  .hex
          },
          edit_return_location: this.props.edit_return_location,
          deal_id: this.props.info.id
        });
      },
      cancel: "Nevermind.",
      onCancel: () => {}
    });
    this.props.toggleModal({ show: true, type: "normal" });
  }

  componentDidUpdate(prevProps) {
    //update selector when a new template is loaded
    if (this.props.editTemplate != null) {
      if (this.props.editTemplate.html_template != null) {
        if (
          this.props.editTemplate.html_template.template_type !=
            this.state.template_type &&
          this.props.editTemplate.html_template.template_type != null &&
          this.state.template_type == null
        ) {
          this.setState({
            template_type: this.props.editTemplate.html_template.template_type
          });
        }
      }
    }
  }

  render() {
    if (!this.props.template_loading && this.props.editTemplate) {
      return (
        <Container>
          <Header
            title={
              this.props.editTemplate.id
                ? "Edit Mail Template"
                : "Create New Mail Template"
            }
            leftButtonIcon="arrow-back"
            leftButtonAction={this.handleBack.bind(this)}
            rightButtonTitle={
              this.props.editTemplate.html_template ? (
                <Copy style={{ fontSize: 16 }}>Preview</Copy>
              ) : (
                ""
              )
            }
            rightButtonAction={
              this.props.editTemplate.html_template
                ? () => {
                    this.props.showTemplatePreview({
                      show: true,
                      template_id: this.props.editTemplate.id,
                      html_template_id: this.props.editTemplate.html_template
                        .id,
                      payload: {
                        section_a:
                          this.props.editTemplate.section_a == null
                            ? this.props.editTemplate.html_template.section_a
                                .default_text
                            : this.props.editTemplate.section_a,
                        section_b:
                          this.props.editTemplate.section_b == null
                            ? this.props.editTemplate.html_template.section_b
                                .default_text
                            : this.props.editTemplate.section_b,
                        section_c:
                          this.props.editTemplate.section_c == null
                            ? this.props.editTemplate.html_template.section_c
                                .default_text
                            : this.props.editTemplate.section_c,
                        section_d:
                          this.props.editTemplate.section_d == null
                            ? this.props.editTemplate.html_template.section_d
                                .default_text
                            : this.props.editTemplate.section_d,
                        primary_color:
                          this.props.editTemplate.primary_color == null
                            ? this.props.editTemplate.html_template
                                .default_primary_color.hex
                            : this.props.editTemplate.primary_color,
                        secondary_color:
                          this.props.editTemplate.secondary_color == null
                            ? this.props.editTemplate.html_template
                                .default_secondary_color.hex
                            : this.props.editTemplate.secondary_color,
                        signature_id: this.props.editTemplate
                          ? this.props.editTemplate.template_signature
                            ? this.props.editTemplate.template_signature.id
                              ? this.props.editTemplate.template_signature.id
                              : null
                            : null
                          : null
                      },
                      template_type: this.props.editTemplate.html_template
                        ? this.props.editTemplate.html_template.template_type
                        : this.state.template_type,
                      template_preview: this.props.editTemplate
                        .template_preview,
                      template_preview_back: this.props.editTemplate
                        .template_preview_back,
                      reloadId: this.props.editTemplate.id,
                      reload:
                        this.checkIfNeedsToSave() ||
                        !this.props.editTemplate.template_preview ||
                        !this.props.editTemplate.template_preview_back
                          ? true
                          : false
                    });
                  }
                : () => {}
            }
            rightButtonTitle2={
              this.checkIfNeedsToSave() ? (
                <Copy style={{ fontSize: 16 }}>Save</Copy>
              ) : this.checkIfCanCopy() ? (
                <Copy style={{ fontSize: 16 }}>Clone</Copy>
              ) : (
                ""
              )
            }
            rightButtonAction2={
              this.checkIfNeedsToSave()
                ? () => this.saveTemplate()
                : () => (this.checkIfCanCopy() ? this.copyTemplate() : () => {})
            }
          />
          <KeyboardView>
            <Body
              {...this.props}
              template_type={this.state.template_type}
              saveTemplate={this.saveTemplate.bind(this)}
              copyTemplate={this.copyTemplate.bind(this)}
              checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
              checkIfCanCopy={this.checkIfCanCopy.bind(this)}
              selectTemplateType={this.selectTemplateType.bind(this)}
            />
          </KeyboardView>

          {/*<EditTemplatePreview {...this.props} />*/}
        </Container>
      );
    }

    return (
      <Container>
        <Header
          title="Loading Template..."
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
  drawer,
  billing,
  house,
  template,
  signature,
  settings
}) => {
  const { token, user } = auth;
  const { device, platform } = native;
  const { stats } = drawer;
  const { billing_addons } = billing;
  const { info } = house;
  const {
    editTemplate,
    originalTemplate,
    template_loading,
    html_templates,
    html_template_types,
    preview_image_front,
    preview_image_back
  } = template;
  const { signatures } = signature;
  const {
    edit_return_location,
    select_default_sending_options,
    colors
  } = settings;

  return {
    token,
    user,
    device,
    platform,
    stats,
    editTemplate,
    originalTemplate,
    template_loading,
    html_templates,
    html_template_types,
    preview_image_front,
    preview_image_back,
    signatures,
    edit_return_location,
    select_default_sending_options,
    info,
    colors
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
    setModal,
    toggleModal,
    changeTab,
    appRedirect,
    toggleActionSheet,
    templateFieldChanged,
    getTemplates,
    saveTemplate,
    setPreviewType,
    showTemplatePreview,
    setEditReturnLocation,
    signatureInit,
    reloadPreviews,
    templateInit
  }
)(EditTemplate);
