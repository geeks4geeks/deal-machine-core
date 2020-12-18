import React, { Component } from 'react';
import { Wrapper, ProfilePic, Title, Copy, Bold, Row, Icon } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

import {
  renderDate,
  renderTeamStatus
} from 'app/NativeActions';

class UserProfile extends Component {


  render(){


    if(this.props.active_team_member.member_type == "invite"){
      return (
        <Wrapper style={{padding:20}}>
          <Row>
            <Wrapper>
              <Wrapper style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: this.props.colors.card_color,
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Icon
                  size={26}
                  icon={"mail"}
                />
              </Wrapper>
            </Wrapper>
            <Wrapper style={{flex: 1, padding: 20}}>
              <Title>{this.props.active_team_member.email}</Title>
              <Copy>Invite sent on {renderDate(this.props.active_team_member.date_created)}</Copy>

              <PillButton style={{margin: 0, marginTop: 10}} onPress={()=>{
                this.props.setModal({
                  title: "Resend Invitation",
                  description: "Are you sure you want to resend this invitation?",
                  icon: "mail",
                  submit: "Resend Invitation",
                  onPress: ()=>{
                    this.props.updateTeamMembers({
                      token: this.props.token,
                      type: "resend_invite",
                      team_member_id: this.props.active_team_member.id,
                      member_type: "invite"
                    })
                  },
                  cancel: 'Cancel',
                  onCancel: ()=>{}
                });
                this.props.toggleModal({show: true, type: "normal"});
              }}>
                Resend Invitation
              </PillButton>
            </Wrapper>
          </Row>
        </Wrapper>
      )
    }

    if(this.props.active_team_member.member_type == "request"){

      return (
        <Wrapper style={{padding:20}}>
          <Row>
            <Wrapper>
              <ProfilePic
                email={this.props.active_team_member.email}
                image={this.props.active_team_member.image}
                size={76}
              />
            </Wrapper>
            <Wrapper style={{flex: 1, padding: 20}}>
              <Title>{this.props.active_team_member.firstname+" "+this.props.active_team_member.lastname}</Title>
              <Copy>Requested to join your team on {renderDate(this.props.active_team_member.date_created)}</Copy>

              <Row>
                <PillButton style={{margin: 0, marginTop: 10}} onPress={()=>{

                  this.props.setModal({
                    title: "Accept Request",
                    description: "Are you sure you want to accept this request?",
                    icon: "check",
                    submit: "Accept Request",
                    onPress: ()=>{

                    },
                    cancel: 'Cancel',
                    onCancel: ()=>{}
                  });
                  this.props.toggleModal({show: true, type: "normal"});

                }} primary={true}>
                  Accept Request
                </PillButton>
                <PillButton style={{margin: 0, marginTop: 10, marginLeft: 10}} onPress={()=>{
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
                </PillButton>
              </Row>

            </Wrapper>
          </Row>
        </Wrapper>
      )

    }

    return (
      <Wrapper style={{padding:20}}>
        <Row>
          <Wrapper>
            <ProfilePic
              email={this.props.active_team_member.email}
              image={this.props.active_team_member.image}
              size={76}
            />
          </Wrapper>
          <Wrapper style={{flex: 1, padding: 20}}>
            <Title>{this.props.active_team_member.firstname+" "+this.props.active_team_member.lastname}</Title>
            <Copy><Bold>{renderTeamStatus(this.props.active_team_member)}</Bold></Copy>
            <Copy>{this.props.active_team_member.email}{this.props.active_team_member.phone ? " | "+this.props.active_team_member.phone : ""}</Copy>
          </Wrapper>
        </Row>
      </Wrapper>
    )
  }
}


export default UserProfile;
