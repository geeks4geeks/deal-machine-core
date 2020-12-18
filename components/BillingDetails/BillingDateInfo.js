import React, { Component } from 'react';
import{
  Wrapper,
  Title,
  Button,
  Row,
  Card,
  CardBody,
  Copy,
  Bold,
  ProgressBar
} from 'app/NativeComponents/common';


import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderDate,
  renderPrice,
  numberWithCommas
} from 'app/NativeActions';

import moment from 'moment'

class BillingDateInfo extends Component{

  renderTierCopy(){
    switch(parseInt(this.props.billing_details.plan_module_info.current_tier)){
      case -1:
        return "Paused Plan";
      break;

      case 1:
        return "Basic Plan"
      break;

      case 2:
        return "Professional Plan"
      break;

      case 3:
        return "Enterprise Plan"
      break;
    }
  }

  renderDealFinders(){
    if(this.props.billing_details.slug == "driving"){
      if(this.props.billing_details.plan_module_info.dealfinder_limit == -1){
        return(
          <Copy><Bold>{this.props.billing_details.plan_module_info.dealfinder_count} of unlimited DealFinders added to your account</Bold></Copy>
        )
      }else{
        return(
          <Copy><Bold>{this.props.billing_details.plan_module_info.dealfinder_count} of {this.props.billing_details.plan_module_info.dealfinder_limit} DealFinders added to your account</Bold></Copy>
        )
      }
    }
  }

  renderSeats(){
    if(this.props.billing_details.plan_module_info.team_member_limit == -1){
      return(
        <Copy><Bold>{this.props.billing_details.plan_module_info.team_member_count} of unlimited seats taken</Bold></Copy>
      )
    }else{
      return(
        <Copy><Bold>{this.props.billing_details.plan_module_info.team_member_count} of {this.props.billing_details.plan_module_info.team_member_limit} seats taken</Bold></Copy>
      )
    }
  }

  renderNextBillingDate(){
    if(moment(this.props.billing_details.plan_module_info.module_info.next_billing_date).format() < moment().format()){
      return <Copy>You will be billed today for <Bold>{renderPrice(this.props.billing_details.plan_module_info.module_info.plan_frequency == "annually" ? this.props.billing_details.plan_module_info.module_info.yearly_cost_cents : this.props.billing_details.plan_module_info.module_info.monthly_cost_cents)}</Bold></Copy>;
    }

    return <Copy>You will be billed next on <Bold>{renderDate(this.props.billing_details.plan_module_info.module_info.next_billing_date, true)}</Bold> for <Bold>{renderPrice(this.props.billing_details.plan_module_info.module_info.plan_frequency == "annually" ? this.props.billing_details.plan_module_info.module_info.yearly_cost_cents : this.props.billing_details.plan_module_info.module_info.monthly_cost_cents)}</Bold></Copy>;
  }

  renderSwitchButton(){
    if(this.props.billing_details.plan_module_info.tier == 2){
      return(
        <Button style={{alignSelf: "stretch", alignItems: "center", justifyContent: "center"}} onPress={()=>{
          this.props.setModal({
            title: "Switch To Basic?",
            description:
              "Are you sure you want to switch to the basic plan? Your plan will reflect the changes on your next billing cycle.",
            submit: "Switch To Basic",
            onPress: () => {
              this.props.updatePlan({
                token: this.props.token,
                plan: "basic",
                frequency: this.props.plan_frequency,
                slug: this.props.billing_details.slug,
                type: "switch_plan" });
            },
            cancel: "Nevermind. Not right now.",
            onCancel: () => {}
          });
          this.props.toggleModal({ show: true, type: "normal" });
        }}>
          <Copy>Switch to Basic</Copy>
        </Button>
      )
    }
  }

  renderCancelButton(){
    if(this.props.billing_details.plan_module_info.tier < 3){
      return(
        <Wrapper style={{paddingTop: 20}}>
          <Row style={{alignItems: "center"}}>
            <PillButton style={{margin: 0, marginRight: 15}} onPress={()=>{

              //set cancel center
              this.props.appRedirect({redirect: "cancel", payload:{slug: this.props.billing_details.slug}})
            }}>
              Cancel Renewal
            </PillButton>

            {this.renderSwitchButton()}
          </Row>
        </Wrapper>
      )
    }
  }

  renderLimits(){
    if(this.props.billing_details.current_limit == -1){
      return(
        <Wrapper style={{marginTop: 20}}>
          <Copy>Unlimited {this.props.billing_details.limit_title}</Copy>
        </Wrapper>
      )
    }else if(this.props.billing_details.show_limits &&
      this.props.billing_details.current_limit > 0 && this.props.billing_details.current_limit
    ){

      let count = this.props.billing_details.current_count;
      if(count > this.props.billing_details.current_limit){
        count = this.props.billing_details.current_limit
      }

      return(
        <Wrapper style={{marginTop: 20}}>
          <ProgressBar
            color={this.props.colors.success_color}
            width={200}
            progress={parseInt(count)/parseInt(this.props.billing_details.current_limit)}
          />
          <Copy><Bold>{numberWithCommas(this.props.billing_details.current_count)} / {numberWithCommas(this.props.billing_details.current_limit)} {this.props.billing_details.limit_title}</Bold></Copy>
        </Wrapper>
      )
    }
  }

  render(){
    if(this.props.billing_details.plan_module_info){
      if(this.props.billing_details.plan_module_info.approved_to_charge == 1 &&
        this.props.billing_details.plan_module_info.canceled != 1 &&
        this.props.billing_details.plan_module_info.paused != 1){

        return(
          <Card>
            <CardBody>
              <Title>You're on the {this.renderTierCopy()}</Title>
              <Copy>{this.props.billing_details.plan_module_info.module_info.plan_frequency == "annually" ? "Billed Annually" : "Billed Monthly"}</Copy>
              <Wrapper style={{padding: 20}}>
                {this.renderSeats()}
                {this.renderDealFinders()}
                {this.renderLimits()}
              </Wrapper>
              {this.renderNextBillingDate()}

              {this.renderCancelButton()}
            </CardBody>
          </Card>
        )

      }
    }
    return <Wrapper/>
  }
}


export default BillingDateInfo;
