import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  ModalOverlay,
  Modal,
  Card,
  CardBody,
  Title,
  Copy,
  SecondaryButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  setModal,
  toggleModal,
  updateTeamMembers,
  toggleActionSheet,

  renderTeamStatus
} from 'app/NativeActions';

class UserMore extends Component {


  renderRemoveButton(){

    if(this.props.active_team_member.member_type == "invite"){
      return(
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.toggleActionSheet(null);
            this.props.setModal({
              title: "Revoke Invitation",
              description: "Are you sure you want to revoke this invitation?",
              icon: "delete",
              submit: "Revoke Invitation",
              buttonType: "destroy",
              onPress: ()=>{
                this.props.updateTeamMembers({
                  token: this.props.token,
                  type: "revoke_invite",
                  team_member_id: this.props.active_team_member.id,
                  member_type: "invite"
                })
              },
              cancel: 'Cancel',
              onCancel: ()=>{}
            });
            this.props.toggleModal({show: true, type: "normal"});
          }}>
            Revoke Invitation
          </SecondaryButton>
        </Card>
      )
    }else if(this.props.active_team_member.member_type == "request"){
      return(
        <Card>
          <SecondaryButton onPress={()=>{
            this.props.toggleActionSheet(null);
            this.props.setModal({
              title: "Deny Request",
              description: "Are you sure you want to deny this request?",
              icon: "delete",
              submit: "Deny Request",
              buttonType: "destroy",
              onPress: ()=>{

              },
              cancel: 'Cancel',
              onCancel: ()=>{}
            });
            this.props.toggleModal({show: true, type: "normal"});
          }}>
            Deny Request
          </SecondaryButton>
        </Card>
      )
    }else{
      if(this.props.user.team_clearance_level > 1 &&
        this.props.active_team_member.team_owner != 1 &&
        this.props.active_team_member.id != this.props.user.id){
          const team_status = renderTeamStatus(this.props.active_team_member);
          return(
            <Card>
              <SecondaryButton onPress={()=>{
                this.props.toggleActionSheet(null);
                this.props.setModal({
                  title: "Remove "+team_status,
                  description: "Are you sure you want to remove this "+team_status,
                  icon: "delete",
                  submit: "Remove "+team_status,
                  buttonType: "destroy",
                  onPress: ()=>{
                    this.props.updateTeamMembers({
                      token: this.props.token,
                      type: "remove_member",
                      team_member_id: this.props.active_team_member.id,
                      member_type: "team_member"
                    })
                  },
                  cancel: 'Cancel',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});
              }}>
                Remove {team_status}
              </SecondaryButton>
            </Card>
          )
        }
    }
  }

  render() {

    if(this.props.actionSheet == "user_more" && this.props.active_team_member){

      return (

        <ModalOverlay
          isVisible={true}
          onPress={()=>this.props.toggleActionSheet(null)}
        >
          <Modal actionSheet>
            <Card style={{
              minWidth: "95%",
              paddingBottom: this.props.device == "mobile" ? 10 : 0
            }}>
              <CardBody>
                <Title style={{textAlign: "center"}}>More Options</Title>
                <Copy style={{textAlign: "center"}}>Select one of the following options</Copy>
              </CardBody>
              {this.renderRemoveButton()}
                <TextButton
                  onPress={()=>this.props.toggleActionSheet(null)}
                  text={"Cancel"}
                />
            </Card>
          </Modal>
        </ModalOverlay>

      );
    }
    return <Wrapper />
  }
}

const mapStateToProps = ({ auth, native, team }) => {
  const { token, user } = auth
  const { actionSheet, device } = native;
  const { active_team_member } = team;

  return {
    token,
    user,
    actionSheet,
    device,
    active_team_member
  }
}


export default connect(mapStateToProps, {
  setModal,
  toggleModal,
  updateTeamMembers,
  toggleActionSheet
})(UserMore);
