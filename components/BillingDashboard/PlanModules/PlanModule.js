import React, { Component } from 'react';
import{
  Wrapper,
  Title,
  Copy,
  Row,
  ProgressBar
} from 'app/NativeComponents/common';

import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderPrice,
  numberWithCommas,
  openUrl,
  checkIfUserHasModule
} from 'app/NativeActions';

class PlanModule extends Component{

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: props.slug})
    this.state = {
      plan_module_info: plan_module_info
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: this.props.slug});
        this.setState({plan_module_info: plan_module_info})
      }
    }
  }

  renderCopy(){
    if(this.props.slug !== "crm"){
      if(this.state.plan_module_info.team_has_module && this.state.plan_module_info.canceled != 1 && this.state.plan_module_info.paused != 1){
        switch(parseInt(this.state.plan_module_info.current_tier)){
          case -1:
            return <Copy>Paused Plan</Copy>;
          break;

          case 1:
            return <Copy>Basic Plan</Copy>;
          break;

          case 2:
            return <Copy>Professional Plan</Copy>;
          break;

          case 3:
            return <Copy>Enterprise Plan</Copy>;
          break;
        }
      }else if(this.state.plan_module_info.canceled == 1){
        return <Copy>Canceled Plan</Copy>;
      }else if(this.state.plan_module_info.paused == 1){
        return <Copy>Paused Plan</Copy>;
      }

    }else{

      if(this.props.loading){
        return <Wrapper />
      }

      if(this.props.additional_limit_price > 0){
        return <Copy>{renderPrice(this.props.additional_limit_price)} per month</Copy>;;
      }

      return <Copy>Free</Copy>;;
    }
  }

  renderFreeTrialCopy(){

  }

  renderBuyButton(){
    if(this.props.slug !== "crm"){
      if(this.state.plan_module_info.team_has_module &&
        this.state.plan_module_info.canceled != 1 &&
        this.state.plan_module_info.paused != 1
      ){

        if(this.state.plan_module_info.current_tier == 1){
          return(
            <PillButton onPress={()=>{
              this.props.setFeatureModal({
                slug: this.props.slug,
                require_tier: 2
              })
              this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
            }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
              Upgrade To Professional
            </PillButton>
          )
        }else if(this.state.plan_module_info.current_tier == 2){
          return(
            <PillButton onPress={()=>{
              this.props.setFeatureModal({
                slug: this.props.slug,
                require_tier: 3
              })
              this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
            }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
              Upgrade To Enterprise
            </PillButton>
          )
        }

      }else if(this.state.plan_module_info.canceled == 1){
        if(this.state.plan_module_info.canceled_access){
          return(
            <PillButton onPress={()=>{
              this.props.setFeatureModal({
                slug: this.props.slug,
                require_tier: this.state.plan_module_info.current_tier
              })
              this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
            }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
              Reactivate
            </PillButton>
          )
        }
        return(
          <PillButton onPress={()=>{
            this.props.setFeatureModal({
              slug: this.props.slug
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
          }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
            Get Feature
          </PillButton>
        )
      }else if(this.state.plan_module_info.paused == 1){
        return(
          <PillButton onPress={()=>{
            this.props.setFeatureModal({
              slug: this.props.slug,
              require_tier: this.state.plan_module_info.current_tier
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
          }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
            Reactivate
          </PillButton>
        )
      }else{
        return(
          <PillButton onPress={()=>{
            this.props.setFeatureModal({
              slug: this.props.slug
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
          }} primary={true} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 5}}>
            Get Feature
          </PillButton>
        )
      }
    }
  }

  renderDetailsButton(){
    if(this.props.slug !== "crm"){
      if((this.state.plan_module_info.team_has_module && this.state.plan_module_info.canceled_access)
      || (this.state.plan_module_info.paused == 1 && this.state.plan_module_info.canceled != 1)
      ){
        return(
          <PillButton onPress={()=>{
            this.props.setBillingDetails({
              title: this.props.title+" Billing Details",
              plan_module_title: this.props.title,
              slug: this.props.slug,
              show_limits: this.props.show_limits,
              plan_module_info: this.state.plan_module_info,
              current_count: this.props.current_count,
              current_limit: this.props.current_limit,
              limit_title: this.props.limit_title
            })
            this.props.appRedirect({redirect: "goForward", payload:{add: "billing-details"}})
          }} innerStyle={{padding: 5, paddingRight: 15, paddingLeft: 15}} style={{margin: 0, marginRight: 0}}>
            Billing Details
          </PillButton>
        )
      }
    }
  }

  renderLimits(){

    if(this.props.current_limit == -1){
      return(
        <Copy>Unlimited {this.props.limit_title}</Copy>
      )
    }else if(this.props.show_limits && !this.props.loading &&
      this.props.current_limit > 0 && this.props.current_limit
    ){

      let count = this.props.current_count;
      if(count > this.props.current_limit){
        count = this.props.current_limit
      }

      return(
        <Wrapper>
          <ProgressBar
            color={this.props.colors.success_color}
            width={200}
            progress={parseInt(count)/parseInt(this.props.current_limit)}
          />
          <Copy>{numberWithCommas(this.props.current_count)} / {numberWithCommas(this.props.current_limit)} {this.props.limit_title}</Copy>
        </Wrapper>
      )
    }
  }

  render(){

    return (
      <Wrapper style={{padding: 20, borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color }}>
        <Wrapper style={{paddingBottom: this.props.slug == "crm" ? 0 : 20}}>
          <Title>{this.props.title}</Title>
          {this.renderCopy()}
          {this.renderLimits()}
        </Wrapper>
        <Wrapper>
          <Row>
            {this.renderBuyButton()}
            {this.renderDetailsButton()}
          </Row>
        </Wrapper>
      </Wrapper>
    );

  }

}


export default PlanModule;
