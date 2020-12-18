import React, { Component } from 'react';

import {
  Card,
  Wrapper
} from 'app/NativeComponents/common';
import {
  ToggleSwitch
} from 'app/NativeComponents/snippets';

class PermissionSettings extends Component{

  render(){



      if(this.props.edit_team_member.team_clearance_level == 1){
        return(
          <Wrapper>
            <Card>
              <ToggleSwitch
                value={this.props.edit_team_member.can_see_all_deals == 1 ? true : false}
                onChange={value => {
                  this.props.editTeamMember({ prop: "can_see_all_deals", value: value == true ? 1 : 0 })
                }}
                title={"Can See Other Team Member Properties?"}
                text={"This user will be able to view and edit all properties from your team."}
              />
              <ToggleSwitch
                value={this.props.edit_team_member.can_approve_mail == 1 ? true : false}
                onChange={value => {
                  this.props.editTeamMember({ prop: "can_approve_mail", value: value == true ? 1 : 0 })
                }}
                title={"Can Approve Mail?"}
                text={"This user will be able to start mailers."}
              />
              <ToggleSwitch
                value={this.props.edit_team_member.can_enhanced_search == 1 ? true : false}
                onChange={value => {
                  this.props.editTeamMember({ prop: "can_enhanced_search", value: value == true ? 1 : 0 })
                }}
                title={"Can Skip Trace?"}
                text={"This user will be able to trigger the enhanced search feature."}
              />
              <ToggleSwitch
                value={this.props.edit_team_member.can_edit_templates == 1 ? true : false}
                onChange={value => {
                  this.props.editTeamMember({ prop: "can_edit_templates", value: value == true ? 1 : 0 })
                }}
                title={"Can Edit & Create Templates/Campaigns?"}
                text={"This user will be able to edit existing templates/campaigns and create new ones."}
              />
              <ToggleSwitch
                value={this.props.edit_team_member.can_export_data == 1 ? true : false}
                onChange={value => {
                  this.props.editTeamMember({ prop: "can_export_data", value: value == true ? 1 : 0 })
                }}
                title={"Can Export Data?"}
                text={"This user will be export any data collected through DealMachine via the Web Application"}
              />


            </Card>
          </Wrapper>
        );
      }

      return <Wrapper />;

    }


}

export default PermissionSettings;
