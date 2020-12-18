import React, { Component } from "react";
import { connect } from "react-redux";

import { ModalContainer, KeyboardView, Wrapper, Title, Copy, Bold } from "app/NativeComponents/common";
import { Header } from "app/NativeComponents/snippets";

import {
  appRedirect,
  setModal,
  toggleModal,
  setBillingDetails,
  setFeatureModal,
  updatePlan,

  checkIfUserHasModule
} from "app/NativeActions";

import FreeTrialInfo from './FreeTrialInfo';
import BillingDateInfo from './BillingDateInfo';
import CanceledInfo from './CanceledInfo';
import PausedInfo from './PausedInfo';

class BillingDetails extends Component {

  componentDidMount() {

    if(!this.props.billing_details){
      this.handleBack();
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if(this.props.billing_details, prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: this.props.billing_details.slug});
        this.props.setBillingDetails({
          ...this.props.billing_details,
          plan_module_info: plan_module_info
        })
      }
    }
  }


  handleBack() {
    this.props.appRedirect({
      redirect: "goBack",
      payload: { remove: "billing-details" }
    });
  }

  render() {
    if(this.props.billing_details){
      return (
        <ModalContainer>
          <Header
            title={this.props.billing_details.title}
            leftButtonIcon={"arrow-back"}
            leftButtonAction={this.handleBack.bind(this)}
          />
          <KeyboardView>
            <Wrapper>

              <FreeTrialInfo {...this.props}/>

              <BillingDateInfo {...this.props} />
              <CanceledInfo {...this.props} />
              <PausedInfo {...this.props} />

            </Wrapper>
          </KeyboardView>
        </ModalContainer>
      );
    }
    return <Wrapper />
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
    billing_details,
    plan_modules,
    plan_frequency
  } = billing;
  return {
    token,
    user,
    device, platform, isMobile,
    plan_modules,
    plan_frequency,
    billing_details,
    colors
  };
};

export default connect(
  mapStateToProps,
  {
    appRedirect,
    setModal,
    toggleModal,
    setBillingDetails,
    updatePlan,
    setFeatureModal
  }
)(BillingDetails);
