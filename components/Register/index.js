import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, KeyboardView, Spinner } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import {
  /*mobile*/
  toggleCanPop,
  authFieldChanged,
  registerUser,
  appRedirect,
  getUser,
  getStats,

  /*common functions*/
  dismissMobileKeyboard
} from "app/NativeActions";

import Body from "./Body";

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      promoText: "",
      defaultPromoText: this.props.user_info.promoText
    };
  }

  handleChange(value) {
    this.setState({
      promoText: value,
      defaultPromoText: ""
    });
  }

  componentDidMount() {
    if (this.props.device == "mobile") {
      this.props.toggleCanPop("normal");
    } else if (this.props.device == "desktop") {
      /* redirect if logged in */
      const token = window.localStorage.getItem("token");
      if (token != null && !this.props.no_redirect) {
        this.props.getUser({
          token,
          device: this.props.device,
          redirect: true
        });
        //this.props.getStats({ token });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user_info) {
      if (prevProps.user_info.promoText != prevProps.user_info.promoText) {
        this.setState({
          promoText: "",
          defaultPromoText: this.props.user_info.promoText
        });
      }
    }
  }

  handleBack() {
    /* mobile */
    dismissMobileKeyboard();
    this.props.appRedirect({
      redirect: "goBack",
      payload: { type: "getStarted" }
    });
  }


  register() {
    /* mobile */
    dismissMobileKeyboard();

    var check_phone = 1;

    const {
      email,
      password,
      phone,
      city,
      firstname,
      lastname,
      company,
      promoText,
      user_info,
      accepted_terms,
      device,

      dealfinder_team_id = null
    } = this.props;

    this.props.registerUser({
      email:
        this.props.email && this.props.email != ""
          ? this.props.email
          : this.props.user_info.email,
      password,
      phone,
      city,
      check_phone,
      firstname,
      lastname,
      company,
      accepted_terms,
      promo: this.state.promoText && this.state.promoText != "" ? this.state.promoText : this.state.defaultPromoText,
      from_campaign: user_info.from_campaign,
      from_source: user_info.from_source,
      branch_id: user_info.branch_id,
      team_id: dealfinder_team_id,
      affiliate_partner: this.props.affiliate_partner ? 1 : 0,
      device
    });
  }

  checkIfNeedsToSave() {
    if (
      (this.props.email && this.props.email != "") ||
      (!this.props.email &&
        this.props.email == "" &&
        (this.props.user_info.email && this.props.user_info.email != "")) ||
      (this.props.firstname && this.props.firstname != "") ||
      (this.props.lastname && this.props.lastname != "") ||
      (this.props.company && this.props.company != "") ||
      (this.props.city && this.props.city != "") ||
      (this.state.defaultPromoText && this.state.defaultPromoText != "") ||
      (this.props.password && this.props.password != "")
    ) {
      return true;
    }

    return false;
  }

  renderSpinner() {
    if (this.props.loading) {
      return <Spinner />;
    }
  }

  render() {
    if (this.props.no_container) {
      return (
        <Body
          {...this.props}
          register={this.register.bind(this)}
          checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
          handleBack={this.handleBack.bind(this)}
          handleChange={this.handleChange.bind(this)}
          promoText={this.state.promoText}
          defaultPromoText={this.state.defaultPromoText}
        />
      );
    }
    return (
      <Container>
        <Header
          title={
            this.props.user_info.signup_type == "team_invite"
              ? "Join " + this.props.user_info.team_name + "'s Team"
              : "Create Your Account"
          }
          backgroundColor="transparent"
          leftButtonIcon={"arrow-back"}
          leftButtonAction={this.handleBack.bind(this)}
          rightButtonIcon={this.checkIfNeedsToSave() ? "check" : ""}
          rightButtonAction={
            this.checkIfNeedsToSave() ? this.register.bind(this) : () => {}
          }
        />
        <KeyboardView>
          <Body
            {...this.props}
            register={this.register.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            handleBack={this.handleBack.bind(this)}
            handleChange={this.handleChange.bind(this)}
            promoText={this.state.promoText}
            defaultPromoText={this.state.defaultPromoText}
          />
        </KeyboardView>
        {this.renderSpinner()}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, marketing, native }) => {
  const {
    signup_type,
    signup_team_name,
    signup_team_company,

    email,
    phone,
    city,
    password,
    firstname,
    lastname,
    company,
    loading,
    accepted_terms,
    from_campaign,
    from_source
  } = auth;

  const { user_info, partner_info } = marketing;

  const { device } = native;
  return {
    email,
    phone,
    city,
    password,
    firstname,
    lastname,
    company,
    accepted_terms,
    loading,
    device,
    user_info,
    partner_info
  };
};

export default connect(
  mapStateToProps,
  {
    /*mobile*/
    toggleCanPop,
    appRedirect,

    getUser,
    getStats,

    authFieldChanged,
    registerUser
  }
)(Register);
