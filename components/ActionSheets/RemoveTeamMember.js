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
  DeleteButton
} from 'app/NativeComponents/common';
import {
  TextButton
} from 'app/NativeComponents/snippets';

import {
  editTeam,
  toggleActionSheet
} from 'app/NativeActions';

class RemoveTeamMember extends Component {

  render() {

    if(this.props.actionSheet == "remove_team_member" && (this.props.invite || this.props.member)){


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
                <Title style={{textAlign: "center"}}>
                  {
                    this.props.member ?
                    "Remove Team Member?" :
                    this.props.invite ?
                      this.props.invite.requested == 1 ? "Decline Request" :
                      "Remove Invitation" :
                    ""
                  }
                </Title>
                <Copy style={{textAlign: "center"}}>
                  {
                    this.props.member ?
                    "Are you sure you want to remove this team member?" :
                    this.props.invite ?
                      this.props.invite.requested == 1 ? "Are you sure you want to decline this request." :
                      "Are you sure you want to remove this invitation?" :
                    ""
                  }
                </Copy>
              </CardBody>
                <Card>
                  <DeleteButton onPress={()=>{
                    if(this.props.invite){
                      if(this.props.invite.requested != 1){
                        this.props.editTeam({
                          token: this.props.token,
                          team: this.props.user.team_id,
                          type: "remove_invite",
                          payload: this.props.invite.id
                        });
                      }else if(this.props.invite.requested == 1){
                        this.props.editTeam({
                          token: this.props.token,
                          team: this.props.user.team_id,
                          type: "decline_request",
                          payload: this.props.invite.id
                        });
                      }
                    }else{
                      this.props.editTeam({
                        token: this.props.token,
                        team: this.props.user.team_id,
                        type: "remove_member",
                        payload: this.props.member.id
                      });
                    }
                    this.props.toggleActionSheet(null);
                  }}>
                    {
                      this.props.member ?
                      "Remove Team Member?" :
                      this.props.invite ?
                        this.props.invite.requested == 1 ? "Decline Request" :
                        "Remove Invitation" :
                      ""
                    }
                  </DeleteButton>
                </Card>
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
  const { token, user } = auth;
  const { actionSheet, device } = native;
  const {
    invite,
    member
  } = team;
  return {
    token,
    user,
    actionSheet,
    device,
    invite,
    member
  }
}


export default connect(mapStateToProps, {
  editTeam,
  toggleActionSheet,
})(RemoveTeamMember);
