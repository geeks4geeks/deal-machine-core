import React, { Component } from 'react';
import { Wrapper, Card, CardBody, Row, Title, Copy } from 'app/NativeComponents/common';
import { PillButton } from 'app/NativeComponents/snippets';

class InviteDealFinderCard extends Component{


  render(){

    if(this.props.user.team_clearance_level > 1 || this.props.user.team_owner == 1){
      return(
        <Card>
          <CardBody>
            <Title>Invite DealFinders</Title>
            <Copy>Leverage your time by hiring drivers. DealFinders are limited access team members who access the driving module to add properties for you.
            DealFinders only see properties they add, and they can’t see other properties within your account.
            Looking for an existing DealFinder? Try the Driving Tab in the menu bar and click Drivers.</Copy>
            <Row>
              <PillButton
              style={{marginLeft: 0, marginBottom: 0}}
              onPress={()=>{
                this.props.setInviteType("dealfinder");
                this.props.selectActiveTeamMember("invite")
                this.props.appRedirect({
                  redirect: "inviteDriver"});
              }} primary={true}>
                Invite By Email
              </PillButton>
              <PillButton
              style={{marginLeft: 0, marginBottom: 0}}
              onPress={()=>{
                this.props.selectActiveTeamMember("collect_dealfinders")
                this.props.appRedirect({
                  redirect: "collectDealFinders",
                })
              }} primary={false}>
                Build Funnel
              </PillButton>
            </Row>
          </CardBody>


        </Card>
      )
    }

    return <Wrapper />

  }

}

export default InviteDealFinderCard;
