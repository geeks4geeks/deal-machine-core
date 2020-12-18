import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Title, Copy } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class InviteTeamMemberCard extends Component{


  render(){

    if(this.props.user.team_clearance_level > 1 || this.props.user.team_owner == 1){
      return(
        <Card>
          <CardBody>
            <Title>Invite Team Members</Title>
            <Copy></Copy>
            <Row>
              <PillButton
              style={{marginLeft: 0, marginBottom: 0}}
              onPress={()=>{
                this.props.setInviteType("team_member");
                this.props.selectActiveTeamMember("invite");
                this.props.appRedirect({
                  redirect: "inviteTeamMember"});
              }} primary={true}>
                Invite By Email
              </PillButton>

            </Row>
          </CardBody>


        </Card>
      )
    }

    return <Wrapper />

  }

}

export default InviteTeamMemberCard;
