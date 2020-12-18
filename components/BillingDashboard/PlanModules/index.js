import React, { Component } from 'react';
import{
  Wrapper,
  Card,
  Title
} from 'app/NativeComponents/common';

import{
  PillButton
} from 'app/NativeComponents/snippets';

import {
  renderPrice
} from 'app/NativeActions';

import PlanModule from './PlanModule';

class PlanModules extends Component{

  render(){
    if(this.props.platform != "ios"){
      if(this.props.user.team_clearance_level > 0 || this.props.user.team_owner == 1){
        return(
          <Wrapper>
            <Wrapper style={{padding: 20}}>
              <Title>Products & Services: </Title>
            </Wrapper>
            <Card>
              <PlanModule
                title={"DealMachine CRM"}
                slug={"crm"}
                show_limits={true}
                loading={this.props.loading_lead_limits}
                current_limit={this.props.current_lead_limit}
                current_count={this.props.total_lead_count}
                limit_title={"Manage Leads"}

                {...this.props}
              />
              <PlanModule
                title={"DealMachine Street Engine"}
                slug={"driving"}
                show_limits={true}
                loading={this.props.loading_lead_limits}
                current_limit={this.props.driving_lead_limit}
                current_count={this.props.current_billing_cycle_driving_lead_count}
                limit_title={"Leads per month"}
                {...this.props}
              />

              <PlanModule
                title={"DealMachine List Engine"}
                slug={"lists"}
                show_limits={false}
                {...this.props}
              />
            </Card>

          </Wrapper>
        )
      }
    }

    return <Wrapper />;

  }

}


export default PlanModules;
