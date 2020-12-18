import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Wrapper, CardBody, Copy } from 'app/NativeComponents/common';

import ClearanceLevel from './ClearanceLevel';
import PermissionSettings from './PermissionSettings';
import SaveButton from './SaveButton';

import {
  checkIfUserHasModule
} from 'app/NativeActions'

class Permissions extends Component {


  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.user, slug: "driving"})

    this.state = {
      plan_module_info: plan_module_info,
      edit_team_member: {
        ...props.active_team_member,
        can_approve_mail: props.active_team_member.team_clearance_level == 1 ? props.active_team_member.can_approve_mail : 1,
        can_enhanced_search: props.active_team_member.team_clearance_level == 1 ? props.active_team_member.can_enhanced_search : 1,
        can_edit_templates: props.active_team_member.team_clearance_level == 1 ? props.active_team_member.can_edit_templates : 1,
        can_see_all_deals: props.active_team_member.team_clearance_level == 1 ? props.active_team_member.can_see_all_deals : 1,
        can_export_data: props.active_team_member.team_clearance_level == 1 ? props.active_team_member.can_export_data : 1
      }
    }
  }

  editTeamMember({prop, value}){
    this.setState({
      edit_team_member: {
        ...this.state.edit_team_member,
        [prop]: value
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.active_team_member.id !== prevState.edit_team_member.id){
      this.setState({
        edit_team_member: {
          ...this.props.active_team_member,
          can_approve_mail: this.props.active_team_member.team_clearance_level == 1 ? this.props.active_team_member.can_approve_mail : 1,
          can_enhanced_search: this.props.active_team_member.team_clearance_level == 1 ? this.props.active_team_member.can_enhanced_search : 1,
          can_edit_templates: this.props.active_team_member.team_clearance_level == 1 ? this.props.active_team_member.can_edit_templates : 1,
          can_see_all_deals: this.props.active_team_member.team_clearance_level == 1 ? this.props.active_team_member.can_see_all_deals : 1,
          can_export_data: this.props.active_team_member.team_clearance_level == 1 ? this.props.active_team_member.can_export_data : 1
        }
      })
    }

    if(prevProps.user && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules || this.props.user.plan_modules !== prevProps.user.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.user, slug: "driving"});
        this.setState({plan_module_info: plan_module_info})
      }
    }
  }

  checkIfNeedsToSave(){
    if(this.props.active_team_member.team_clearance_level != this.state.edit_team_member.team_clearance_level ||
      this.props.active_team_member.can_approve_mail != this.state.edit_team_member.can_approve_mail ||
      this.props.active_team_member.can_enhanced_search != this.state.edit_team_member.can_enhanced_search ||
      this.props.active_team_member.can_see_all_deals != this.state.edit_team_member.can_see_all_deals ||
      this.props.active_team_member.can_edit_templates != this.state.edit_team_member.can_edit_templates ||
      this.props.active_team_member.can_export_data != this.state.edit_team_member.can_export_data
    ){
      return true;
    }

    return false;
  }

  savePermissions(){
    this.props.updateTeamMembers({
      token: this.props.token,
      type: "edit_permissions",
      team_member_id: this.props.active_team_member.id,
      member_type: "team_member",
      team_clearance_level: this.state.edit_team_member.team_clearance_level,
      can_approve_mail: this.state.edit_team_member.can_approve_mail,
      can_enhanced_search: this.state.edit_team_member.can_enhanced_search,
      can_see_all_deals: this.state.edit_team_member.can_see_all_deals,
      can_edit_templates: this.state.edit_team_member.can_edit_templates,
      can_export_data: this.state.edit_team_member.can_export_data
    })
  }

  render(){


    if(this.props.tab == "permissions"){

      if(this.props.active_team_member.id == this.props.user.id){
        return(
          <CardBody style={{paddingTop: 10, alignItems:"center", justifyContent:"center"}}>
            <Copy style={{textAlign: "center"}}>You cannot edit your own permissions</Copy>
          </CardBody>
        )
      }else if(this.props.active_team_member.team_owner == 1){
        return(
          <CardBody style={{paddingTop: 10, alignItems:"center", justifyContent:"center"}}>
            <Copy style={{textAlign: "center"}}>You cannot edit the team leader's permissions</Copy>
          </CardBody>
        )
      }

      if(this.props.user.team_clearance_level < 2){
        return(
          <CardBody style={{paddingTop: 10, alignItems:"center", justifyContent:"center"}}>
            <Copy style={{textAlign: "center"}}>Only Team Admins can edit user permissions.</Copy>
          </CardBody>
        )
      }

      return(
        <CardBody style={{paddingTop: 0}}>
          <ClearanceLevel
            {...this.props}
            plan_module_info={this.state.plan_module_info}
            edit_team_member={this.state.edit_team_member}
            editTeamMember={this.editTeamMember.bind(this)}
          />
          <PermissionSettings
            edit_team_member={this.state.edit_team_member}
            editTeamMember={this.editTeamMember.bind(this)}
            {...this.props}
          />
          <SaveButton
            savePermissions={this.savePermissions.bind(this)}
            checkIfNeedsToSave={this.checkIfNeedsToSave.bind(this)}
            {...this.props}
          />

        </CardBody>
      )
    }

    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, billing }) => {
  const { token, user } = auth;
  const { plan_modules, card_info } = billing;
  return {
    token,
    user,
    plan_modules,
    card_info
  };
}

export default connect(mapStateToProps, {

})(Permissions);
