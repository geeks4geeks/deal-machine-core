import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, WebContainer, Wrapper, Spin } from 'app/NativeComponents/common';
import { Header } from 'app/NativeComponents/snippets';

import Body from './Body';

import {
  toggleActionSheet,
  appRedirect,
  changeTab,
  getPausePlanInfo,
  pauseOrCancelPlan,
  setModal,
  toggleModal,

  /*common functions*/
  dismissMobileKeyboard
} from 'app/NativeActions';

class RetentionCenter extends Component{

  constructor(props){
    super(props);
    this.state = {
      selected_option: null,
      canceled_reason: "",
      canceled_reason_title: "",
      is_canceling: false
    }

    this.handleBack = this.handleBack.bind(this);
    this.pauseMyPlan = this.pauseMyPlan.bind(this);
    this.cancelMyPlan = this.cancelMyPlan.bind(this);
    this.startCancelPlan = this.startCancelPlan.bind(this);
    this.updateCanceledReason = this.updateCanceledReason.bind(this);
    this.selectCancelOption = this.selectCancelOption.bind(this);
  }


  selectCancelOption(selected_option, toggle = true){
    this.setState({
      selected_option: selected_option
    })
  }
  updateCanceledReason(value){
    this.setState({
      canceled_reason: value
    })
  }

  componentDidMount(){
    /*mobile*/
    if(!this.props.billing_details){
      this.props.appRedirect({redirect: "dashboard"});
    }else{
      if(this.props.user.team_owner != 1 && this.props.user.team_clearance_level < 2){
        this.props.appRedirect({redirect: "goBack", payload:{type: "settings"}});
      }else{
        this.props.getPausePlanInfo({token: this.props.token, module_type: this.props.billing_details.slug})
      }
      this.props.changeTab("settings");
    }
  }

  handleBack(){
    this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}});
  }

  pauseMyPlan(){
    this.props.setModal({
      title: "Pause Plan and Save Data",
      description: 'This is not a trial, it will change your plan and make a prorated difference immediately. Sound good?',
      icon: "",
      submit: 'Pause Plan and Save Data',
      //buttonType: "destroy",
      onPress: ()=>{
        this.props.pauseOrCancelPlan({
          token: this.props.token,
          type: "pause",
          module_type: this.props.billing_details.slug,
          canceled_reason: this.state.selected_option.title
        });
      },
      cancel: 'Nevermind. I want to keep my plan.',
      onCancel: ()=>{
        this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}})
      }
    });
    this.props.toggleModal({show: true, type: "normal"});
  }

  startCancelPlan(reason){
    this.setState({
      is_canceling: true,
      canceled_reason_title: reason
    })
  }

  cancelMyPlan(){

    this.props.setModal({
      title: "Cancel and Delete My "+this.props.billing_details.plan_module_title+" Plan",
      description: 'Are you sure? The following information will be permanently deleted at the end of your billing cycle.',
      icon: "",
      submit: 'Delete My Plan',
      buttonType: "destroy",
      onPress: ()=>{
        this.props.pauseOrCancelPlan({
          token: this.props.token,
          type: "cancel",
          module_type: this.props.billing_details.slug,
          canceled_reason: this.state.canceled_reason && this.state.canceled_reason != "" ? this.state.selected_option.title+" - "+this.state.canceled_reason_title+" - "+this.state.canceled_reason : ""
        });
      },
      cancel: 'Nevermind. I want to keep my account.',
      onCancel: ()=>{
        this.props.appRedirect({redirect: "goBack", payload:{type: "billing"}})
      }
    });
    this.props.toggleModal({show: true, type: "normal"});

  }

  render(){


    if(this.props.pause_plan_info_loading && this.props.billing_details){
      return(
        <Container>
          <Header
            title="Cancel Service"
            leftButtonIcon="close"
            leftButtonAction={this.handleBack}
          />
          <WebContainer>
            <Wrapper style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 20
            }}>
              <Spin />
            </Wrapper>
          </WebContainer>
        </Container>
      );
    }

    return(
      <Container>
        <Header
          title="Cancel Service"
          leftButtonIcon="close"
          leftButtonAction={this.handleBack}
        />
        <WebContainer>
          <Body
            {...this.props}
            selectCancelOption={this.selectCancelOption}
            selected_option={this.state.selected_option}
            pauseMyPlan={this.pauseMyPlan}
            cancelMyPlan={this.cancelMyPlan}
            is_canceling={this.state.is_canceling}
            startCancelPlan={this.startCancelPlan}
            canceled_reason={this.state.canceled_reason}
            updateCanceledReason={this.updateCanceledReason}
          />
        </WebContainer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth, settings, drawer, billing, native }) => {
  const { token, user } = auth;
  const { colors } = settings;
  const { stats } = drawer;
  const { pause_plan_info, pause_plan_info_loading, billing_details } = billing;
  const { device } = native;

  return {
    token,
    user,
    colors,
    stats,
    pause_plan_info,
    pause_plan_info_loading,
    billing_details,
    device
  }
}



export default connect(mapStateToProps, {
  toggleActionSheet,
  appRedirect,
  changeTab,
  getPausePlanInfo,
  pauseOrCancelPlan,
  setModal,
  toggleModal,
})(RetentionCenter);
