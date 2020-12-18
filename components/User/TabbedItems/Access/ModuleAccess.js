import React, { Component } from 'react';

import {
  Wrapper,
  CardBody,
  Row,
  Title,
  Icon,
  Copy
} from 'app/NativeComponents/common';

import {
  PillButton
} from 'app/NativeComponents/snippets';

import {
  checkIfUserHasModule
} from 'app/NativeActions';

class ModuleAccess extends Component{

  constructor(props){
    super(props);
    const plan_module_info = checkIfUserHasModule({plan_modules: props.plan_modules, user: props.active_team_member, slug: this.props.slug})

    this.state = {
      plan_module_info: plan_module_info
    }
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps.active_team_member && prevProps.plan_modules){
      if(this.props.plan_modules !== prevProps.plan_modules ||
        this.props.active_team_member.plan_modules !== prevProps.active_team_member.plan_modules){
        const plan_module_info = checkIfUserHasModule({plan_modules: this.props.plan_modules, user: this.props.active_team_member, slug: this.props.slug});
        this.setState({plan_module_info: plan_module_info})
      }
    }
  }


  renderAccessText(){

    if(this.props.active_team_member.team_clearance_level > 0){

      if(this.props.slug == "crm"){
        return <Copy>Full Access</Copy>
      }

      if(this.state.plan_module_info.user_has_module){
        return (
          <Row>
            <Copy style={{marginRight: 10}}>Full Access</Copy>
            <PillButton style={{margin: 0}} innerStyle={{paddingTop: 5, paddingBottom:5}} onPress={()=>{
              this.props.setModal({
                title: "Remove Access",
                description: "Are you sure you want to remove access to this feature for "+this.props.active_team_member.firstname+" "+this.props.active_team_member.lastname,
                submit: "Remove Access",
                buttonType: "destroy",
                onPress: ()=>{
                  this.props.updateTeamMembers({
                    token: this.props.token,
                    type: "remove_access",
                    module_type: this.props.slug,
                    team_member_id: this.props.active_team_member.id,
                    member_type: "team_member"
                  })
                },
                cancel: 'Cancel',
                onCancel: ()=>{}
              });
              this.props.toggleModal({show: true, type: "normal"});
            }}>
              Remove Access
            </PillButton>
          </Row>
        )
      }else if(this.state.plan_module_info.team_has_module){
        return (
          <Row>
            <Copy style={{marginRight: 10}}>No Access</Copy>
            <PillButton style={{margin: 0}} primary={true} innerStyle={{paddingTop: 5, paddingBottom:5}} onPress={()=>{
              this.props.setModal({
                title: "Grant Access",
                description: "Are you sure you want to grant access to this feature for "+this.props.active_team_member.firstname+" "+this.props.active_team_member.lastname,
                submit: "Grant Access",
                onPress: ()=>{
                  this.props.updateTeamMembers({
                    token: this.props.token,
                    type: "grant_access",
                    module_type: this.props.slug,
                    team_member_id: this.props.active_team_member.id,
                    member_type: "team_member"
                  })
                },
                cancel: 'Cancel',
                onCancel: ()=>{}
              });
              this.props.toggleModal({show: true, type: "normal"});
            }}>
              Grant Access
            </PillButton>
          </Row>

        )
        return
      }

    }else if(this.props.slug == "driving"){
      return <Copy>Limited Access</Copy>
    }else if(this.props.active_team_member.team_clearance_level == 0){
      return <Copy>Not Available for DealFinders</Copy>
    }

  }

  renderSeats(){

    if(this.props.slug == "crm"){
      if(this.props.team_member_limit == -1){
        return(
          <Copy>{this.props.current_team_members} of unlimited seats taken</Copy>
        )
      }else{
        return(
          <Copy>{this.props.current_team_members} of {this.props.team_member_limit} seats taken</Copy>
        )
      }
    }

    if(this.state.plan_module_info.team_has_module){
      if(this.props.slug == "driving" && this.props.active_team_member.team_clearance_level == 0){
        if(this.state.plan_module_info.dealfinder_limit == -1){
          return(
            <Copy>{this.state.plan_module_info.dealfinder_count} of unlimited seats taken</Copy>
          )
        }else{
          return(
            <Copy>{this.state.plan_module_info.dealfinder_count} of {this.state.plan_module_info.dealfinder_limit} seats taken</Copy>
          )
        }

      }else if(this.props.active_team_member.team_clearance_level > 0){
        if(this.state.plan_module_info.team_member_limit == -1){
          return(
            <Copy>{this.state.plan_module_info.team_member_count} of unlimited seats taken</Copy>
          )
        }else{
          return(
            <Copy>{this.state.plan_module_info.team_member_count} of {this.state.plan_module_info.team_member_limit} seats taken</Copy>
          )
        }

      }
    }else if(this.props.platform != "ios"){
      return(
        <Copy>You team has not purchased this service.</Copy>
      )
    }


  }

  render(){
    if(this.state.plan_module_info.team_has_access || this.props.platform != "ios"){
      return(
        <CardBody>
          <Row>
            <Wrapper style={{flex: 1}}>
              <Wrapper style={{paddingRight:20}}>
                <Title>{this.props.title}</Title>
                {this.renderSeats()}
              </Wrapper>
            </Wrapper>
            {this.renderAccessText()}
          </Row>
        </CardBody>
      )
    }
    return <Wrapper />
  }

}

export default ModuleAccess;
