import React, { Component } from 'react';
import{
  Wrapper,
  Title,
  Card,
  Bold,
  CardBody,
  Row,
  Copy
} from 'app/NativeComponents/common';


import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderDate
} from 'app/NativeActions';

import moment from 'moment';

class PausedInfo extends Component{

  renderNextBillingDate(){


    if(moment(this.props.billing_details.plan_module_info.module_info.next_billing_date).format() < moment().format()){
      return <Copy>You no longer have access to these services. Your data is still here. You can resume your plan at any time.</Copy>;
    }
    return <Copy>You will have access to these services until <Bold>{renderDate(this.props.billing_details.plan_module_info.module_info.next_billing_date, true)}</Bold>. Afterward, your services will be paused however your data will be saved. You can resume your plan at any time.</Copy>;
  }

  render(){
    if(this.props.billing_details.plan_module_info.canceled != 1 && this.props.billing_details.plan_module_info.paused == 1){
      return(
        <Card>
          <CardBody>
            <Wrapper style={{marginBottom: 20}}>
              <Title>You paused this service.</Title>
              {this.renderNextBillingDate()}
            </Wrapper>
            <Row>
              <PillButton primary={true} style={{margin: 0, marginRight: 5}} onPress={()=>{
                this.props.setFeatureModal({
                  slug: this.props.billing_details.slug,
                  require_tier: this.props.billing_details.plan_module_info.current_tier
                })
                this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
              }}>
                Reactivate
              </PillButton>
              <PillButton style={{margin: 0}} onPress={()=>{
                this.props.appRedirect({redirect: "cancel", payload:{slug: this.props.billing_details.slug}})
              }}>
                Cancel Plan
              </PillButton>
            </Row>
          </CardBody>
        </Card>
      )
    }
    return <Wrapper/>
  }
}


export default PausedInfo;
