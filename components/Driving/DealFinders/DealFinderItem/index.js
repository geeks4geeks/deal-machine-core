import React, { Component } from 'react';
import {
  Button,
  Card,
  Row,
  ProfilePic,
  Wrapper,
  CardBody,
  Split,
  Stretch,
  Title,
  Icon,
  CenterCenter,
  Copy,
  Bold
} from 'app/NativeComponents/common';

import InviteItem from './InviteItem';
import RequestItem from './RequestItem';

import {
  renderDate,
  renderTeamStatus
} from 'app/NativeActions';

class DealFinderItem extends Component{

  render(){

    if(this.props.member.member_type == "invite"){
      return <InviteItem {...this.props}/>
    }

    if(this.props.member.member_type == "request"){
      return <RequestItem {...this.props}/>
    }

    return (
      <Button
      onPress={this.props.onPress}
      to={"/app/driving/dealfinder/"+this.props.member.id}
      style={{borderBottomStyle: "solid", borderBottomWidth: 1, borderBottomColor: this.props.colors.border_color,
      backgroundColor: this.props.active_team_member ? this.props.active_team_member.id == this.props.member.id ? this.props.colors.background_color : "transparent" : "transparent"
      }}>
        <Row>
          <CardBody style={{flex: 1, padding:10, paddingTop: 15, paddingBottom:15}}>
            <Row>
              <Stretch>
                <Row>
                  <ProfilePic
                    size={25}
                    email={this.props.member.email}
                    image={this.props.member.image}
                    style={{marginRight: 10}}
                  />
                  <Wrapper style={{
                    flex: 1
                  }}>
                    <Copy>
                      <Bold>
                      {this.props.member.firstname+" "+this.props.member.lastname}</Bold>
                    </Copy>
                    <Copy>{renderTeamStatus(this.props.member)}</Copy>
                  </Wrapper>
                </Row>
              </Stretch>
              <Wrapper>
                <CenterCenter>
                  <Icon
                    style={{marginLeft: 10}}
                    icon={"keyboard-arrow-right"}
                  />
                </CenterCenter>
              </Wrapper>
            </Row>
          </CardBody>
        </Row>
      </Button>
    )
  }

}

export default DealFinderItem;
