import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Wrapper,
  Copy
} from 'app/NativeComponents/common';

import {
  RadioButton
} from 'app/NativeComponents/snippets';



class ClearanceLevel extends Component{

  renderDealFinderOption(){


    if(this.props.plan_module_info.has_module &&
      this.props.card_info.bad_card != 1){

      let number_of_seats = "";
      if(this.props.plan_module_info.dealfinder_limit == -1){
        number_of_seats = this.props.plan_module_info.dealfinder_count+" of unlimited seats taken.";
      }else{
        number_of_seats = this.props.plan_module_info.dealfinder_count+" of "+this.props.plan_module_info.dealfinder_limit+" seats taken.";
      }

      return(
        <RadioButton
          onPress={()=>{
            this.props.editTeamMember({
              prop: "team_clearance_level",
              value: 0
            })
          }}
          value={this.props.edit_team_member.team_clearance_level == 0 ? true : false}
          title={"DealFinder"}
          text={"Can only see their deals. Limited to DealMachine Street Engine. "+number_of_seats}
          style={{borderBottomColor: this.props.colors.border_color, borderBottomWidth: 1, borderBottomStyle: "solid"}}
        />
      )
    }
  }

  render(){

      return(
        <Wrapper>
          <Card>
            {this.renderDealFinderOption()}
            <RadioButton
              onPress={()=>{
                this.props.editTeamMember({
                  prop: "team_clearance_level",
                  value: 1
                })
              }}
              value={this.props.edit_team_member.team_clearance_level == 1 ? true : false}
              title={"Partner"}
              text={"Can see all team deals. Access to DealMachine CRM"}
              style={{borderBottomColor: this.props.colors.border_color, borderBottomWidth: 1, borderBottomStyle: "solid"}}
            />
            <RadioButton
              onPress={()=>{
                this.props.editTeamMember({
                  prop: "team_clearance_level",
                  value: 2
                })
              }}
              value={this.props.edit_team_member.team_clearance_level == 2 ? true : false}
              title={"Admin"}
              text={"Can edit and add team members. Access to billing."}
            />
          </Card>
        </Wrapper>
      );

  }
}

export default ClearanceLevel;
