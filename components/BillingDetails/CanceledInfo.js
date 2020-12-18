import React, { Component } from 'react';
import{
  Wrapper,
  Title,
  Card,
  CardBody,
  Bold,
  Copy
} from 'app/NativeComponents/common';


import{
  PillButton
} from 'app/NativeComponents/snippets';


import {
  renderDate
} from 'app/NativeActions';

import moment from 'moment';

class CanceledInfo extends Component{

  renderNextBillingDate(){
    if(moment(this.props.billing_details.plan_module_info.module_info.next_billing_date).format() < moment().format()){
      return <Copy>You no longer have access to these services.</Copy>;
    }
    return <Copy>You will have access to these services until <Bold>{renderDate(this.props.billing_details.plan_module_info.module_info.next_billing_date, true)}</Bold></Copy>;
  }

  render(){
    if(this.props.billing_details.plan_module_info.canceled == 1){

      if(this.props.billing_details.plan_module_info.canceled_access){
        return(
          <Card>
            <CardBody>
              <Wrapper style={{marginBottom: 20}}>
                <Title>You canceled this service.</Title>
                {this.renderNextBillingDate()}
              </Wrapper>
              <PillButton primary={true} style={{margin: 0}} onPress={()=>{
                this.props.setFeatureModal({
                  slug: this.props.billing_details.slug,
                  require_tier: this.props.billing_details.plan_module_info.current_tier
                })
                this.props.appRedirect({redirect: "goForward", payload:{add: "get-feature"}})
              }}>
                Reactivate
              </PillButton>
            </CardBody>
          </Card>
        )
      }
    }
    return <Wrapper/>
  }
}


export default CanceledInfo;
