import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Title, Copy } from 'app/NativeComponents/common';
import { MenuItem } from 'app/NativeComponents/snippets';

import {
  toTitleCase
} from 'app/DealMachineCore/actions';

class BillingOptions extends Component{

  renderTeamInfo(){
    if(this.props.user.team_clearance_level == 0){
      return(
        <Card>
          <CardBody>
            <Title>Your Team Leader's Contact Information</Title>
              <Copy>{toTitleCase(this.props.user.team_name)}</Copy>
              <Copy>{this.props.user.team_phone}</Copy>
              <Copy>{this.props.user.team_email}</Copy>
          </CardBody>
        </Card>
      )
    }
  }

  render(){

    if(this.props.user.team_owner == 1 && this.props.platform != "ios"){


      return (
        <Card>
          <MenuItem
            style={{
              borderBottomWidth: 1,
              borderBottomColor: this.props.colors.border_color,
              borderBottomStyle: "solid"
            }}
            to="/app/settings/account"
            onPress={()=>this.props.appRedirect({redirect: "account"})}
            title="Profile"
            text={this.props.user.email}
          />

          <MenuItem
          style={{
            borderBottomWidth: 1,
            borderBottomColor: this.props.colors.border_color,
            borderBottomStyle: "solid"
          }}
            to="/app/settings/billing"
            onPress={()=>this.props.appRedirect({redirect: "billing"})}
            title="Billing"
            text={"Manage your account"/*this.props.stats.billing.plan_name*/}
          />

        </Card>
      );
    }

    return (
      <Wrapper>
      <Card>
        <MenuItem
        style={{
          borderBottomWidth: 1,
          borderBottomColor: this.props.colors.border_color,
          borderBottomStyle: "solid"
        }}
          to="/app/settings/account"
          onPress={()=>this.props.appRedirect({redirect: "account"})}
          title="Profile"
          text={this.props.user.email}
        />

      </Card>
      {this.renderTeamInfo()}
      </Wrapper>

    );


  }

}

export default BillingOptions;
