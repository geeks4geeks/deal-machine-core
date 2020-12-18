import React, { Component } from 'react';
import{
  Wrapper,
  Title,
  Card,
  CardBody,
  Copy
} from 'app/NativeComponents/common';


import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderDate,
  openUrl
} from 'app/NativeActions';

class FreeTrialInfo extends Component{

  render(){
    if(this.props.billing_details.plan_module_info){
      if(!this.props.billing_details.plan_module_info.is_trial_over &&
        this.props.billing_details.plan_module_info.canceled != 1 &&
        this.props.billing_details.plan_module_info.paused != 1){
        return(
          <Card>
            <CardBody>
              <Wrapper style={{marginBottom: 20}}>
                <Title>{this.props.billing_details.plan_module_info.module_info.free_trial_info.days_left == 1 ? "You have 1 day left on your free trial." : "You have "+this.props.billing_details.plan_module_info.module_info.free_trial_info.days_left+" days left on your free trial."}</Title>
                <Copy>Your free trial ends {renderDate(this.props.billing_details.plan_module_info.module_info.free_trial_info.trial_end_date)}.</Copy>
              </Wrapper>
              <PillButton primary={true} style={{margin: 0}} onPress={()=>{
                openUrl("https://dealmachine.com/talk-to-sales")
              }}>
                Talk To Sales
              </PillButton>
            </CardBody>
          </Card>
        )
      }else if(this.props.billing_details.plan_module_info.is_trial_over && this.props.billing_details.plan_module_info.approved_to_charge == 0){
        return(
          <Card>
            <CardBody>
              <Wrapper style={{marginBottom: 20}}>
                <Title>Your free trial is over.</Title>
                <Copy>Talk to sales to activate your account.</Copy>
              </Wrapper>
              <PillButton primary={true} style={{margin: 0}} onPress={()=>{
                openUrl("https://dealmachine.com/talk-to-sales")
              }}>
                Talk To Sales
              </PillButton>
            </CardBody>
          </Card>
        )
      }
    }
    return <Wrapper/>
  }
}


export default FreeTrialInfo;
